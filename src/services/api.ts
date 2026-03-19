import axios from 'axios';

// Create Axios Instance
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api', // Can override with env later when admin panel is ready
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptors (e.g., attaching auth token for secure routes)
apiClient.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
