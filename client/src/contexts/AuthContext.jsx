import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from '../config/axios';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from token
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const res = await axios.get('/api/auth/me');
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Error loading user');
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  // Register user
  const register = async (userData) => {
    try {
      const res = await axios.post('/api/auth/register', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setError(null);
      toast.success('Registration successful!');
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    }
  };

  // Login user
  const login = async (userData) => {
    try {
      const res = await axios.post('/api/auth/login', userData);
      localStorage.setItem('token', res.data.token);
      setUser(res.data.user);
      setError(null);
      toast.success('Login successful!');
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    }
  };

  // Logout user
  const logout = async () => {
    try {
      localStorage.removeItem('token');
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err) {
      setError(err.response?.data?.message || 'Logout failed');
      throw err;
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const res = await axios.put('/api/auth/profile', userData);
      setUser(res.data);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      throw err;
    }
  };

  // Update password
  const updatePassword = async (passwordData) => {
    try {
      const res = await axios.put('/api/auth/password', passwordData);
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Password update failed');
      throw err;
    }
  };

  // Forgot password
  const forgotPassword = async (email) => {
    try {
      const res = await axios.post('/api/auth/forgot-password', { email });
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset request failed');
      throw err;
    }
  };

  // Reset password
  const resetPassword = async (token, password) => {
    try {
      const res = await axios.put(`/api/auth/reset-password/${token}`, { password });
      setError(null);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
      throw err;
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        isAuthenticated: !!user,
        register,
        login,
        logout,
        updateProfile,
        updatePassword,
        forgotPassword,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 