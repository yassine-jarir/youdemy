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
    public function getAllTeachers()
    {
        try {

            $teachers = $this->admin->getAllTeachers();

            if ($teachers) {

                http_response_code(200);
                echo json_encode(['data' => $teachers]);
            } else {

                http_response_code(404);
                echo json_encode(['error' => 'No teachers found']);
            }
        } catch (\PDOException $e) {

            error_log("Error fetching teachers: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch teachers']);
        }
    }

    // manage teachers
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
    public function getAllUsers()
    {
        try {

            $users = $this->admin->getAllUsers();

            if ($users) {

                http_response_code(200);
                echo json_encode(['data' => $users]);
            } else {

                http_response_code(404);
                echo json_encode(['error' => 'No users found']);
            }
        } catch (\PDOException $e) {

            error_log("Error fetching users: " . $e->getMessage());
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch users']);
        }
    }
    public function activate()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->user_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'User ID is required']);
            return;
        }

        $result = $this->admin->StatusActiveSuspend($data->user_id, 1);
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

        $result = $this->admin->StatusActiveSuspend($data->user_id, 0);
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

    // COURSE CRUUUUUUD 
    public function getAllCourses()
    {
        $courses = $this->admin->getAllCoursesWithDetails(null);

        if ($courses) {
            http_response_code(200);
            echo json_encode(['data' => $courses]);
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
    public function supprimerCourse()// done
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->course_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'course_id is required']);
            return;
        }

        $result = $this->admin->deleteCourse($data->course_id);
        if ($result) {
            http_response_code(200);
            echo json_encode(['message' => 'Course deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete course']);
        }
    }

    // Tags CRUD
    public function getAllTags()
    {
        $tags = $this->admin->getAllTags();
        if ($tags) {
            echo json_encode(['data' => $tags]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch tags']);
        }
    }


    public function addTag()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->name)) {
            http_response_code(400);
            echo json_encode(['error' => 'Tag name is required']);
            return;
        }

        $result = $this->admin->addTag($data->name);

        if ($result) {
            echo json_encode(['message' => 'Tag inserted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to insert tag']);
        }
    }


    public function deleteTag()
    {
        $data = json_decode(file_get_contents("php://input"));
        if (empty($data->tag_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Tag ID is required']);
            return;
        }

        $result = $this->admin->deleteTag($data->tag_id);
        if ($result) {
            echo json_encode(['message' => 'Tag deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete tag']);
        }
    }


    // category CRUD
    public function getAllCategories()
    {
        $categories = $this->admin->getAllCategories();
        if ($categories) {
            echo json_encode(['data' => $categories]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to fetch categories']);
        }
    }

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

    public function updateCategory()
    {
        $data = json_decode(file_get_contents('PHP://input'));
        if (empty($data->category_id) || empty($data->name)) {
            http_response_code(400);
            echo json_encode(['error' => "all fields are required"]);
            return;
        }

        $result = $this->admin->updateCategory($data->category_id, $data->name);
        if ($result) {
            echo json_encode(['message' => 'Category updated successfully']);
            return $result;

        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update category']);
        }
    }

    public function deleteCategory()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (
            empty($data->category_id)

        ) {
            http_response_code(400);
            echo json_encode(['error' => 'Category ID is required']);
            return;
        }

        $result = $this->admin->deleteCategory($data->category_id);
        if ($result) {
            echo json_encode(['message' => 'Category deleted successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete category']);
        }
    }

    public function getCategoryById()
    {
        $data = json_decode(file_get_contents("php://input"));

        if (empty($data->category_id)) {
            http_response_code(400);
            echo json_encode(['error' => 'Category ID is required']);
            return;
        }

        $category = $this->admin->getCategoryByID($data->category_id);
        if ($category) {
            echo json_encode(['data' => $category]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Category not found']);
        }
    }

}