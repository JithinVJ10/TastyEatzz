import axios from 'axios';
import { toast } from 'react-toastify';

const createAxiosInstance = (baseURL, tokenKey) => {
  const instance = axios.create({
    baseURL,
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem(tokenKey);

    if (token) {
      try {
        config.headers.authorization = `Bearer ${JSON.parse(token)}`;
      } catch (error) {
        console.error('Error while parsing token: ', error);
      }
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.error || 'An error occurred';
        toast.error(errorMessage, {
          duration: 2000,
          style: { color: '#fff', background: 'black' },
        });
      } else {
        console.error('Axios error:', error);
        toast.error('An unexpected error occurred', {
          duration: 2000,
          style: { color: '#fff', background: 'black' },
        });
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export const axiosInstance = createAxiosInstance('http://localhost:5000', 'token');
export const adminAxiosInstance = createAxiosInstance('http://localhost:5000/admin', 'adminToken');
