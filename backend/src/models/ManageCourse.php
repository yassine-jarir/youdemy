<?php
namespace Models;

abstract class ManageCourse
{
    private $conn;

    public function __construct($conn)
    {
        $this->setConn($conn);
    }

    protected function setConn($conn)
    {
        $this->conn = $conn;
    }


    protected function getConn()
    {
        return $this->conn;
    }


    abstract function getAllCoursesWithDetails($teacherId);

    public function addCourse($courseData)
    {
        try {
            $contentClass = $courseData['content_type'] === 'video' ? new Video($this->getConn()) : new Document($this->getConn());
            $result = $contentClass->addContent($courseData);
            return $result;
        } catch (\PDOException $e) {
            error_log("Error adding course: " . $e->getMessage());
            return $e->getMessage();
        }
    }

    public function deleteCourse($id)
    {
        try {
            $query = "DELETE FROM courses WHERE course_id = :course_id";
            $stmt = $this->getConn()->prepare($query);
            $stmt->bindParam(':course_id', $id, \PDO::PARAM_INT);
            return $stmt->execute();
        } catch (\PDOException $e) {
            return false;
        }
    }
    public function getAllCoursesWithPagination($limit, $offset)
{
    $query = "SELECT c.course_id, c.title, c.description, c.content, c.content_url, c.image_url, 
                     cat.name AS category_name, u.username AS teacher_name, 
                     GROUP_CONCAT(t.name) AS tags
              FROM courses c
              JOIN categories cat ON c.category_id = cat.category_id
              JOIN users u ON c.teacher_id = u.user_id
              LEFT JOIN course_tags ct ON c.course_id = ct.course_id
              LEFT JOIN tags t ON ct.tag_id = t.tag_id
              GROUP BY c.course_id
              LIMIT :limit OFFSET :offset";

    $stmt = $this->conn->prepare($query);
    $stmt->bindParam(':limit', $limit, \PDO::PARAM_INT);
    $stmt->bindParam(':offset', $offset, \PDO::PARAM_INT);
    $stmt->execute();

    return $stmt->fetchAll(\PDO::FETCH_ASSOC);
}
}