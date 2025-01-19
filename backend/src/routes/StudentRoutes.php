<?php
function handleStudentRoutes($route, $studentController)
{
    if (preg_match('/^student\/course\/getAndPost\/(\d+)$/', $route, $matches)) {
        $id = (int) $matches[1];

        switch ($_SERVER['REQUEST_METHOD']) {
            case 'GET':
                $studentController->viewCourseDetails($id);
                break;
            case 'POST':
                $studentController->modifierCourse($id);
                break;
            case 'DELETE':
                $studentController->supprimerCourse($id);
                break;
            default:
                return false;
        }
        return true;
    }

    switch ($route) {
        case 'student/courses/my':
            if ($_SERVER['REQUEST_METHOD'] === 'GET') {
                $studentController->viewMyCourses();
                return true;
            }
            break;
    }

    return false;
}