// src/api/studentApi.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Ensure this environment variable is correctly set

// Function to add a student
export const addStudent = async studentData => {
  try {
    const response = await axios.post(`${API_URL}/admin/student`, studentData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding student:', error);
    throw error;
  }
};

// Function to update a student
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/student/${id}`,
      studentData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating student:', error);
    throw error;
  }
};

// Function to delete a student
export const deleteStudent = async id => {
  try {
    const response = await axios.delete(`${API_URL}/admin/student/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting student:', error);
    throw error;
  }
};

// Function to get all students
export const getAllStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/students`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};
