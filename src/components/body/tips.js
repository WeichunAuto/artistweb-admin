import React, { useEffect } from 'react'
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/react";


function Tips(props) {
    const {isTipsOpen, onTipsOpenChange, tips} = props

    useEffect(() => {
        if(isTipsOpen === true) {
            setTimeout(()=> {
                onTipsOpenChange()
            }, 1500)
        }
    }, [isTipsOpen, onTipsOpenChange])
  
    return (
      <>
        <Modal isOpen={isTipsOpen} onOpenChange={onTipsOpenChange} size='lg' placement='top'>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Tips</ModalHeader>
              <ModalBody>
                <p className='w-full text-center'> 
                  {tips}
                </p>
              </ModalBody>

              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      </>
    );
}

export default Tips
