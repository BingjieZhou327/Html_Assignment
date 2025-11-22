import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Add token to requests if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login API
export const login = async (username, password) => {
  try {
    const response = await api.post('/api/login', { username, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Login failed' };
  }
};

// Fetch images from backend
export const fetchImages = async () => {
  try {
    const response = await api.get('/api/images');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch images' };
  }
};

// Fetch all users (Admin only)
export const fetchUsers = async () => {
  try {
    const response = await api.get('/api/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch users' };
  }
};

// Fetch all jobs
export const fetchJobs = async () => {
  try {
    const response = await api.get('/api/jobs');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch jobs' };
  }
};

// Create a new job (Admin only)
export const createJob = async (jobData) => {
  try {
    const response = await api.post('/api/create/job', jobData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to create job' };
  }
};

// Session management
export const setSession = (token, user, userType) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('userType', userType);
};

export const getSession = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  const userType = localStorage.getItem('userType');
  return {
    token,
    user: user ? JSON.parse(user) : null,
    userType,
  };
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('userType');
};

export const isAuthenticated = () => {
  const { token } = getSession();
  return !!token;
};

export const getUserType = () => {
  const { userType } = getSession();
  return userType;
};

export default api;

