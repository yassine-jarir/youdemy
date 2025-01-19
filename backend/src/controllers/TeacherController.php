<?php
namespace Controllers;

require_once(dirname(__FILE__) . "/../models/Teacher.php");
use Models\Teacher;

class TeacherController
{
    private $teacher;

    public function __construct()
    {
        $this->teacher = new Teacher();
    }

    public function addCourse()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (
            empty($data->title) || empty($data->description) ||
            empty($data->content) || empty($data->teacher_id) ||
            empty($data->category_id) || empty($data->content_url) || empty($data->image_url) || empty($data->tags)
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }

        $courseData = [
            'title' => $data->title,
            'description' => $data->description,
            'content' => $data->content,
            'teacher_id' => $data->teacher_id,
            'category_id' => $data->category_id,
            'content_url' => $data->content_url,
            'image_url' => $data->image_url,
            'tags' => $data->tags,
            'content_type' => $data->content_type

        ];

        $result = $this->teacher->addCourse($courseData);
        if ($result) {
            http_response_code(201);
            echo json_encode([
                'message' => 'Course created successfully',
                'course_id' => $result
            ]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create course']);
        }
    }

    public function getAllTeacherCourses()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->teacher_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Teacher ID is required']);
            return;
        }

        $courses = $this->teacher->manageCourses($data->teacher_id);
        echo json_encode(['data' => $courses]);
    }
    public function modifierCourse($id)
    {
        $data = json_decode(file_get_contents("php://input"));
        if (
            empty($data->title) || empty($data->description) ||
            empty($data->content) || empty($data->teacher_id) ||
            empty($data->category_id) || empty($data->content_type)
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }

        $courseData = [
            'title' => $data->title,
            'description' => $data->description,
            'content' => $data->content,
            'teacher_id' => $data->teacher_id,
            'category_id' => $data->category_id,
            'content_url' => $data->content_url,
            'image_url' => $data->image_url,
            'content_type' => $data->content_type
        ];

        $result = $this->teacher->updateCourse($id, $courseData);
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Course updated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update course']);
        }
    }
    public function supprimerCourse($id)
    {
        $result = $this->teacher->deleteCourse($id);
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Course deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete course']);
        }
    }
    public function viewCourseDetails($id)
    {
        $result = $this->teacher->getCategoryByID($id);

        echo json_encode(['data' => $result]);
        if ($result) {

            return $result;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to get course']);
        }
    }

    public function viewEnrollments()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->teacher_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Teacher ID is required']);
            return;
        }

        $enrollments = $this->teacher->viewEnrollments($data->teacher_id);
        echo json_encode(['data' => $enrollments]);
    }

    public function viewStatistics()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->teacher_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Teacher ID is required']);
            return;
        }

        $statistics = $this->teacher->viewStatistics($data->teacher_id);
        if ($statistics) {
            echo json_encode(['data' => $statistics]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch statistics']);
        }
    }



}