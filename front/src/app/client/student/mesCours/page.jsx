'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookOpen, FileText, Tag as TagIcon, User } from 'lucide-react';

export default function MyCoursesPage() {
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const studentId = JSON.parse(Cookies.get('user')).id;

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.post(`http://localhost:2325/api.php?route=student/viewMyCourses`, {
          student_id: studentId,
        });
        setEnrolledCourses(response.data.data || []);
      } catch (error) {
        setError('Failed to fetch enrolled courses: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrolledCourses();
  }, [studentId]);

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
            <h2 className="text-2xl font-bold text-gray-900">Mes Cours</h2>
          </div>
          <p className="text-gray-600 ml-11 mb-6">Liste des cours auxquels vous êtes inscrit.</p>

          <div className="grid gap-6 md:grid-cols-2">
            {enrolledCourses.length === 0 ? (
              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-8 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 text-lg">Aucun cours trouvé.</p>
              </div>
            ) : (
              enrolledCourses.map((course) => (
                <div
                  key={course.course_id}
                  className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <BookOpen className="h-6 w-6 text-purple-600 mt-1" />
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h4>
                      <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <User className="h-4 w-4" />
                        <span>Enseignant: {course.teacher_name}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <TagIcon className="h-4 w-4" />
                        <span>Tags: {course.tags}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Date d'inscription: {new Date(course.enrollment_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
