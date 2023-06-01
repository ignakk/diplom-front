import axios from "axios";
import Cookies from 'js-cookie';

export const API_URL = `https://back-silk.vercel.app/api`;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${Cookies.get('refreshToken')}`
    return config;
})

export default api;