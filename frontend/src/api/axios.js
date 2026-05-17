import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true, // For cookies
});

// Add a request interceptor to include the bearer token if it exists in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized errors (e.g. expired token)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('accessToken');
      // Optional: window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
