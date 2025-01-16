<?php
namespace config;
use PDO;
use PDOException;

class Database
{
    private $dbname = "youdemy";
    private $dbhost = "localhost";
    private $dbuser = "root";
    private $dbpassword = "";
    public $conn;


    public function getConnect()
    {
        try {
            $this->conn = new PDO("mysql:host={$this->dbhost};dbname={$this->dbname}", $this->dbuser, $this->dbpassword);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $this->conn;

        } catch (PDOException $th) {
            echo 'Connection error: ' . $th->getMessage();
            return null;
        }
    }
}