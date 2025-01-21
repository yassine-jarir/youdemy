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
            } else {
                http_response_code(405);
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
        case 'admin/users':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllUsers();
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

        // course gestionmmm
        case 'admin/courses/all': // done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllCourses();
            }
            break;

        case 'admin/courses/get': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {

                $adminController->getCourseById();
            }
            break;

        case 'admin/courses/delete': // done
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

                $adminController->supprimerCourse();
            }
            break;


        // Tag routes
        case 'admin/tags':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') { // done
                $adminController->getAllTags();
            } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') { // done
                $adminController->addTag();
            } elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') { // done
                $adminController->deleteTag();
            }
            break;

        // Admin Category routes
        case 'admin/categories': // done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllCategories();
            } elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->addCategory();
            }
            break;

        case 'admin/categories/update': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->updateCategory();
            }
            break;

        case 'admin/categories/delete': // done
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $adminController->deleteCategory();
            }
            break;

        case 'admin/categories/get': //done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->getCategoryById();
            }
            break;
        case 'admin/globalStats': //done
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->viewGlobalStatistics();
            }
            break;

        case 'admin/teachers':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllTeachers();
            }
            break;

        // Teacher routes
        case 'teacher/courses/manage': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $teacherController->getAllTeacherCourses();
            }
            break;

        case 'teacher/course/add': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $teacherController->addCourse();
            }
            break;

        case (preg_match('/^teacher\/course\/getAndPost\/(\d+)$/', $route, $matches) ? true : false): // works
            if ($_SERVER['REQUEST_METHOD'] === 'GET') { // done
                $id = $matches[1];
                $teacherController->viewCourseDetails($id);
            }
            if ($_SERVER['REQUEST_METHOD'] === 'POST') { //done
                $id = $matches[1];
                $teacherController->modifierCourse($id);
            }
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') { //done
                $id = $matches[1];
                $teacherController->supprimerCourse($id);
            }
            break;


        case 'teacher/inscription': // done
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $teacherController->viewEnrollments();
            }
            break;

        case 'teacher/statistics':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $teacherController->viewStatistics();
            }
            break;

        // etuddiant

        case 'student/allCourses':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $studentController->getAllcourses();
            }
            break;

        case 'student/courseDetails':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $studentController->getCourseById();
            }
            break;

        case 'student/inscriptCourse':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $studentController->inscriptCourse();
            }
            break;

        case 'student/viewMyCourses':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $studentController->viewMyCourses();
            }
            break;

        // visiteur 
        case 'student/allCoursesP':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $limit = isset($_GET['limit']) ? (int) $_GET['limit'] : 10;
                $offset = isset($_GET['offset']) ? (int) $_GET['offset'] : 0;

                $studentController->getAllcoursesP($limit, $offset);
            }
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'file' => $e->getFile(),
        'success' => false,
        'error' => $e->getMessage(),
        'line' => $e->getLine()
    ]);

}