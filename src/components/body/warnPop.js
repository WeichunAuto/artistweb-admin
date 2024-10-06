import React, {useState} from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import axiosInstance from '../axios/request';


function WarnPop(props) {
    const {isWarnOpen, onWarnOpenChange, dropItem, setIsMainDataFetched} = props

    const [isLoading, setIsLoading] = useState(false)

    const confirmDelete = () => {
        setIsLoading(true)
        axiosInstance.delete(`/deleteAPaintWork/${dropItem.id}`)
            .then((response) => {
                const statusCode = response.status
                if(statusCode === 404) {
                
                } else if(statusCode === 200) {
                setIsLoading(false)
                onWarnOpenChange()
                setIsMainDataFetched(false) // refresh the main data.
                }
            })
    }
  
    return (
      <>
        <Modal isOpen={isWarnOpen} onOpenChange={onWarnOpenChange} size='lg' placement='top'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Warning</ModalHeader>
                <ModalBody>
                    <p className='w-full text-center'> 
                    You are going to delete your paint work: {dropItem.title}.
                    </p>
                    <p className='w-full text-center'>Are you sure you want to proceed it?</p>
                </ModalBody>

              <ModalFooter>
                <Button size='sm'color="primary" onPress={onClose}>
                    Close
                </Button>
                <Button isLoading={isLoading} size='sm' color="danger" onPress={confirmDelete}>
                    Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </>
    );
}

export default WarnPop
