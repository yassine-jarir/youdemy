'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaBookOpen, FaEdit, FaFolder, FaPlus, FaTags, FaTrash } from 'react-icons/fa';

export default function Page() {
  const [courses, setCourses] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [loading, setLoading] = useState(true);
  const [showTagForm, setShowTagForm] = useState(false);
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:2325/api.php?route=admin/courses/all');
      setCourses(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await axios.get('http://localhost:2325/api.php?route=admin/tags');
      setTags(response.data.data);
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };
  const saveTag = async (data) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=admin/tags', {
        name: data.name,
      });
      if (response.data.message) {
        response.data.message;
        fetchTags();
        setShowTagForm(false);
      }
    } catch (error) {
      console.error('Failed to save tag:', error);
      error.response?.data?.error || 'Failed to save tag';
    }
  };
  const deleteCourse = async (courseId) => {
    try {
      const response = await axios.delete('http://localhost:2325/api.php?route=admin/courses/delete', {
        data: { course_id: courseId },
      });

      if (response.data.message) {
        alert(response.data.message);
        fetchCourses();
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to delete course');
    }
  };
  const deleteTag = async (tagId) => {
    try {
      const response = await axios.delete('http://localhost:2325/api.php?route=admin/tags', {
        data: { tag_id: tagId },
      });
      if (response.data.message) {
        fetchTags();
      }
    } catch (error) {
      console.error('Failed to delete tag:', error);
      error.response?.data?.error || 'Failed to delete tag';
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:2325/api.php?route=admin/categories');
      setCategories(response.data.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };
  const saveCategory = async (data) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=admin/categories', {
        name: data.name,
      });
      if (response.data.message) {
        response.data.message;
        fetchCategories();
        setShowCategoryForm(false);
      }
    } catch (error) {
      console.error('Failed to save category:', error);
      error.response?.data?.error || 'Failed to save category';
    }
  };
  const updateCategory = async (data) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=admin/categories/update', {
        category_id: editCategory.category_id,
        name: data.name,
      });
      if (response.data.message) {
        response.data.message;
        fetchCategories();
        setShowCategoryForm(false);
      }
    } catch (error) {
      console.error('Failed to update category:', error);
      error.response?.data?.error || 'Failed to update category';
    }
  };
  const deleteCategory = async (categoryId) => {
    try {
      const response = await axios.delete('http://localhost:2325/api.php?route=admin/categories/delete', {
        data: { category_id: categoryId },
      });
      if (response.data.message) {
        response.data.message;
        fetchCategories();
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
      error.response?.data?.error || 'Failed to delete category';
    }
  };
  useEffect(() => {
    fetchCourses();
    fetchTags();
    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100" style={{ backgroundColor: '#f5f6f8' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Content Management</h1>
          <p className="mt-2 text-lg text-gray-600">Manage your courses, tags, and categories</p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <FaBookOpen className="h-8 w-8 text-blue-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Courses</p>
                    <p className="text-2xl font-semibold text-gray-900">{courses.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <FaTags className="h-8 w-8 text-green-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Tags</p>
                    <p className="text-2xl font-semibold text-gray-900">{tags.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center">
                  <FaFolder className="h-8 w-8 text-purple-500" />
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Categories</p>
                    <p className="text-2xl font-semibold text-gray-900">{categories.length}</p>
                  </div>
                </div>
              </div>
            </div>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Courses</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses && courses.length > 0 ? (
                  courses.map((course) => (
                    <div
                      key={course.course_id}
                      className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 transition duration-150 ease-in-out hover:shadow-md"
                    >
                      {course.image_url && (
                        <div className="relative h-48 w-full">
                          <img src={course.image_url} alt={course.title} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                        <p className="text-gray-600 text-sm line-clamp-2 mb-4">{course.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Category:</span>
                            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs">
                              {course.category_name}
                            </span>
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="font-medium">Teacher:</span>
                            <span className="ml-2">{course.teacher_name}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-3">
                            {course.tags ? (
                              course.tags.split(',').map((tag, index) => (
                                <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                                  {tag.trim()}
                                </span>
                              ))
                            ) : (
                              <span className="text-gray-500 text-xs">No tags available</span>
                            )}
                          </div>
                        </div>
                        <div className="mt-6 flex space-x-3">
                          <button
                            onClick={() => setSelectedCourse(course)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150 ease-in-out"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => deleteCourse(course.course_id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150 ease-in-out"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full">
                    <p className="text-center text-gray-500 py-8">No courses found.</p>
                  </div>
                )}
              </div>
            </section>
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Tags</h2>
                <button
                  onClick={() => setShowTagForm(true)}
                  className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-150 ease-in-out shadow-sm"
                >
                  <FaPlus className="mr-2" />
                  Add Tag
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {tags.map((tag) => (
                  <div
                    key={tag.tag_id}
                    className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-medium text-gray-900">{tag.name}</span>
                      <button
                        onClick={() => deleteTag(tag.tag_id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150"
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Categories</h2>
                <button
                  onClick={() => {
                    setEditCategory(null);
                    setShowCategoryForm(true);
                  }}
                  className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-150 ease-in-out shadow-sm"
                >
                  <FaPlus className="mr-2" />
                  Add Category
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.map((category) => (
                  <div
                    key={category.category_id}
                    className="bg-white rounded-xl shadow-sm p-4 border border-gray-100 hover:shadow-md transition duration-150 ease-in-out"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-medium text-gray-900">{category.name}</span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => {
                            setEditCategory(category);
                            setShowCategoryForm(true);
                          }}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition duration-150"
                        >
                          <FaEdit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteCategory(category.category_id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition duration-150"
                        >
                          <FaTrash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {showTagForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Add Tag</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                saveTag({ name: formData.get('name') });
              }}
              className="p-6"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="tagName" className="block text-sm font-medium text-gray-700 mb-1">
                    Tag Name
                  </label>
                  <input
                    id="tagName"
                    type="text"
                    name="name"
                    placeholder="Enter tag name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTagForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                >
                  Save Tag
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">{editCategory ? 'Edit Category' : 'Add Category'}</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                if (editCategory) {
                  updateCategory({ name: formData.get('name') });
                } else {
                  saveCategory({ name: formData.get('name') });
                }
              }}
              className="p-6"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-1">
                    Category Name
                  </label>
                  <input
                    id="categoryName"
                    type="text"
                    name="name"
                    defaultValue={editCategory?.name}
                    placeholder="Enter category name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowCategoryForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-150"
                >
                  {editCategory ? 'Update Category' : 'Save Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedCourse && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Course Details</h2>
            </div>
            <div className="p-6">
              {selectedCourse.image_url && (
                <img
                  src={selectedCourse.image_url}
                  alt={selectedCourse.title}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Title</h3>
                  <p className="mt-1 text-lg text-gray-900">{selectedCourse.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-gray-700">{selectedCourse.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Category</h3>
                    <p className="mt-1 text-gray-900">{selectedCourse.category_name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Teacher</h3>
                    <p className="mt-1 text-gray-900">{selectedCourse.teacher_name}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {selectedCourse.tags ? (
                      selectedCourse.tags.split(',').map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {tag.trim()}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 text-sm">No tags available</span>
                    )}
                  </div>
                </div>
                {selectedCourse.content_url && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Content</h3>
                    <a
                      href={selectedCourse.content_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center text-blue-600 hover:text-blue-700"
                    >
                      View Course Content
                      <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </a>
                  </div>
                )}
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
