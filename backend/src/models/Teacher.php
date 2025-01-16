<?php
namespace Models;

require_once(dirname(__FILE__) . "/../config/Database.php");
use Config\Database;
use PDO;

class Teacher extends User
{
    private $conn;

    public function __construct()
    {
        parent::__construct();
        $this->conn = (new Database())->getConnect();
    }
    public function manageCourses($teacherId)// work
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

        $teacher = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $teacher;
    }

    public function addCourse($courseData)
    {
        try {
            $query = "INSERT INTO courses (title, description, content, category_id, teacher_id) 
                     VALUES (:title, :description, :content, :category_id, :teacher_id)";

            $stmt = $this->conn->prepare($query);

            // Bind parameters
            $stmt->bindParam(':title', $courseData['title']);
            $stmt->bindParam(':description', $courseData['description']);
            $stmt->bindParam(':content', $courseData['content']);
            $stmt->bindParam(':category_id', $courseData['category_id']);
            $stmt->bindParam(':teacher_id', $courseData['teacher_id']);

            if ($stmt->execute()) {
                return $this->conn->lastInsertId();
            }
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function viewEnrollments($teacherId)
    {
        $query = "SELECT e.*, u.username as student_name, c.title as course_title 
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
        $stmp = $this->conn->prepare(query: $query);
        $stmp->bindParam(":course_id", $id, PDO::PARAM_INT);
        $stmp->execute();
        return $stmp->fetch(PDO::FETCH_ASSOC);
    }

    public function updateCourse($id, $courseData)
    {
        try {
            $query = "UPDATE courses 
                      SET title = :title, description = :description, content = :content, 
                          category_id = :category_id, teacher_id = :teacher_id 
                      WHERE course_id = :course_id";

            $stmt = $this->conn->prepare($query);

            // Bind parameters
            $stmt->bindParam(':title', $courseData['title']);
            $stmt->bindParam(':description', $courseData['description']);
            $stmt->bindParam(':content', $courseData['content']);
            $stmt->bindParam(':category_id', $courseData['category_id']);
            $stmt->bindParam(':teacher_id', $courseData['teacher_id']);
            $stmt->bindParam(':course_id', $id, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function deleteCourse($id)
    {
        try {
            $query = "DELETE FROM courses WHERE course_id = :course_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':course_id', $id, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }
}