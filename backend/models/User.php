<?php
namespace Models;
require_once(dirname(__FILE__) . "/../config/Database.php");
use DataBase\Database;
use PDO;

class User
{
    private $conn;
    private $table = "users";

    public function __construct()
    {
        $this->conn = (new Database())->getConnect();
    }

    public function signup($username, $email, $password, $role)
    {
        try {
            // Check if user exists
            $query = "SELECT * FROM $this->table WHERE email = :email OR username = :username";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":username", $username);
            $stmt->execute();

            if ($stmt->rowCount() > 0) {
                return false;
            }

            // Hash password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Insert user
            $query = "INSERT INTO $this->table (username, email, password, role) 
                     VALUES (:username, :email, :password, :role)";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":username", $username);
            $stmt->bindParam(":email", $email);
            $stmt->bindParam(":password", $hashedPassword);
            $stmt->bindParam(":role", $role);

            if ($stmt->execute()) {
                return $this->conn->lastInsertId();
            }
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function login($email, $password)
    {
        try {
            $query = "SELECT * FROM $this->table WHERE email = :email AND is_active = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":email", $email);
            $stmt->execute();

            $user = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($user && password_verify($password, $user['password'])) {
                unset($user['password']); // Remove password from response
                return $user;
            }
            return false;
        } catch (\PDOException $e) {
            return false;
        }
    }

    public function getUserById($id)
    {
        try {
            $query = "SELECT user_id, username, email, role, is_active FROM $this->table 
                     WHERE user_id = :id AND is_active = 1";
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();

            return $stmt->fetch(PDO::FETCH_ASSOC);
        } catch (\PDOException $e) {
            return false;
        }
    }
}