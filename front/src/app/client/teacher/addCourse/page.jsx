'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Cookies from 'js-cookie';
import { BookOpen, FileText, Folder, Image as ImageIcon, Link as LinkIcon, Tag, Video } from 'lucide-react';

export default function AddCoursePage() {
  const router = useRouter();
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
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentStep, setCurrentStep] = useState(1);

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
      !formData.image_url ||
      !formData.content_url ||
      !formData.content_type
    ) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:2325/api.php?route=teacher/course/add', formData);

      if (response.data.message === 'Course created successfully') {
        setSuccess('Course created successfully!');
        setError('');
        setTimeout(() => {
          router.push('/client/teacher/manageCourses');
        }, 2000);
      } else {
        setError('Failed to create course');
      }
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to create course');
    }
  };

  const steps = [
    { number: 1, title: 'Informations de base' },
    { number: 2, title: 'Contenu du cours' },
    { number: 3, title: 'Médias et catégorisation' },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 mb-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Créer un Nouveau Cours</h2>
        <p className="text-purple-200">Partagez votre expertise avec le monde</p>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center">
          {steps.map((step) => (
            <div key={step.number} className="flex-1">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.number ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.number}
                </div>
                <div className={`flex-1 h-1 mx-2 ${currentStep > step.number ? 'bg-purple-600' : 'bg-gray-200'}`}></div>
                <span className="text-sm text-gray-600">{step.title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
          <p className="text-red-600">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-50 border border-green-200">
          <p className="text-green-600">{success}</p>
        </div>
      )}

      <div className="bg-white rounded-2xl p-8 shadow-lg border border-purple-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="title">
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-purple-600" />
                    Titre du cours
                  </span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  placeholder="Entrez le titre de votre cours"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Description
                  </span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  rows="4"
                  placeholder="Décrivez votre cours en quelques phrases"
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="content">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-purple-600" />
                    Contenu du cours
                  </span>
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  rows="8"
                  placeholder="Détaillez le contenu de votre cours"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="content_type">
                  <span className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-purple-600" />
                    Type de contenu
                  </span>
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
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="category_id">
                    <span className="flex items-center gap-2">
                      <Folder className="h-4 w-4 text-purple-600" />
                      Catégorie
                    </span>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="tags">
                    <span className="flex items-center gap-2">
                      <Tag className="h-4 w-4 text-purple-600" />
                      Tags
                    </span>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="content_url">
                  <span className="flex items-center gap-2">
                    <LinkIcon className="h-4 w-4 text-purple-600" />
                    URL du contenu
                  </span>
                </label>
                <input
                  type="text"
                  id="content_url"
                  name="content_url"
                  value={formData.content_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image_url">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4 text-purple-600" />
                    URL de l'image
                  </span>
                </label>
                <input
                  type="text"
                  id="image_url"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                  placeholder="https://"
                />
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors"
              >
                Précédent
              </button>
            )}
            {currentStep < 3 && (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors ml-auto"
              >
                Suivant
              </button>
            )}
            {currentStep === 3 && (
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 transition-colors ml-auto"
              >
                Créer le cours
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
