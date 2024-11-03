import React, { useState, useEffect } from 'react'
import axiosInstance from '../../axios/request'
import DisplayAboutMe from './displayAboutMe'
import EditAboutMe from './editAboutMe'
import { Button } from '@nextui-org/react'
import { Navigate } from 'react-router-dom'

function AboutMe() {
    const [isRead, setIsRead] = useState(true)
    const [isTokenValid, setIsTokenValid] = useState(null)
    const [isDataReady, setIsDataReady] = useState(null)
    const [aboutMe, setAboutMe] = useState(null)

    useEffect(() => {
        if (aboutMe === null) {
            (async () => {
                const response = await axiosInstance.get('/fetchAboutMe')
                const statusCode = response.status
                // console.log(response)
                if (statusCode === 200) {
                    setAboutMe(response.data)
                    setIsDataReady(true)
                } else if (statusCode === 401) {
                    setIsTokenValid(false)
                } 
            })();
        }
    }, [aboutMe])

    useEffect(() => {
        if (isDataReady) {
            (async () => {
                const response = await axiosInstance.get(`/getProfilePhoto/${aboutMe.id}/image`, { responseType: "blob" })
                const statusCode = response.status
                if (statusCode === 200) {
                    const imageURL = URL.createObjectURL(response.data);
                    setAboutMe((prevAboutMe)=> ({...prevAboutMe, imageURL}))
                }
            })();
        }
    }, [isDataReady, aboutMe?.id])

    const toggleIsReadStatus = () => {
        setIsRead(!isRead)
    }

    /**
     * call this method in other components to enable reloading data.
     */
    const initDisplayDataStatus = () => {
        setAboutMe(null)
        setIsDataReady(false)
    }

    if (isTokenValid === false) {
        return <Navigate to='/login' />
    } else {
        return (
            isDataReady === true
                ?
                <div className='w-full flex flex-col'>

                    {isRead === true ? <DisplayAboutMe aboutMe={aboutMe} /> : <EditAboutMe aboutMe={aboutMe} initDisplayDataStatus={initDisplayDataStatus} toggleIsReadStatus={toggleIsReadStatus} />}
                    {
                        isRead === true
                            ?
                            <div className='w-2/3 h-10 mx-auto mt-4 flex justify-end'>
                                <Button color="primary" variant="flat" size='sm'
                                    onPress={toggleIsReadStatus}
                                >Edit</Button>
                            </div>
                            :
                            <></>
                    }
                </div>
                :
                <div>Fetching Data....</div>
        )
    }
}

export default AboutMe
