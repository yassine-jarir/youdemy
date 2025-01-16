<?php
namespace Controllers;

require_once(dirname(__FILE__) . "/../models/AdminModel.php");
use Models\Admin;

class AdminController
{
    private $admin;

    public function __construct()
    {
        $this->admin = new Admin();
    }

    public function validateTeacherAccounts()
    {
        $data = json_decode(json: file_get_contents("php://input"));

        if (empty($data->teacher_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Teacher ID is required']);
            return;
        }

        $result = $this->admin->validateTeacherAccounts($data->teacher_id);

        if ($result) {
            echo json_encode(['message' => 'Teacher account validated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to validate teacher account']);
        }
    }
    public function invalidateTeacherAccounts()
    {
        $data = json_decode(file_get_contents("PHP://input"));
        if (empty($data->teacher_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Teacher ID is required']);
            return;
        }

        $result = $this->admin->invalidateTeacherAccounts($data->teacher_id, 0);

        if ($result) {
            echo json_encode(['message' => 'Teacher account invalidated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to invalidate teacher account']);
        }
    }

    //   active suspend delete user
    public function activate()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->user_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        $result = $this->admin->updateStatus($data->user_id, 1);
        if ($result) {
            echo json_encode(['message' => 'User activated successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to activate user']);
        }
    }

    public function suspend()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->user_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        $result = $this->admin->updateStatus($data->user_id, 0);
        if ($result) {
            echo json_encode(['message' => 'User suspended successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to suspend user']);
        }
    }

    public function delete()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->user_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        $result = $this->admin->deleteUser($data->user_id);
        if ($result) {
            echo json_encode(['message' => 'User deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete user']);
        }
    }





    public function getAllCourses()
    {

        $courses = $this->admin->getAllCoursesWithDetails();

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

        $course = $this->admin->getCourseById($data['course_id']);

        if ($course) {
            echo json_encode(['data' => $course]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Course not found']);
        }
    }

    public function supprimerCourse($id)// done
    {
        $result = $this->admin->deleteCourse($id);
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Course deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete course']);
        }
    }
    public function bulkInsertTags()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->tags) || !is_array($data->tags)) {
            http_response_code(400);
            echo json_encode(['error' => 'Tags array is required']);
            return;
        }

        $result = $this->admin->bulkInsertTags($data->tags);

        if ($result) {
            echo json_encode(['message' => 'Tags inserted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to insert tags']);
        }
    }

    public function viewGlobalStatistics()
    {
        $stats = $this->admin->viewGlobalStatistics();

        if ($stats) {
            echo json_encode(['data' => $stats]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch statistics']);
        }
    }


    //  admin add tags and category && active desactive && suspend






















    // Add Category doneeee
    public function addCategory()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (
            empty($data->name)
        ) {
            http_response_code(400);
            echo json_encode(['error' => 'All fields are required']);
            return;
        }

        $result = $this->admin->addCategory($data->name);
        if ($result) {

            echo json_encode(['message' => 'Course created successfully ', 'resule' => $result]);

        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to create course']);
        }
    }

    // Update Category
    public function updateCategory()
    {
        $data = json_decode(file_get_contents('PHP://input'));
        if (empty($data->name)) {
            http_response_code(400);
            echo json_encode(['error' => "all fields are required"]);
            return;
        }

        $result = $this->admin->updateCategory($data->name);
        return $result;
    }

    // // Delete Category 
    // public function deleteCategory($request, $response, $args)
    // {
    //     $result = $this->adminModel->deleteCategory($args['id']);
    //     return $response->withJson($result);
    // }

    // // Get All Categories
    // public function getAllCategories($request, $response, $args)
    // {
    //     $result = $this->adminModel->getAllCategories();
    //     return $response->withJson($result);
    // }

    // get category by id

    // Get Category by ID
    public function getCategoryByID($id)
    {
        $result = $this->admin->getCategoryByID($id);

        echo json_encode(['data' => $result]);
        if ($result) {

            return $result;
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to get course']);
        }
    }


}