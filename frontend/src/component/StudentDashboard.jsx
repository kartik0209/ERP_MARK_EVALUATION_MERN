import React, { useState, useEffect } from 'react';
import {
  getStudentDetails,
  updateStudentProfile,
} from '../api/student/student';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formError, setFormError] = useState('');
  const [updatedProfile, setUpdatedProfile] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const data = await getStudentDetails();
        setStudent(data);
        setUpdatedProfile({
          name: data.name,
          email: data.email,
          password: '',
        });
      } catch (error) {
        console.error('Error fetching student details:', error);
        setFormError('Error fetching student details');
      }
    };
    fetchStudentDetails();
  }, []);

  const handleUpdateProfile = async () => {
    setFormError('');
    try {
      await updateStudentProfile(updatedProfile);
      setStudent({
        ...student,
        ...updatedProfile,
      });
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setFormError('Error updating profile');
    }
  };

  if (!student) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Student Dashboard</h1>

      {formError && <p className="text-red-500 mb-4">{formError}</p>}

      {editMode ? (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              value={updatedProfile.name}
              onChange={e =>
                setUpdatedProfile({ ...updatedProfile, name: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email:</label>
            <input
              type="email"
              value={updatedProfile.email}
              onChange={e =>
                setUpdatedProfile({ ...updatedProfile, email: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password:</label>
            <input
              type="password"
              value={updatedProfile.password}
              onChange={e =>
                setUpdatedProfile({
                  ...updatedProfile,
                  password: e.target.value,
                })
              }
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 ml-4"
          >
            Cancel
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Profile Details</h2>
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Email:</strong> {student.email}
          </p>
          <p>
            <strong>Department:</strong> {student.department}
          </p>
          <p>
            <strong>Enrollment Number:</strong> {student.enrollmentNumber}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
