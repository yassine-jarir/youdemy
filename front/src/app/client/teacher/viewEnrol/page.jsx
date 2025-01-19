'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ViewEnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const teacher_id = Cookies.get('user') ? JSON.parse(Cookies.get('user')).id : '';
      console.log(teacher_id);
      try {
        const enrollmentsResponse = await axios.post('http://localhost:2325/api.php?route=teacher/inscription', {
          teacher_id,
        });
        setEnrollments(enrollmentsResponse.data.data);
        console.log(enrollments);
      } catch (error) {
        setError('Failed to fetch data: ' + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Voir les Inscriptions</h2>
      <p className="text-gray-600 mb-6">Liste des étudiants inscrits à vos cours.</p>

      {enrollments.length === 0 ? (
        <p>Aucune inscription trouvée.</p>
      ) : (
        <ul>
          {enrollments.map((enrollment) => (
            <li key={enrollment.enrollment_id} className="mb-4 p-4 border rounded-lg">
              <h3 className="text-xl font-bold">{enrollment.course_title}</h3>
              <p className="text-gray-600">Étudiant: {enrollment.student_name}</p>
              <p className="text-gray-600">
                Date d'inscription: {new Date(enrollment.enrollment_date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
