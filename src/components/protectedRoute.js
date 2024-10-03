import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from './axios/request'

const ProtectedRoute = ({element}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null)

    useEffect(() => {
        const cacheToken = localStorage.getItem('token')

        if(cacheToken === null) {
            setIsAuthenticated(false)
        } else {
            const token = atob(cacheToken)  // base64 decode token after getting from local storage.
            axiosInstance.post('/isTokenValid', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                const statusCode = response.status
                console.log(response)
                
                if(statusCode === 200) {
                    setIsAuthenticated(true)
                    console.log('protected route token response : ', response.data)
                } else if(statusCode === 401) { // Token is invalid.
                    setIsAuthenticated(false)
                    console.log('protected route token response : ', response.response.data)
                }
            })
            .catch((error) => {
                console.log('protected route token error : ', error)
            })
        }
    }, [])

    // return isAuthenticated ? element : <Login />

    if(isAuthenticated === null) {
        return <div className='text-3xl w-full mt-20 text-center'>I'm loading, be patient...</div>
    } else {
        return isAuthenticated ? element : <Navigate to="/login" />
    }
}

export default ProtectedRoute