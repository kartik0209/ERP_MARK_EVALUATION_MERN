import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL; // Ensure this environment variable is correctly set

// Function to get all subjects
export const getAllSubjects = async () => {
  try {
    const response = await axios.get(`${API_URL}/faculty/allsub`);
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw error;
  }
};

// Other functions can be added here...
