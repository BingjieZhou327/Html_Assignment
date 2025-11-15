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

// Session management
export const setSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const getSession = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => {
  const { token } = getSession();
  return !!token;
};

export default api;

