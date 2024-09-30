import React from 'react'
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
    const {fields, isOpen, onOpenChange} = props

    const [isSelected, setIsSelected] = React.useState(true);
    const [imageName, setImageName] = React.useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageName(file.name);
        }
      };

    return (
        <Modal
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
                            placeholder="Give a title for your painting"
                            // variant="bordered"
                        />
                    }
                    {fields.description &&
                            <Textarea
                            label="description"
                            placeholder="You can say something about your work."
                            className=""
                        />
                    }
                    {fields.price &&
                        <Input
                            type="number"
                            label="price"
                            placeholder="0.00"
                            className="basis-1/2"
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
                                <p className="col-span-2">
                                    {imageName && <p className="text-gray-700">{imageName}</p>}
                                </p>

                                <input
                                    type="file"
                                    id="file-upload"
                                    style={{ display: "none" }}
                                    onChange={handleFileChange}
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
                            <Switch size='sm' isSelected={isSelected} onValueChange={setIsSelected}>
                                Active
                            </Switch>
                            <p className="text-sm text-default-500">Selected: {isSelected ? "true" : "false"}</p>
                        </div>
                    }
                </ModalBody>
                
                <ModalFooter className="pt-20">
                    <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                    </Button>
                    <Button color="primary" onPress={onClose}>
                    Confirm
                    </Button>
                </ModalFooter>
                </>
            )}
            </ModalContent>
        </Modal>
    )
}

export default ModalForm
