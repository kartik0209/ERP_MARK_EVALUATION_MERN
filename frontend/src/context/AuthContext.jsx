import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await axios.post(`${API_URL}/auth/verify`, { token });
        setUser(response.data.user);
      } catch (err) {
        console.error('Error verifying token:', err);
        localStorage.removeItem('token');
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async (identifier, password, role) => {
    try {
      let endpoint = '';
      const payload = { email: identifier, password };

      switch (role) {
        case 'admin':
          endpoint = `${API_URL}/admin/login`;
          break;
        case 'faculty':
          endpoint = `${API_URL}/faculty/login`;
          break;
        case 'student':
          endpoint = `${API_URL}/student/login`;
          break;
        default:
          throw new Error('Invalid role');
      }

      const response = await axios.post(endpoint, payload);
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'Login failed'}`);
      } else if (err.request) {
        setError('Network error, please try again later.');
      } else {
        setError(`An unexpected error occurred: ${err.message}`);
      }
      console.error('Error logging in:', err);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      localStorage.removeItem('token');
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Error logging out. Please try again.');
    }
  };

  const updateProfile = async (name, email, password) => {
    try {
      const response = await axios.put(`${API_URL}/student/update`, { name, email, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setUser(response.data);
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Profile update failed');
      } else if (err.request) {
        setError('Network error, please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error updating profile:', err);
    }
  };

  const forgotPassword = async (email) => {
    try {
      await axios.post(`${API_URL}/student/forgot-password`, { email });
      alert('Password reset link sent to your email.');
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Password reset failed');
      } else if (err.request) {
        setError('Network error, please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error in forgot password:', err);
    }
  };

  const resetPassword = async (token, password) => {
    try {
      await axios.post(`${API_URL}/student/reset-password/${token}`, { password });
      alert('Password reset successful.');
      setError(null);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || 'Password reset failed');
      } else if (err.request) {
        setError('Network error, please try again later.');
      } else {
        setError('An unexpected error occurred.');
      }
      console.error('Error in reset password:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
