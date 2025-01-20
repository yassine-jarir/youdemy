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
}