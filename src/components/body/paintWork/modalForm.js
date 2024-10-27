import React, {useState} from 'react'
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';
import {
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Switch, Card, CardBody, Button,
    Input, Textarea 
} from "@nextui-org/react"
import {DatePicker} from "@nextui-org/date-picker";
/**
 * This component is used for uploading new artwork.
 * @param {*} props 
 * @returns 
 */
function ModalForm(props) {
    const {fields, isOpen, onOpenChange, onTipsOpenChange, setTipsMsg, setIsMainDataFetched} = props

    const [isTokenValid, setIsTokenValid] = useState(null)

    const [errorMsg, setErrorMsg] = useState('')

    const [image, setImage] = useState(null)

    const [isLoading, setIsLoading] = useState(false)

    const [paintWork, setPaintWork] = useState({
        title: '',
        description: '',
        year: null,
        price: '',
        dimensionWidth: '',
        dimensionHeight: '',
        status: true
    })

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // console.log(file)
          setImage(file);
        }
    }

    const handleInputChange = (e) => {
        if(e.calendar) {
            setPaintWork({ ...paintWork, year: e });
        } else {
            const { name, value } = e.target;
            if (name !== 'status') {
                setPaintWork({ ...paintWork, [name]: value });
            } else {
                setPaintWork({ ...paintWork, [name]: e.target.checked });
            }
        }
    }

    const submitHandler = (e) =>{
        
        const {title, price, year, dimensionWidth, dimensionHeight} = paintWork

        if(title.trim() === '') {
            setErrorMsg('Please input the title.')
            return
        }
        if(year === null) {
            setErrorMsg('Please provide the year when you created the art work.')
            return
        }
        if(dimensionWidth === '') {
            setErrorMsg('Please give a size in width.')
            return
        }
        // console.log('dimensionHeight = ', dimensionHeight)
        if(dimensionHeight === '') {
            setErrorMsg('Please give a size in height.')
            return
        }
        if(price === '') {
            setErrorMsg('Please give a price.')
            return
        }

        if(image === null) {
            setErrorMsg('You also need to choose a piece of your artwork.')
            return
        } else if(!image.type.startsWith('image')) {
            setErrorMsg('You can only upload image files.')
            return
        }else if(image.size >= 9999500){
            
            setErrorMsg('The maximum image size should be less than 10MB.')
            return
        }
        setIsLoading(true)

        const formData = new FormData();
        formData.append("imageFile", image);

        const paintStatus = paintWork.status ? 'active' : 'paused'
        const yearStr = new Date(paintWork.year).toLocaleDateString('en-GB')

        formData.append(
            "paintWork",
            new Blob([JSON.stringify({...paintWork, status: paintStatus, year: yearStr})], { type: "application/json" })
          );
        axiosInstance.post('/addPaintWork', formData, {
            headers: {
                "Content-Type": "multipart/form-data"
              },
        }).then((response) => {
            const statusCode = response.status
            if(statusCode === undefined && response.code === 'ERR_NETWORK') { // TODO: Consider this is due to exceeding the max upload size.
                setIsTokenValid(true)
            } else {
                if(statusCode === 201) {
                    setIsTokenValid(true)
                    const emptyForm = {
                        title: '',
                        description: '',
                        price: '',
                        status: true
                    }
                    setPaintWork(emptyForm)
                    setImage(null)
                    setIsLoading(false)
                    onOpenChange() // close this form.
                    onTipsOpenChange() // pop up tips window.
                    setTipsMsg('Congratulations, A New Work Was Successfully Added!')
                    setIsMainDataFetched(false) // refresh the main data.
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
                            {fields.year &&
                                <DatePicker 
                                    label="year"
                                    name="year"
                                    isRequired
                                    value = {paintWork.year}
                                    onChange={handleInputChange}
                                />
                            }

                            {fields.dimension &&
                                <div className='flex flex-row'>
                                    <Input 
                                        type="number"
                                        label="dimension - width"
                                        name="dimensionWidth"
                                        isRequired
                                        placeholder="Please give a size in width."
                                        value = {paintWork.dimensionWidth}
                                        onChange={handleInputChange}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">mm</span>
                                            </div>
                                        }
                                    />
                                    <Input 
                                        type="number"
                                        label="dimension - height"
                                        name="dimensionHeight"
                                        isRequired
                                        placeholder="Please give a size in height."
                                        value = {paintWork.dimensionHeight}
                                        onChange={handleInputChange}
                                        endContent={
                                            <div className="pointer-events-none flex items-center">
                                                <span className="text-default-400 text-small">mm</span>
                                            </div>
                                        }
                                    />
                                </div>
                            }
                            
                            {fields.price &&
                                <Input
                                    type="number"
                                    isRequired
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
                                    <p className="text-sm text-default-500">Selected: {paintWork.status ? "active" : "paused"}</p>
                                </div>
                            }
                            {/* Error tips */}
                            <div className='w-full h-10 text-left text-red-600'>{errorMsg}</div>
                        </ModalBody>
                        
                        <ModalFooter className="pt-20">
                            <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                            </Button>
                            <Button color="primary" isLoading={isLoading} onPress={submitHandler}>
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
