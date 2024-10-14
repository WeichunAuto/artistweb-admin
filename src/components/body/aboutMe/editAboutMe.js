import React, { useState } from 'react'
import { Input, Textarea, Button } from "@nextui-org/react";
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';

function EditAboutMe(props) {
    const {toggleIsReadStatus} = props // go back to read mode.

    const [isTokenValid, setIsTokenValid] = useState(null)
    const [aboutMe, setAboutMe] = useState({
        name: '',
        description: ''
    })
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [ValidField, setValidField] = useState({
        isNameValid: false,
        isDescriptionValid: false,
        isImageValid: false
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAboutMe({ ...aboutMe, [name]: value });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const submitHandler = (e) => {
        if (varifyFields() === false) return
        setIsLoading(true)

        const formData = new FormData();
        formData.append("imageFile", image);

        formData.append(
            "aboutMe",
            new Blob([JSON.stringify({ ...aboutMe })], { type: "application/json" })
        );
        axiosInstance.post('/createAboutMe', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then((response) => {
            const statusCode = response.status
            // console.log('response state code：', statusCode)
            if (statusCode === undefined && response.code === 'ERR_NETWORK') { // TODO: Consider this is due to exceeding the max upload size.
                setIsTokenValid(true)
            } else {
                if (statusCode === 201) {
                    setIsTokenValid(true)
                    setAboutMe({name:'', description:''})
                    setImage(null)
                    setIsLoading(false)
                    toggleIsReadStatus()

                } else if (statusCode === 401) {
                    setIsTokenValid(false)
                } else if (statusCode === 403) {
                    setIsTokenValid(true)
                    setErrorMessage('Internal Server Error, Please Contact Admin.')
                } else if(statusCode === 500) {
                    setIsTokenValid(true)
                    setIsLoading(false)
                    setErrorMessage(response.response.data)
                }
            }
        }).catch((error) => {
            console.error("Error setting about me:", error);
        });
    }

    const varifyFields = () => {
        const { name, description } = aboutMe
        if (name.trim() === '') {
            setErrorMessage('Please input your name.')
            setValidField({ isNameValid: true, isDescriptionValid: false, isImageValid: false })
            return false
        }
        if (description.trim() === '') {
            setErrorMessage('Please input your statement.')
            setValidField({ isNameValid: false, isDescriptionValid: true, isImageValid: false })
            return false
        }
        if (image === null) {
            setErrorMessage('You also need to choose a profile photo to upload.')
            setValidField({ isNameValid: false, isDescriptionValid: false, isImageValid: true })
            return false
        } else if (!image.type.startsWith('image')) {
            setValidField({ isNameValid: false, isDescriptionValid: false, isImageValid: true })
            setErrorMessage('You can only upload image files.')
            return false
        } else if (image.size >= 9999500) {
            setValidField({ isNameValid: false, isDescriptionValid: false, isImageValid: true })
            setErrorMessage('The maximum image size should be less than 10MB.')
            return false
        }

        setValidField({ isNameValid: false, isDescriptionValid: false, isImageValid: false })
        setErrorMessage('')
        return true
    }

    if (isTokenValid === false) {
        return <Navigate to='/login' />
    } else {
        return (
            <div className='w-2/3 h-96 text-xl mx-auto mt-10'>
                <form className="flex flex-col items-center">
                    <div className='w-full flex flex-row justify-between items-start gap-4 border-1 p-4 rounded-lg'>
                        <div className='basis-1/2'>
                            <Input
                                type="text"
                                label="name"
                                name='name'
                                isRequired
                                placeholder='Please input you full name.'
                                value={aboutMe.name}
                                onChange={handleInputChange}
                                isInvalid={ValidField.isNameValid}
                                errorMessage={errorMessage}
                            />
                        </div>

                        <div className='basis-1/2 h-full'>
                            <label className="block">
                                <p className='text-sm text-gray-500'>Choose your profile photo.</p>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-slate-500
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-violet-50 file:text-blue-700
                                            hover:file:bg-violet-100"
                                    onChange={handleImageChange}
                                />
                                <p className='text-xs m-1 text-[#F31260]'>{ValidField.isImageValid && errorMessage}</p>
                            </label>
                        </div>
                    </div>

                    <div className='w-full border-1 p-4 rounded-lg mt-4'>
                        <Textarea
                            label="description"
                            name="description"
                            isRequired
                            placeholder="Please Input your statement."
                            value={aboutMe.description}
                            onChange={handleInputChange}
                            isInvalid={ValidField.isDescriptionValid}
                            errorMessage={errorMessage}
                        />
                    </div>
                    <div className='flex flex-col gap-4 w-full'>
                        <p className='w-full text-right p-2 text-sm text-[#F31260]'>{errorMessage}</p>
                        <div className='flex flex-row gap-4 justify-end w-full p-4'>
                            <Button onPress={toggleIsReadStatus}>Cancel</Button>
                            <Button
                                color='primary'
                                isLoading={isLoading} onPress={submitHandler}
                            >
                                Confirm
                            </Button>
                        </div>
                    </div>
                    
                </form>
            </div>
        )
    }
}

export default EditAboutMe
