import React from 'react'
import {PlusIcon} from '../../../icons/icons'
import { Button, useDisclosure } from '@nextui-org/react'
import AddTopics from './addTopics';
 
function Topics() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    return (
        <div className='w-full m-4 flex flex-col'>
            <div className='w-full flex justify-end' >
                <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
                    Add Topic
                </Button>
            </div>
            <div>

            </div>

            <div className='w-full'>
                <AddTopics isOpen={isOpen} onOpenChange={onOpenChange}/>
            </div>
        </div>
    )
}

export default Topics
