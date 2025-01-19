<?php
namespace Controllers;

require_once(dirname(__FILE__) . "/../models/Student.php");
use Models\Student;


class StudentController
{
    private $Student;

    public function __construct()
    {
        $this->Student = new Student();
    }

    public function getAllcourses()
    {

        $courses = $this->Student->getAllCoursesWithDetails();

        if ($courses) {
            http_response_code(201);
            echo json_encode(['dastaa' => $courses]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch courses']);
        }
    }
    public function getCourseById()
    {
        $data = json_decode(file_get_contents("php://input"), true);

        if (empty($data['course_id'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Course ID is required']);
            return;
        }

        $course = $this->Student->getCourseById($data['course_id']);

        if ($course) {
            echo json_encode(['data' => $course]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Course not found']);
        }
    }
    public function inscriptCourse()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->student_id) || empty($data->course_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }



        $result = $this->Student->inscriptCourse($data->student_id, $data->course_id);
        if ($result) {
            http_response_code(200);
            echo json_encode([
                'message' => 'Course inscripted successfully',
                'course_id' => $result
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to inscript course']);
        }
    }
}