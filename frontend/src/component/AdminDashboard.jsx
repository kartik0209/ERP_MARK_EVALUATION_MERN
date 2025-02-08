import React from 'react';
import { Link } from 'react-router-dom';
import { FaUserGraduate, FaChalkboardTeacher, FaHome, FaBook } from 'react-icons/fa';

const AdminDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white flex flex-col">
        <div className="flex items-center justify-center h-16 bg-blue-900">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin-dashboard"
                className="flex items-center p-4 text-white hover:bg-blue-700 transition duration-300"
              >
                <FaHome className="mr-3" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/admin/students"
                className="flex items-center p-4 text-white hover:bg-blue-700 transition duration-300"
              >
                <FaUserGraduate className="mr-3" />
                Students
              </Link>
            </li>
            <li>
              <Link
                to="/admin/faculty"
                className="flex items-center p-4 text-white hover:bg-blue-700 transition duration-300"
              >
                <FaChalkboardTeacher className="mr-3" />
                Faculty
              </Link>
            </li>
            <li>
              <Link
                to="/admin/subjects"
                className="flex items-center p-4 text-white hover:bg-blue-700 transition duration-300"
              >
                <FaBook className="mr-3" />
                Subjects
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-grow p-6">
        <h2 className="text-3xl font-semibold mb-6">Welcome, Admin!</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Manage Students</h3>
            <p className="text-gray-600">View, add, and manage students here.</p>
            <Link
              to="/admin/students"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Manage Students
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Manage Faculty</h3>
            <p className="text-gray-600">View, add, and manage faculty members here.</p>
            <Link
              to="/admin/faculty"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Manage Faculty
            </Link>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-xl font-bold mb-4">Manage Subjects</h3>
            <p className="text-gray-600">View, add, and manage subjects here.</p>
            <Link
              to="/admin/subjects"
              className="mt-4 inline-block bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Manage Subjects
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
