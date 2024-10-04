import axios from 'axios'
import { ApiCon } from "../config";


const axiosInstance = axios.create({
    baseURL: ApiCon.BASE_URL,
    timeout: ApiCon.TIMEOUT
})

// interceptor API requests to process token
axiosInstance.interceptors.request.use((config) => {

    if (config.url !== '/login') {
        const cacheToken = localStorage.getItem('token')
        if(cacheToken !== null) {
        const decodedToken = atob(cacheToken)  // base64 decode token after getting from local storage.

        config.headers.Authorization = 'Bearer ' + decodedToken
        }
    }
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