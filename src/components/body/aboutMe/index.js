import React, {useState} from 'react'
import ReadAboutMe from './readAboutMe'
import EditAboutMe from './editAboutMe'
import { Button } from '@nextui-org/react'

function AboutMe() {
    const [isRead, setIsRead] = useState(true)

    const toggleIsReadStatus = () => {
        setIsRead(!isRead)
    }
  return (
    <div className='w-full flex flex-col'>
        
        {isRead === true ? <ReadAboutMe/> : <EditAboutMe toggleIsReadStatus={toggleIsReadStatus}/>}

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
  )
} 

export default AboutMe
