import axios from 'axios';
import { useContext } from 'react';
import { isExpired } from 'react-jwt';
import { UserContext } from './UserContext';

const api = axios.create({
    baseURL: 'http://localhost:3000/api/v1'
});

// Agregar un interceptor de solicitud
api.interceptors.request.use(config => {
    const userFromLocalStorage = localStorage.getItem('user');
    if (userFromLocalStorage) {
        const { token } = JSON.parse(userFromLocalStorage);
        if (token) {
            config.headers.Authorization = `${token}`;
        }
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Agregar un interceptor de respuesta
api.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401) {
        const userFromLocalStorage = localStorage.getItem('user');
        if (userFromLocalStorage) {
            const { token } = JSON.parse(userFromLocalStorage);
            if (isExpired(token)) {
                const ContxValues = useContext(UserContext);
                ContxValues?.logout();
            }
        }
    }
    return Promise.reject(error);
});

export default api;
