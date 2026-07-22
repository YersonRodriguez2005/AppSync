import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://appsync.onrender.com/api';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error en la llamada a la API:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;