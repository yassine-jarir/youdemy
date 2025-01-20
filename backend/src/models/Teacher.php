<?php
namespace Models;
require_once(dirname(__FILE__) . "/ManageCourse.php");
require_once(dirname(__FILE__) . "/../config/Database.php");
require_once(dirname(__FILE__) . "/Video.php");
require_once(dirname(__FILE__) . "/Document.php");
use Config\Database;
use PDO;
use Models\ManageCourse;
class Teacher extends ManageCourse
{
    private $conn;

    public function __construct()
    {
        $this->conn = (new Database())->getConnect();
        parent::__construct($this->conn);
    }

    public function getAllCoursesWithDetails($teacherId)
    {
        $query = "SELECT c.*, cat.name as category_name, u.username as teacher_name, 
                 (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.course_id) as enrollment_count,
                 GROUP_CONCAT(t.name) as tags
                 FROM courses c 
                 LEFT JOIN categories cat ON c.category_id = cat.category_id 
                 LEFT JOIN users u ON c.teacher_id = u.user_id
                 LEFT JOIN course_tags ct ON c.course_id = ct.course_id
                 LEFT JOIN tags t ON ct.tag_id = t.tag_id
                 WHERE c.teacher_id = :teacher_id
                 GROUP BY c.course_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':teacher_id', $teacherId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function viewEnrollments($teacherId)
    {
        $query = "SELECT e.*, u.username as student_name, c.title as course_title , c.image_url 
                 FROM enrollments e 
                 JOIN users u ON e.student_id = u.user_id 
                 JOIN courses c ON e.course_id = c.course_id 
                 WHERE c.teacher_id = :teacher_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':teacher_id', $teacherId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function viewStatistics($teacherId)
    {
        try {
            $query = "SELECT 
                        COUNT(*) as total_courses,
                        (SELECT COUNT(DISTINCT e.student_id) 
                         FROM enrollments e 
                         JOIN courses c ON e.course_id = c.course_id 
                         WHERE c.teacher_id = :teacher_id1) as total_students,
                        (SELECT COUNT(*) 
                         FROM enrollments e 
                         JOIN courses c ON e.course_id = c.course_id 
                         WHERE c.teacher_id = :teacher_id2) as total_enrollments
                     FROM courses 
                     WHERE teacher_id = :teacher_id3";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':teacher_id1', $teacherId, PDO::PARAM_INT);
            $stmt->bindParam(':teacher_id2', $teacherId, PDO::PARAM_INT);
            $stmt->bindParam(':teacher_id3', $teacherId, PDO::PARAM_INT);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function getCategoryByID($id)
    {
        $query = "SELECT * FROM courses WHERE course_id = :course_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":course_id", $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updateCourse($id, $courseData)
    {
        try {
            $contentClass = $courseData['content_type'] === 'video' ? new Video($this->conn) : new Document($this->conn);
            return $contentClass->updateContent($id, $courseData);
        } catch (\PDOException $e) {
            return false;
        }
    }
}