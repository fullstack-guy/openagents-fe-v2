import axios from 'axios';
import {BACKEND_URL} from "src/configs";

const axiosServices = axios.create({
    baseURL: BACKEND_URL,
    withCredentials: true,
});

export default axiosServices;

