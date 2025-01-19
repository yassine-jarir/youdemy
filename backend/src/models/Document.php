<?php
namespace Models;

use PDO;

require_once(dirname(__FILE__) . "/Content.php");

class Document extends Content
{
    public function addContent($data)
    {
        $query = "INSERT INTO courses (title, description, content, category_id, teacher_id, content_url, image_url, content_type) 
                  VALUES (:title, :description, :content, :category_id, :teacher_id, :content_url, :image_url, 'document')";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':content', $data['content']);
        $stmt->bindParam(':category_id', $data['category_id']);
        $stmt->bindParam(':teacher_id', $data['teacher_id']);
        $stmt->bindParam(':content_url', $data['content_url']);
        $stmt->bindParam(':image_url', $data['image_url']);
        return $stmt->execute();
    }

    public function updateContent($id, $data)
    {
        $query = "UPDATE courses 
                  SET title = :title, description = :description, content = :content, content_url = :content_url, image_url = :image_url  ,content_type = :content_type 
                  WHERE course_id = :course_id  ";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':title', $data['title']);
        $stmt->bindParam(':description', $data['description']);
        $stmt->bindParam(':content', $data['content']);
        $stmt->bindParam(':content_url', $data['content_url']);
        $stmt->bindParam(':content_type', $data['content_type']);
        $stmt->bindParam(':image_url', $data['image_url']);
        $stmt->bindParam(':course_id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function deleteContent($id)
    {
        $query = "DELETE FROM courses WHERE course_id = :course_id AND content_type = 'document'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course_id', $id, PDO::PARAM_INT);
        return $stmt->execute();
    }

    public function getContentById($id)
    {
        $query = "SELECT * FROM courses WHERE course_id = :course_id AND content_type = 'document'";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':course_id', $id, PDO::PARAM_INT);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}