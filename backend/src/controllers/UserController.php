<?php
namespace Controllers;

require_once(dirname(path: __FILE__) . "/../models/User.php");
require_once(dirname(__FILE__) . "/../config/JwtConfig.php");
require_once __DIR__ . '/../config/JwtConfig.php';

use Models\User;
use Firebase\JWT\JWT;
use Controllers\Auth;

class UserController
{
    private $user;
    private $jwt_secret;

    public function __construct()
    {
        $this->user = new User();
        $this->jwt_secret = JWT_SECRET;
    }

    private function generateJWT($user_data)
    {
        $issuedAt = time();
        $expire = $issuedAt + 3600;


        $payload = [
            'iat' => $issuedAt,
            'exp' => $expire,
            'user' => [
                'id' => $user_data['user_id'],
                'email' => $user_data['email'],
                'role' => $user_data['role']
            ]
        ];


        return JWT::encode($payload, $this->jwt_secret, 'HS256');
    }


    public function signup()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->username) || empty($data->email) || empty($data->password) || empty($data->role)) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }


        $userId = $this->user->signup($data->username, $data->email, $data->password, $data->role);

        if ($userId) {

            $user_data = $this->user->getUserById($userId);
            $jwt = $this->generateJWT($user_data);

            http_response_code(201);
            echo json_encode([
                'message' => 'Signup successful',
                'token' => $jwt,
                'user' => $user_data
            ]);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'User already exists or invalid data']);
        }
    }

    public function login()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->email) || empty($data->password)) {
            http_response_code(400);
            echo json_encode(['error' => 'Email and password are required']);
            return;
        }


        $user_data = $this->user->login($data->email, $data->password);

        if ($user_data) {

            $jwt = $this->generateJWT($user_data);

            http_response_code(200);
            echo json_encode([
                'message' => 'Login successful',
                'token' => $jwt,
                'user' => $user_data
            ]);
        } else {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid credentials']);
        }
    }

    public function validateToken()
    {
        try {
            $headers = getallheaders();
            $auth_header = $headers['Authorization'] ?? '';

            if (empty($auth_header) || !preg_match('/Bearer\s+(.*)$/i', $auth_header, $matches)) {
                http_response_code(401);
                echo json_encode(['error' => 'No token provided']);
                return false;
            }


            $jwt = $matches[1];
            $decoded = JWT::decode($jwt, $this->jwt_secret, ['HS256']);

            return $decoded->user;
        } catch (\Exception $e) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid or expired token']);
            return false;
        }
    }


}