<?php
namespace Models;

require_once(dirname(__FILE__) . "/../config/Database.php");
use Config\Database;
use PDO;

class Student extends User
{
    private $conn;
    private $table = 'users';

    public function __construct()
    {
        parent::__construct();
        $this->conn = (new Database())->getConnect();
    }

    public function getAllCoursesWithDetails()
    {
        $query = "SELECT 
                      c.course_id, 
                      c.title, 
                      c.description, 
                      cat.name AS category_name, 
                      u.username AS teacher_name, 
                      GROUP_CONCAT(t.name) AS tags
                  FROM 
                      courses c
                  JOIN 
                      categories cat ON c.category_id = cat.category_id
                  JOIN 
                      users u ON c.teacher_id = u.user_id
                  LEFT JOIN 
                      course_tags ct ON c.course_id = ct.course_id
                  LEFT JOIN 
                      tags t ON ct.tag_id = t.tag_id
                  GROUP BY 
                      c.course_id";

        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        if (!$stmt->execute()) {

            return false;
        }
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $result;
    }


    public function viewMyCourses($studentId)
    {
        $query = "SELECT c.*, u.username as teacher_name, e.enrollment_date 
                 FROM enrollments e 
                 JOIN courses c ON e.course_id = c.course_id 
                 JOIN users u ON c.teacher_id = u.user_id 
                 WHERE e.student_id = :student_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':student_id', $studentId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    public function getCourseById($courseId)
    {
        $query = "SELECT c.content, c.description, c.content, cat.name, t.username, tg.name FROM courses c
        INNER JOIN categories cat ON cat.category_id = c.course_id 
        INNER JOIN users t ON t.user_id = c.teacher_id 
        INNER JOIN course_tags ct ON ct.course_id = c.course_id 
        INNER JOIN tags tg ON ct.tag_id = tg.tag_id
        WHERE c.course_id = :course_id;
";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":course_id", $courseId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(mode: PDO::FETCH_ASSOC);
    }

    public function inscriptCourse($student_id, $course_id)
    {

        $query = "INSERT INTO enrollments (student_id, course_id) VALUES (:student_id, :course_id)";
        $stmp = $this->conn->prepare($query);
        $stmp->bindParam(":student_id", $student_id);
        $stmp->bindParam(":course_id", $course_id);
        $stmp->execute();
        return $this->conn->LastInsertId();

    }

}