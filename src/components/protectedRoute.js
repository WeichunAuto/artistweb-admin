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
            // alert(token)
            axiosInstance.post('/isTokenValid', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then((response) => {
                const isTokenValid = response.data
                if(isTokenValid) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
                console.log('protected route token response : ', isTokenValid)
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
