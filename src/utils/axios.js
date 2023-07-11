import axios from 'axios';
import {BACKEND_URL} from "../configs";


const axiosServices = axios.create({
    baseURL: BACKEND_URL
});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject((error.response && error.response.data) || 'Wrong Services')
);

export default axiosServices;