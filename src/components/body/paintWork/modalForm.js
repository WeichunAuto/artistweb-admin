import React, {useState} from 'react'
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch, Card, CardBody, Button,
    Input, Textarea
} from "@nextui-org/react"

/**
 * This component is used for uploading new artwork.
 * @param {*} props 
 * @returns 
 */
function ModalForm(props) {
    const {fields, isOpen, onOpenChange, token} = props

    const [isTokenValid, setIsTokenValid] = useState(null)

    const [image, setImage] = useState(null)

    const [paintWork, setPaintWork] = useState({
        title: '',
        description: '',
        price: '',
        status: true
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            console.log(file)
          setImage(file);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name !== 'status') {
            setPaintWork({ ...paintWork, [name]: value });
        } else {
            setPaintWork({ ...paintWork, [name]: e.target.checked });
        }
    }

    const submitHandler = (e) =>{
        console.log(paintWork)
        const formData = new FormData();
        formData.append("imageFile", image);
        formData.append(
            "paintWork",
            new Blob([JSON.stringify(paintWork)], { type: "application/json" })
          );
        axiosInstance.post('/addPaintWork', formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + token
              },
        }).then((response) => {

            console.log(response)
            const statusCode = response.status
            console.log('response 状态码：', statusCode)
            if(statusCode === undefined && response.code === 'ERR_NETWORK') { // TODO: Consider this is due to exceeding the max upload size.
                setIsTokenValid(true)
            } else {
                if(statusCode === 200) {
                    setIsTokenValid(true)
                } else if(statusCode === 401) {
                    setIsTokenValid(false)
                }
            }
            
        }).catch((error) => {
            console.error("Error adding product:", error);
          });
    }
    if(isTokenValid === false) {
        return <Navigate to='/login'/>
    } else {
        return  <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
                    isDismissable={false}
                    size='2xl'
                >
                    <ModalContent className="px-2">
                    {(onClose) => (
                        <>
                        <ModalHeader className="flex flex-col gap-1">Add a New Painting Work</ModalHeader>
                        <ModalBody>
                            {fields.title &&
                                <Input
                                    isRequired
                                    autoFocus
                                    label="title"
                                    name="title"
                                    placeholder="Give a title for your painting"
                                    value = {paintWork.title}
                                    onChange={handleInputChange}
                                    // variant="bordered"
                                />
                            }
                            {fields.description &&
                                <Textarea
                                    label="description"
                                    name="description"
                                    placeholder="You can say something about your work."
                                    value = {paintWork.description}
                                    onChange={handleInputChange}
                                />
                            }
                            {fields.price &&
                                <Input
                                    type="number"
                                    label="price"
                                    name="price"
                                    placeholder="0.00"
                                    className="basis-1/2"
                                    value = {paintWork.price}
                                    onChange={handleInputChange}
                                    startContent={
                                        <div className="pointer-events-none flex items-center">
                                            <span className="text-default-400 text-small">$</span>
                                        </div>
                                    }
                                />
                            }
                            {fields.img &&
                                <Card shadow='sm'>
                                    <CardBody className='w-full flex flex-col'>
                                        <p className="w-full text-xs text-gray-500">upload an image</p>
                                        <div className="w-full flex flex-row justify-between items-center">
                                        <div className="col-span-2">
                                            {image && <div className="text-gray-700">{image.name}</div>}
                                        </div>

                                        <input
                                            type="file"
                                            id="file-upload"
                                            style={{ display: "none" }}
                                            onChange={handleImageChange}
                                        />
                                        <label htmlFor="file-upload">
                                            <Button as="span" color="primary" auto size="sm">
                                                Choose Image
                                            </Button>
                                        </label>
                                        </div>
                                    </CardBody>
                                </Card>
                            }
                            {fields.active &&
                                <div className="grid gap-0  justify-items-end">
                                    <Switch size='sm' name='status' value={paintWork.status} isSelected={paintWork.status} onChange={handleInputChange}>
                                        Active
                                    </Switch>
                                    <p className="text-sm text-default-500">Selected: {paintWork.status ? "true" : "false"}</p>
                                </div>
                            }
                        </ModalBody>
                        
                        <ModalFooter className="pt-20">
                            <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" onPress={submitHandler}>
                            Confirm
                            </Button>
                        </ModalFooter>
                        </>
                    )}
                    </ModalContent>
                </Modal>
    }
}

export default ModalForm
