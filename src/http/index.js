import axios from "axios";
import Cookie from 'js-cookie';

export const API_URL = `https://back-silk.vercel.app/api`;

const api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

api.interceptors.request.use((config) => {
    console.log(Cookie.get('refreshToken'));
    config.headers.Authorization = `Bearer ${Cookie.get('refreshToken')}`
    return config;
})

export default api;