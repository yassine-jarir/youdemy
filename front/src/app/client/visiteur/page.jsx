'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { BookOpen, FileText, Tag as TagIcon, User, X } from 'lucide-react';

export default function VisiteursPage() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const coursesResponse = await axios.get('http://localhost:2325/api.php?route=student/allCourses');
        setCourses(coursesResponse.data.dastaa);
        setFilteredCourses(coursesResponse.data.dastaa);

        const uniqueCategories = [...new Set(coursesResponse.data.dastaa.map((course) => course.category_name))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === '') {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.category_name === category);
      setFilteredCourses(filtered);
    }
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
                      <Link
                        href="/auth/sign-in"
                        className={`flex items-center justify-center gap-2 w-full px-4 py-2 text-sm font-medium text-white bg-purple-700 rounded-lg hover:bg-purple-900 transition-colors duration-200  `}
                      >
                        S'inscrire
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
