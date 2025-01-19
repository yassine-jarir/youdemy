// adminRoutes.php
<?php
function handleAdminRoutes($route, $adminController)
{

    if (preg_match('/^admin\/category\/get\/(\d+)$/', $route, $matches)) {
        if ($_SERVER['REQUEST_METHOD'] === 'GET') {
            $id = $matches[1];
            $adminController->getCategoryById($id);
            return true;
        }
    }

    switch ($route) {
        case 'admin/teachers/validate':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->validateTeacherAccounts();
            }
            break;

        case 'admin/teachers/invalidate':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->invalidateTeacherAccounts();
            }
            break;

        case 'admin/user/activate':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->activate();
            }
            break;

        case 'admin/user/suspend':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->suspend();
            }
            break;

        case 'admin/user/delete':
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $adminController->delete();
            }
            break;

        case 'admin/courses/manage':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->getAllCourses();
            }
            break;

        case 'admin/courses/get':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->getCourseById();
            }
            break;

        case 'admin/courses/delete':
            if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
                $data = json_decode(file_get_contents("php://input"));
                if (isset($data->course_id)) {
                    $adminController->supprimerCourse($data->course_id);
                } else {
                    http_response_code(400);
                    echo json_encode(['error' => 'Course ID is required']);
                }
            }
            break;

        case 'admin/tags/bulk':
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                $adminController->bulkInsertTags();
            }
            break;

        case 'admin/statistics':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $adminController->viewGlobalStatistics();
            }
            break;

        default:
            return false;
    }
    return true;
}