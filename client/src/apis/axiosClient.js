import axios from 'axios';
import { URL } from './constant';

const publicAxiosClient = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


const privateAxiosClient = axios.create({
    baseURL: URL,
    headers: {
        'Content-Type': 'application/json',
    },
});


privateAxiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export { publicAxiosClient, privateAxiosClient };
