import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const addFaculty = async facultyData => {
  try {
    const response = await axios.post(`${API_URL}/admin/faculty`, facultyData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding faculty:', error);
    throw error;
  }
};

export const updateFaculty = async (id, facultyData) => {
  try {
    const response = await axios.put(
      `${API_URL}/admin/faculty/${id}`,
      facultyData,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error updating faculty:', error);
    throw error;
  }
};

// Function to delete a student
export const deleteFaculty = async id => {
  try {
    const response = await axios.delete(`${API_URL}/admin/faculty/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting faculty:', error);
    throw error;
  }
};

// Function to get all students
export const getAllFaculties = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/faculties`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching faculty:', error);
    throw error;
  }
};
