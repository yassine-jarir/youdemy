'use client';

import { useAuth } from '@/contexts/AuthContexts';

// import { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// import { useAuth } from '@/contexts/AuthContexts';

export default function ClientLayout({ children }) {
  // const router = useRouter();
  // const [activeRole, setActiveRole] = useState('etudiant');

  // const handleRoleChange = (role) => {
  //   setActiveRole(role);
  //   // router.push(`/client/${role}`);
  // };
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-2xl font-bold text-blue-600">Youdemy</span>
            </div>
            <div className="flex space-x-4">
              {/* <button
                onClick={() => handleRoleChange('etudiant')}
                className={`px-4 py-2 rounded-lg ${
                  activeRole === 'etudiant' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Étudiant
              </button>
              <button
                onClick={() => handleRoleChange('teacher')}
                className={`px-4 py-2 rounded-lg ${
                  activeRole === 'teacher' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                }`}
              >
                Enseignant
              </button> */}
            </div>
          </div>

          <div className="flex space-x-4 mt-4 pb-4">
            {/* {activeRole === 'etudiant' && (
              <>
                <Link
                  href="/client/etudiant/browserCourses"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  Parcourir les Cours
                </Link>
                <Link
                  href="/client/etudiant/mesCours"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  Mes Cours
                </Link>
              </>
            )} */}

            {/* {activeRole === 'teacher' && (
              <>
                <Link
                  href="/client/teacher/addCourse"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  Ajouter un Cours
                </Link>
                <Link
                  href="/client/teacher/manageCourses"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  Gérer les Cours
                </Link>
                <Link
                  href="/client/teacher/viewEnrol"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100"
                >
                  Voir les Inscriptions
                </Link>
              </>
            )} */}
          </div>
        </div>
      </nav>

      <div className="bg-blue-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur Youdemy</h1>
          {/* <p className="text-lg mb-8">
            {activeRole === 'etudiant'
              ? 'Explorez notre catalogue de cours et commencez votre apprentissage dès aujourd’hui.'
              : 'Gérez vos cours, consultez les inscriptions et suivez vos statistiques.'}
          </p> */}
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
    </div>
  );
}
