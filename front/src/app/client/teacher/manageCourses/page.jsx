'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
  BookOpen,
  Edit3,
  FileText,
  Folder,
  Image as ImageIcon,
  Link as LinkIcon,
  Tag,
  Trash2,
  Video,
} from 'lucide-react';

export default function ManageCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    category_id: '',
    teacher_id: Cookies.get('user') ? JSON.parse(Cookies.get('user')).id : '',
    content_url: '',
    image_url: '',
    content_type: '',
    tags: [],
  });
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const teacher_id = Cookies.get('user') ? JSON.parse(Cookies.get('user')).id : '';
      console.log('Teacher ID:', teacher_id);

      try {
        const response = await axios.post('http://localhost:2325/api.php?route=teacher/courses/manage', {
          teacher_id,
        });
        setCourses(response.data.data);
      } catch (error) {
        setError('Failed to fetch courses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const fetchCategoriesAndTags = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:2325/api.php?route=admin/categories');
        const tagsResponse = await axios.get('http://localhost:2325/api.php?route=admin/tags');

        if (categoriesResponse.data.data) {
          setCategories(categoriesResponse.data.data);
        }
        if (tagsResponse.data.data) {
          setTags(tagsResponse.data.data);
        }
      } catch (error) {
        console.error('Failed to fetch categories or tags:', error);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const response = await axios.delete('http://localhost:2325/api.php?route=admin/courses/delete', {
        data: { course_id: courseId },
      });
      setCourses(courses.filter((course) => course.course_id !== courseId));
    } catch (error) {
      setError('Failed to delete course: ' + error.message);
    }
  };

  const handleUpdateCourse = async (courseId, updatedData) => {
    try {
      const response = await axios.post(
        `http://localhost:2325/api.php?route=teacher/course/getAndPost/${courseId}`,
        updatedData
      );

      if (response.data.message === 'Course updated successfully') {
        setCourses(courses.map((course) => (course.course_id === courseId ? { ...course, ...updatedData } : course)));
        setEditingCourse(null);
      }
    } catch (error) {
      setError('Failed to update course: ' + (error.response?.data?.error || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTagsChange = (e) => {
    const selectedTags = Array.from(e.target.selectedOptions, (option) => parseInt(option.value));
    setFormData({
      ...formData,
      tags: selectedTags,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.description ||
      !formData.content ||
      !formData.category_id ||
      !formData.teacher_id ||
      !formData.content_type
    ) {
      setError('All fields are required');
      return;
    }

    await handleUpdateCourse(editingCourse.course_id, formData);
  };

  const startEditingCourse = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      content: course.content,
      category_id: course.category_id,
      teacher_id: course.teacher_id,
      content_url: course.content_url || '',
      image_url: course.image_url || '',
      content_type: course.content_type || '',
      tags: course.tags || [],
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3">
          <FileText className="text-red-500 h-5 w-5" />
          <p className="text-red-600 font-medium">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Gérer les Cours</h2>
          </div>
          <p className="text-gray-600 ml-11">Liste des cours disponibles pour modification ou suppression.</p>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 text-lg">Aucun cours trouvé.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    {course.image_url && (
                      <div className="relative h-48 w-full rounded-sm">
                        <img src={course.image_url} className="w-full h-full object-cover rounded-lg" />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleDeleteCourse(course.course_id)}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        Supprimer
                      </button>
                      <button
                        onClick={() => startEditingCourse(course)}
                        className="flex items-center justify-center gap-2 flex-1 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                      >
                        <Edit3 className="h-4 w-4" />
                        Modifier
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {editingCourse && (
          <div className="mt-8 bg-white rounded-xl shadow-sm p-8">
            <div className="flex items-center gap-3 mb-6">
              <Edit3 className="h-6 w-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">Modifier le Cours</h3>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                  <FileText className="h-4 w-4" />
                  Titre du cours
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  <FileText className="h-4 w-4" />
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  rows="4"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="content">
                  <FileText className="h-4 w-4" />
                  Contenu du cours
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  rows="6"
                  required
                />
              </div>

              <div>
                <label
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2"
                  htmlFor="content_type"
                >
                  <Video className="h-4 w-4" />
                  Type de contenu
                </label>
                <select
                  id="content_type"
                  name="content_type"
                  value={formData.content_type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Sélectionnez un type de contenu</option>
                  <option value="document">Document</option>
                  <option value="video">Vidéo</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="category_id">
                  <Folder className="h-4 w-4" />
                  Catégorie
                </label>
                <select
                  id="category_id"
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category.category_id} value={category.category_id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="tags">
                  <Tag className="h-4 w-4" />
                  Tags
                </label>
                <select
                  id="tags"
                  name="tags"
                  multiple
                  value={formData.tags}
                  onChange={handleTagsChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                >
                  {tags.map((tag) => (
                    <option key={tag.tag_id} value={tag.tag_id}>
                      {tag.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="content_url">
                  <LinkIcon className="h-4 w-4" />
                  URL du contenu
                </label>
                <input
                  type="text"
                  id="content_url"
                  name="content_url"
                  value={formData.content_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2" htmlFor="image_url">
                  <ImageIcon className="h-4 w-4" />
                  URL de l'image
                </label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-6 py-3 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200"
                >
                  <Edit3 className="h-4 w-4" />
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
