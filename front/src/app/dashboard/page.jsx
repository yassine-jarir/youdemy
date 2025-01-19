'use client';

import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const DashboardOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('http://localhost:2325/index.php?route=admin/globalStats');
        const result = await response.json();
        setStats(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const chartData = [
    { name: 'Total Users', value: stats?.user_statistics.total_users || 0 },
    { name: 'Total Students', value: stats?.user_statistics.total_students || 0 },
    { name: 'Total Teachers', value: stats?.user_statistics.total_teachers || 0 },
    { name: 'Total Courses', value: stats?.course_statistics.total_courses || 0 },
    { name: 'Active Students', value: stats?.enrollment_statistics.active_students || 0 },
    { name: 'Enrollments', value: stats?.enrollment_statistics.total_enrollments || 0 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Users</span>
              <span className="text-2xl font-bold text-blue-600">{stats.user_statistics.total_users}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Students</span>
              <span className="text-2xl font-bold text-green-600">{stats.user_statistics.total_students}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Teachers</span>
              <span className="text-2xl font-bold text-purple-600">{stats.user_statistics.total_teachers}</span>
            </div>
          </div>
        </div>

        {/* Course Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Courses</span>
              <span className="text-2xl font-bold text-blue-600">{stats.course_statistics.total_courses}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Categories</span>
              <span className="text-2xl font-bold text-green-600">{stats.course_statistics.total_categories}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Teachers</span>
              <span className="text-2xl font-bold text-purple-600">{stats.course_statistics.active_teachers}</span>
            </div>
          </div>
        </div>

        {/* Enrollment Statistics */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Enrollment Statistics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Enrollments</span>
              <span className="text-2xl font-bold text-blue-600">{stats.enrollment_statistics.total_enrollments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Students</span>
              <span className="text-2xl font-bold text-green-600">{stats.enrollment_statistics.active_students}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Active Courses</span>
              <span className="text-2xl font-bold text-purple-600">
                {stats.enrollment_statistics.courses_with_enrollments}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview Chart</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;
