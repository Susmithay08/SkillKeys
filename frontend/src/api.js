import axios from 'axios';

const API_BASE_URL = 'https://skillkeys.onrender.com';


const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

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

export const register = (userData) => api.post('/auth/register', userData);
export const login = (credentials) => api.post('/auth/login', credentials);
export const createTypingSession = (sessionData) => api.post('/typing/sessions', sessionData);
export const getTypingSessions = () => api.get('/typing/sessions');
export const getTypingStats = () => api.get('/typing/stats');

export default api;