<?php
namespace Models;

abstract class Content
{
    protected $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    abstract public function addContent($data);
    abstract public function updateContent($id, $data);
    abstract public function getContentById($id);

}