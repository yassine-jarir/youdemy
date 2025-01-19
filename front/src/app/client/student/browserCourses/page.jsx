'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookOpen, ChevronRight, FileText, Tag as TagIcon, User, X } from 'lucide-react';

export default function BrowseCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const studentId = JSON.parse(Cookies.get('user')).id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:2325/api.php?route=student/allCourses');
        setCourses(coursesResponse.data.dastaa);
        setFilteredCourses(coursesResponse.data.dastaa);

        const uniqueCategories = [...new Set(coursesResponse.data.dastaa.map((course) => course.category_name))];
        setCategories(uniqueCategories);

        const enrolledResponse = await axios.get(
          `http://localhost:2325/api.php?route=student/viewMyCourses&student_id=${studentId}`
        );
        setEnrolledCourses(enrolledResponse.data || []);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.category_name === category);
      setFilteredCourses(filtered);
    }
  };

  const fetchCourseDetails = async (courseId) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=student/courseDetails', {
        course_id: courseId,
      });
      setSelectedCourse(response.data.data);
    } catch (error) {
      setError('Failed to fetch course details: ' + error.message);
    }
  };

  const handleEnroll = async (courseId) => {
    try {
      const response = await axios.post('http://localhost:2325/api.php?route=student/inscriptCourse', {
        student_id: studentId,
        course_id: courseId,
      });

      if (response.data.message === 'Course inscripted successfully') {
        alert('Enrollment successful!');
        const enrolledResponse = await axios.get(
          `http://localhost:2325/api.php?route=student/viewMyCourses&student_id=${studentId}`
        );
        setEnrolledCourses(enrolledResponse.data || []);
      } else {
        alert('Failed to enroll in the course.');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
      alert('An error occurred while enrolling in the course.');
    }
  };

  const isEnrolled = (courseId) => {
    return enrolledCourses.some((course) => course.course_id === courseId);
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
      <div className="max-w-6xl mx-auto p-8">
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
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-purple-600" />
            <h2 className="text-3xl font-bold text-gray-900">Catalogue des Cours</h2>
          </div>
          <p className="text-gray-600 ml-11 mb-6">Parcourez la liste des cours disponibles.</p>

          <div className="flex flex-wrap gap-2 ml-11">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                ${
                  selectedCategory === '' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
            >
              Toutes les catégories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 
                  ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {filteredCourses.length === 0 ? (
            <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-8 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 text-lg">Aucun cours trouvé.</p>
            </div>
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.course_id}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4">
                  <FileText className="h-6 w-6 text-purple-600 mt-1" />
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                    <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <User className="h-4 w-4" />
                      <span>{course.teacher_name}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      <TagIcon className="h-4 w-4" />
                      <span>{course.tags}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => fetchCourseDetails(course.course_id)}
                        className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors duration-200"
                      >
                        Voir les détails
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleEnroll(course.course_id)}
                        disabled={isEnrolled(course.course_id)}
                        className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors duration-200 ${
                          isEnrolled(course.course_id) ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                      >
                        {isEnrolled(course.course_id) ? 'Déjà inscrit' : "S'inscrire"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                    <h3 className="text-2xl font-bold text-gray-900">Détails du Cours</h3>
                  </div>
                  <button onClick={() => setSelectedCourse(null)} className="text-gray-400 hover:text-gray-500">
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-semibold text-gray-900">{selectedCourse.title}</h4>
                  <p className="text-gray-600">{selectedCourse.description}</p>

                  <div className="flex items-center gap-2 text-gray-600">
                    <User className="h-4 w-4" />
                    <span>Enseignant: {selectedCourse.teacher_name}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <TagIcon className="h-4 w-4" />
                    <span>Tags: {selectedCourse.tags}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
