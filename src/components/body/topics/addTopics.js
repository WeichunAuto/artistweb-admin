import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';

export default function AddTopics(props) {
    const { isOpen, onOpenChange } = props;

    const [isTokenValid, setIsTokenValid] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [topic, setTopic] = useState({ title: '', description: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const [ValidField, setValidField] = useState({
        isNameValid: false,
        isDescriptionValid: false,
        isImageValid: false
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setTopic({ ...topic, [name]: value });
    }

    const submitHandler = (e) => {
        if (varifyFields() === false) return
        setIsLoading(true)

        const formData = new FormData();
        formData.append("imageFile", image);

        formData.append(
            "topic",
            new Blob([JSON.stringify({ ...topic })], { type: "application/json" })
        );
        axiosInstance.post('/addTopic', formData, {
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
                    setTopic({ title: '', description: '' })
                    setImage(null)
                    setIsLoading(false)
                    onOpenChange()
                    // initDisplayDataStatus()

                } else if (statusCode === 401) { // token is invalid.
                    setIsTokenValid(false)
                } else if (statusCode === 403) {
                    setIsTokenValid(true)
                    setErrorMessage('Internal Server Error, Please Contact Admin.')
                } else if (statusCode === 500) {
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
        // console.log(image.type)
        const { title, description } = topic
        if (title.trim() === '') {
            setErrorMessage('Please input your title.')
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
            <>
                <Modal
                    size='xl'
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader>Add A Topic</ModalHeader>
                                <ModalBody>
                                    <div className='w-5/6 mx-auto flex flex-col gap-4 justify-center'>
                                        <label className="block w-full h-36 border-1 border-dashed rounded-lg p-4">
                                            <p className='text-sm text-gray-500 pb-8 w-full text-center'>Choose your topic photo. <span className='text-small text-red-500'>*</span></p>
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

                                        <Input type="text" isRequired label="Title" placeholder="Enter your title"
                                            name='title'
                                            value={topic.title}
                                            onChange={handleInputChange}
                                            isInvalid={ValidField.isNameValid}
                                            errorMessage={errorMessage}
                                        />

                                        <Textarea
                                            label="Description"
                                            placeholder="Enter your description"
                                            isRequired
                                            name='description'
                                            value={topic.description}
                                            onChange={handleInputChange}
                                            isInvalid={ValidField.isDescriptionValid}
                                            errorMessage={errorMessage}
                                        />
                                    </div>
                                    <p className='w-full text-right p-2 text-sm text-[#F31260]'>{errorMessage}</p>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Close
                                    </Button>
                                    <Button color="primary" isLoading={isLoading} onPress={submitHandler}>
                                        Submit
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        );
    }
}
