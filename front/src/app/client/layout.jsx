'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { Bell, Book, BookOpen, Globe, LogOut, Plus, Search, Settings, Target, User, Users } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContexts';

import lo from '../../../public/youdemypng.png';

export default function ClientLayout({ children }) {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    const userCookie = Cookies.get('user');
    if (userCookie) {
      try {
        const userData = JSON.parse(userCookie);
        setUser(userData);
      } catch (error) {
        console.error('Failed to parse user cookie:', error);
      }
    }
  }, []);

  const isStudent = user?.role === 'student';
  const isTeacher = user?.role === 'teacher';
  const isVisitor = !user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-16">
            {!isVisitor ||
              !isStudent ||
              (!isTeacher && (
                <div className="flex justify-center items-center">
                  <Image src={lo} alt="Logo" width={120} height={120} className=" max-w-[69%]" />
                </div>
              ))}

            <div className="hidden md:flex items-center space-x-8">
              {isVisitor && (
                <>
                  <Link href="/visitor" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    Parcourir les Cours
                  </Link>
                  <Link href="/auth/sign-up" className="block px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                    Créer un Compte
                  </Link>

                  <Link
                    href="/auth/sign-in"
                    className="flex items-center space-x-2 px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                </>
              )}

              {isStudent && (
                <>
                  <div className="flex space-x-4">
                    <Link
                      href="/client/student/browserCourses"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <BookOpen className="h-5 w-5" />
                      <span>Parcourir</span>
                    </Link>
                    <Link
                      href="/client/student/mesCours"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Book className="h-5 w-5" />
                      <span>Mes Cours</span>
                    </Link>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-purple-600">
                      <Bell className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{user?.username}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}

              {isTeacher && (
                <>
                  <div className="flex space-x-4">
                    <Link
                      href="/client/teacher/addCourse"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Ajouter</span>
                    </Link>
                    <Link
                      href="/client/teacher/manageCourses"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Settings className="h-5 w-5" />
                      <span>Gérer</span>
                    </Link>
                    <Link
                      href="/client/teacher/viewEnrol"
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Users className="h-5 w-5" />
                      <span>Inscriptions</span>
                    </Link>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-gray-600 hover:text-purple-600">
                      <Bell className="h-5 w-5" />
                    </button>
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-gray-700 font-medium">{user?.username}</span>
                    </div>
                    <button
                      onClick={logout}
                      className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative overflow-hidden bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/api/placeholder/800/400')] mix-blend-overlay opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-indigo-900/90"></div>
          <div className="absolute inset-y-0 right-0 w-1/2">
            <svg
              className="absolute left-0 h-full w-48 text-purple-900 fill-current transform translate-x-1/2"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <polygon points="50,0 100,0 50,100 0,100" />
            </svg>
          </div>
        </div>

        <div className="h-[85vh] flex justify-center items-center relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
                  Bienvenue sur <span className="text-purple-300">Youdemy</span>
                </h1>
                <p className="text-xl text-purple-100">
                  {isStudent
                    ? "Embarquez pour une expérience d'apprentissage unique et personnalisée."
                    : "Partagez votre expertise et inspirez la prochaine génération d'apprenants."}
                </p>
              </div>

              {/* Feature Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                  <Globe className="h-6 w-6 text-purple-300 mb-2" />
                  <h3 className="text-lg font-semibold text-white">Cours Interactifs</h3>
                  <p className="text-purple-200 text-sm">Accédez à des contenus de qualité</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-purple-500/20">
                  <Target className="h-6 w-6 text-purple-300 mb-2" />
                  <h3 className="text-lg font-semibold text-white">Apprentissage Ciblé</h3>
                  <p className="text-purple-200 text-sm">Progressez à votre rythme</p>
                </div>
              </div>

              {/* Search Bar */}
              {isStudent && (
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-4 py-3 border border-purple-500/20 rounded-xl bg-white/10 backdrop-blur-sm text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Rechercher un cours..."
                  />
                </div>
              )}
            </div>

            {/* Stats Section */}
            <div className="hidden md:block relative">
              <div className="absolute -inset-4">
                <div className="w-full h-full mx-auto opacity-30 blur-lg filter bg-gradient-to-r from-purple-400 to-indigo-400"></div>
              </div>
              <div className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">100+</div>
                    <div className="text-purple-200 mt-1">Cours Disponibles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">50+</div>
                    <div className="text-purple-200 mt-1">Instructeurs</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">1000+</div>
                    <div className="text-purple-200 mt-1">Étudiants</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white">24/7</div>
                    <div className="text-purple-200 mt-1">Support</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm p-6">{children}</div>
      </main>
    </div>
  );
}
