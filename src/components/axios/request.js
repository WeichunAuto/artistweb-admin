import axios from 'axios'
import { ApiCon } from "../config";


const axiosInstance = axios.create({
    baseURL: ApiCon.BASE_URL,
    timeout: ApiCon.TIMEOUT
})

// interceptor API requests to process token
axiosInstance.interceptors.request.use((config) => {

    if (config.url !== '/login') {}
    return config
}, error => {
    return error
})

// interceptor API response
axiosInstance.interceptors.response.use((response) => {
    return response
}, error => {
    return error
})

export default axiosInstance