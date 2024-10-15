import React, { useState } from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Textarea } from "@nextui-org/react";

export default function AddTopics(props) {
    const { isOpen, onOpenChange } = props;

    const [image, setImage] = useState(null)
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

                                    <Input type="text" isRequired label="Title" placeholder="Enter your title" />

                                    <Textarea
                                        label="Description"
                                        placeholder="Enter your description"
                                        isRequired
                                    />
                                </div>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" onPress={onClose}>
                                    Action
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
