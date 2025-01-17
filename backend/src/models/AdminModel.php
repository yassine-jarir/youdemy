<?php
namespace Models;
require_once(dirname(__FILE__) . "/ManageCourse.php");

require_once(dirname(__FILE__) . "/../config/Database.php");

use Models\ManageCourse;
use Config\Database;
use PDO;

class Admin extends ManageCourse
{
    private $conn;
    private $table = "users";

    public function __construct()
    {
        $this->conn = (new Database())->getConnect();
        parent::__construct($this->conn);
    }
    // manage teachersss
    public function validateTeacherAccounts($teacherId)
    {
        try {
            $query = "UPDATE users 
                     SET is_active = 1 
                     WHERE user_id = :teacher_id 
                     AND role = 'teacher'";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":teacher_id", $teacherId);
            $stmt->execute();

            return true;
        } catch (\PDOException $e) {
            error_log("Error validating teacher account: " . $e->getMessage());
            return false;
        }
    }
    public function invalidateTeacherAccounts($teacherId, $status)
    {
        try {
            $query = "UPDATE users 
                     SET is_active = :status 
                     WHERE user_id = :teacher_id 
                     AND role = 'teacher'";

            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":status", $status, PDO::PARAM_INT);
            $stmt->bindParam(":teacher_id", $teacherId, PDO::PARAM_INT);

            return $stmt->execute();
        } catch (\PDOException $e) {
            error_log("Error updating teacher status: " . $e->getMessage());
            return false;
        }
    }
    public function getAllTeachers()
    {
        try {

            $query = "SELECT user_id, username, email, is_active FROM users WHERE role = 'teacher'";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();


            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {

            error_log("Error fetching teachers: " . $e->getMessage());
            return false;
        }
    }

    // manage all usersss
    public function getAllUsers()
    {
        try {

            $query = "SELECT user_id, username, email, role, is_active FROM users";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();


            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {

            error_log("Error fetching users: " . $e->getMessage());
            return false;
        }
    }

    public function deleteUser($userId)
    {
        $query = "DELETE FROM $this->table 
                 WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);

        return $stmt->execute();
    }
    public function StatusActiveSuspend($userId, $status)
    {
        $query = "UPDATE $this->table 
                 SET is_active = :status 
                 WHERE user_id = :user_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":status", $status, PDO::PARAM_INT);
        $stmt->bindParam(":user_id", $userId, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // content managment
    public function getAllCoursesWithDetails($teacherId)
    {
        $query = "SELECT 
            c.course_id, 
            c.title, 
            c.description, 
            c.content, 
            c.content_url, 
            c.image_url, 
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
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if ($result) {
            return $result;
        }
        return false;
    }


    public function getCourseById($courseId)
    {
        $query = "SELECT 
                      c.course_id, 
                      c.title, 
                      c.description, 
                      c.content, 
                      c.content_url, 
                      c.image_url, 
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
                  WHERE 
                      c.course_id = :course_id
                  GROUP BY 
                      c.course_id";

        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":course_id", $courseId, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    private function updateCourseTags($courseId, $tagIds)
    {
        $query = "DELETE FROM course_tags WHERE course_id = :course_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":course_id", $courseId, PDO::PARAM_INT);
        $stmt->execute();

        $query = "INSERT INTO course_tags (course_id, tag_id) VALUES (:course_id, :tag_id)";
        $stmt = $this->conn->prepare($query);

        foreach ($tagIds as $tagId) {
            $stmt->bindParam(":course_id", $courseId, PDO::PARAM_INT);
            $stmt->bindParam(":tag_id", $tagId, PDO::PARAM_INT);
            $stmt->execute();
        }
    }


    public function viewGlobalStatistics()
    {
        try {
            $userStats = $this->conn->query("
                SELECT 
                    COUNT(*) as total_users,
                    COUNT(CASE WHEN role = 'student' THEN 1 END) as total_students,
                    COUNT(CASE WHEN role = 'teacher' THEN 1 END) as total_teachers
                FROM users
            ")->fetch(PDO::FETCH_ASSOC);

            $courseStats = $this->conn->query("
                SELECT 
                    COUNT(*) as total_courses,
                    COUNT(DISTINCT category_id) as total_categories,
                    COUNT(DISTINCT teacher_id) as active_teachers
                FROM courses
            ")->fetch(PDO::FETCH_ASSOC);

            $enrollmentStats = $this->conn->query("
                SELECT 
                    COUNT(*) as total_enrollments,
                    COUNT(DISTINCT student_id) as active_students,
                    COUNT(DISTINCT course_id) as courses_with_enrollments
                FROM enrollments
            ")->fetch(PDO::FETCH_ASSOC);

            return [
                'user_statistics' => $userStats,
                'course_statistics' => $courseStats,
                'enrollment_statistics' => $enrollmentStats
            ];
        } catch (\PDOException $e) {
            return false;
        }
    }


    // Tags CRUD
    public function getAllTags()
    {
        try {
            $query = "SELECT * FROM tags";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function addTag($name)
    {
        try {
            $query = "INSERT INTO tags (name) VALUES (:name)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':name', $name);
            if ($stmt->execute()) {
                return $this->conn->lastInsertId();
            }
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }


    public function deleteTag($tagId)
    {
        try {
            $query = "DELETE FROM tags WHERE tag_id = :tag_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':tag_id', $tagId, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }


    // CATEGORY managee
    public function deleteCategory($categoryId)
    {
        try {
            $query = "DELETE FROM categories WHERE category_id = :category_id";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(':category_id', $categoryId, PDO::PARAM_INT);
            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function getAllCategories()
    {
        try {
            $query = "SELECT * FROM categories";
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function addCategory($name)
    {

        $query = "INSERT INTO categories (name) VALUES (:name)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':name', $name);
        if ($stmt->execute()) {
            return $this->conn->lastInsertId();
        }
        return false;

    }

    public function updateCategory($category_id, $name)
    {

        $query = "UPDATE categories SET name = :name WHERE category_id = :category_id";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':category_id', $category_id);
        $stmt->bindParam(':name', $name);
        return $stmt->execute();

    }

    public function getCategoryByID($categoryId)
    {
        $query = "SELECT * FROM categories WHERE category_id = :category_id";
        $stmp = $this->conn->prepare($query);
        $stmp->bindParam(":category_id", $categoryId, PDO::PARAM_INT);
        $stmp->execute();
        return $stmp->fetch(PDO::FETCH_ASSOC);

    }
}