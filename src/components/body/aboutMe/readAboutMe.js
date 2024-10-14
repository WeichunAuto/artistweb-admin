import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axiosInstance from '../../axios/request'

function ReadAboutMe() {
    const [isTokenValid, setIsTokenValid] = useState(null)
    const [isDataReady, setIsDataReady] = useState(false)
    const [aboutMe, setAboutMe] = useState(null)

    useEffect(() => {
        if (aboutMe === null) {
            (async () => {
                const response = await axiosInstance.get('/fetchAboutMe')
                const statusCode = response.status
                if (statusCode === 200) {
                    setAboutMe(response.data)
                    setIsDataReady(true)
                } else if (statusCode === 401) {
                    setIsTokenValid(false)
                }
            })();
        }
    }, [])

    useEffect(() => {
        if (aboutMe !== null) {
            (async () => {
                const response = await axiosInstance.get(`/getProfilePhoto/${aboutMe.id}/image`, { responseType: "blob" })
                const statusCode = response.status
                if (statusCode === 200) {
                    const imageURL = URL.createObjectURL(response.data);
                    setAboutMe({ ...aboutMe, imageURL })
                }
            })();
        }
    }, [isDataReady])

    if (isTokenValid === false) {
        return <Navigate to='/login' />
    } else {
        return (
            isDataReady === true
                ?
                <div className='w-2/3 h-auto text-xl mx-auto flex flex-col gap-8 border-1 rounded-lg p-4 mt-10'>
                    <div className='w-full flex flex-row gap-4'>
                        <img src={aboutMe.imageURL} className='size-32 rounded-full' />
                        <div className='content-center'>{aboutMe.name}</div>
                    </div>
                    <div className='w-full min-h-60 bg-gray-50 text-base p-2'>
                        <p>{aboutMe.description}</p>
                    </div>
                </div>
                :
                <div>null</div>
        )
    }
}

export default ReadAboutMe
