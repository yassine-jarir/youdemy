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

    public function viewCourseDetails($courseId)
    {
        $query = "SELECT c.*, u.username as teacher_name, cat.name as category_name 
                 FROM courses c 
                 LEFT JOIN users u ON c.teacher_id = u.user_id 
                 LEFT JOIN categories cat ON c.category_id = cat.category_id 
                 WHERE c.course_id = :course_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course_id', $courseId, PDO::PARAM_INT);
        $stmt->execute();

        return $stmt->fetch(PDO::FETCH_ASSOC);
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
}