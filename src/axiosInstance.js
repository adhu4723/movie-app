import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL:  'http://localhost:5000/api', // Adjust your backend URL
  headers: {
    'Content-Type': 'multipart/form-data', // Default to multipart for file uploads
  },
});

// Request interceptor to add token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage or context
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
