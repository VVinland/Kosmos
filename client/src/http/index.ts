import axios from 'axios';
import { API_URL } from '../utils/consts';
import { AuthResponse } from '../types';

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
})

api.interceptors.response.use(config => {
    return config;
}, async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/token/refreshToken`, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            return api.request(originalRequest);
        } catch (error) {
            console.error("Не авторизован");
        }
    }
    throw error;
})

export default api;
