<?php
require_once(dirname(__FILE__) . "/../controllers/UserController.php");

use Controllers\UserController;

$route = $_GET['route'] ?? '';

try {
    $controller = new UserController();

    switch ($route) {
        case 'signup':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->signup();
            }
            break;

        case 'login':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $controller->login();
            }
            break;

        case 'validate-token':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $controller->validateToken();
            }
            break;

        default:
            http_response_code(404);
            echo json_encode(['error' => 'Route not found']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => $e->getMessage()
    ]);
}