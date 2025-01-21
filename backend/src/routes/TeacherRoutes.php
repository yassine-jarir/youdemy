<?php
// function handleTeacherRoutes($route, $teacherController)
// {

//     if (preg_match('/^teacher\/course\/(\d+)$/', $route, $matches)) {
//         $id = $matches[1];
//         switch ($_SERVER['REQUEST_METHOD']) {
//             case 'GET':
//                 $teacherController->viewCourseDetails($id);
//                 return true;
//             case 'PUT':
//                 $teacherController->modifierCourse($id);
//                 return true;
//             case 'DELETE':
//                 $teacherController->supprimerCourse($id);
//                 return true;
//         }
//     }

//     switch ($route) {
//         case 'teacher/courses/manage':
//             if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//                 $teacherController->getAllTeacherCourses();
//             }
//             break;

//         case 'teacher/course/add':
//             if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//                 $teacherController->addCourse();
//             }
//             break;

//         case 'teacher/enrollments':
//             if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//                 $teacherController->viewEnrollments();
//             }
//             break;

//         case 'teacher/statistics':
//             if ($_SERVER['REQUEST_METHOD'] === 'GET') {
//                 $teacherController->viewStatistics();
//             }
//             break;

//         default:
//             return false;
//     }
//     return true;
// }