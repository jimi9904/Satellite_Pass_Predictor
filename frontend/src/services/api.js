import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API error', error?.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
