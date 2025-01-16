<?php
require_once(dirname(__FILE__) . "/../controllers/UserController.php");
require_once(dirname(__FILE__) . "/../controllers/TeacherController.php");
require_once(dirname(__FILE__) . "/../controllers/AdminController.php");
require_once(dirname(__FILE__) . "/../controllers/StudentController.php");

use Controllers\UserController;
use Controllers\TeacherController;
use Controllers\AdminController;
use Controllers\StudentController;

$route = $_GET['route'] ?? '';

try {
    $controller = new UserController();
    $teacherController = new TeacherController();
    $adminController = new AdminController();
    $studentController = new StudentController();

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

        // Admin routes
        case 'admin/teachers/validate': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->validateTeacherAccounts();
            }
            break;
        case 'admin/teachers/invalidate': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->invalidateTeacherAccounts();
            }
            break;
        case 'admin/user/activate': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->activate();
            }
            break;

        case 'admin/user/suspend': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->suspend();
            }
            break;

        case 'admin/user/delete': //done --- delete user 
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $adminController->delete();
            }
            break;

        case 'admin/courses/manage': // done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllCourses();
            }
            //  elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

            //     if (isset($_GET['action']) && $_GET['action'] === 'add') {
            //         $adminController->addCourse();
            //     } else {
            //         $adminController->editCourse();
            //     }
            // }
            break;

        case 'admin/courses/get': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                $adminController->getCourseById();
            }
            break;

        case 'admin/courses/delete': // done
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $id = $matches[1];
                $adminController->supprimerCourse($id);
            }
            break;
        case 'admin/tags/bulk': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->bulkInsertTags();
            }
            break;

        case 'admin/statistics': // done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->viewGlobalStatistics();
            }
            break;



        case (preg_match('/^admin\/category\/get\/(\d+)$/', $route, $matches) ? true : false):
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $id = $matches[1];
                $adminController->getCategoryById($id);
            }
            break;


        // Teacher routes
        case 'teacher/courses/manage': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $teacherController->getAllCourses();
            }
            break;

        case 'teacher/course/add': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $teacherController->addCourse();
            }
            break;



        case 'teacher/enrollments': // done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $teacherController->viewEnrollments();
            }
            break;

        case 'teacher/statistics':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $teacherController->viewStatistics();
            }
            break;

        case (preg_match('/^student\/course\/getAndPost\/(\d+)$/', $route, $matches) ? true : false): // works
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $id = $matches[1];
                $teacherController->viewCourseDetails($id);
            }
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $id = $matches[1];
                $teacherController->modifierCourse($id);
            }
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $id = $matches[1];
                $teacherController->supprimerCourse($id);
            }
            break;






        // Example using a simple routing mechanism

        // $router->put('/teacher/modifierCourse/{id}', 'TeacherController@modifierCourse');
        // $router->delete('/teacher/supprimerCourse/{id}', 'TeacherController@supprimerCourse');
        // Student routes
        // case (preg_match('/^student\/course\/get\/(\d+)$/', $route, $matches) ? true : false):
        //     if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        //         $id = $matches[1];
        //         $teacherController->viewCourseDetails($id);
        //     }
        //     break;

        // case 'student/courses/my':
        //     if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        //         $studentController->viewMyCourses();
        //     }
        //     break;

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