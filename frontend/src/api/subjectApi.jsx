import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
export const addSubject = async subjectData => {
  try {
    const response = await axios.post(`${API_URL}/admin/subject`, subjectData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding subject:', error);
    throw error;
  }
};

export const getAllSubject = async () => {
  try {
    const response = await axios.get(`${API_URL}/admin/subjects`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};
