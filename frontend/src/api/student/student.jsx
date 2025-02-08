import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getStudentDetails = async () => {
  try {
    const response = await axios.get(`${API_URL}/student/details`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching student details:', error);
    throw error;
  }
};

export const updateStudentProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}/student/update`, profileData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};
