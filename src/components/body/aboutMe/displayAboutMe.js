import React from 'react'
import DefaultProfile from '../../../icons/defaultProfile.png'

function DisplayAboutMe(props) {
    const {aboutMe}  = props
    
    return (
        aboutMe !== null
            ?
            <div className='w-2/3 h-auto text-xl mx-auto flex flex-col gap-8 border-1 rounded-lg p-4 mt-10'>
                <div className='w-full flex flex-row gap-4'>
                    <img src={aboutMe.imageURL || DefaultProfile} className='size-32 rounded-full' />
                    <div className='content-center'>{aboutMe.name}</div>
                </div>
                <div className='w-full min-h-60 bg-gray-50 text-base p-2'>
                    <p>{aboutMe.description}</p>
                </div>
            </div>
            :
            <></>
    )
}

export default DisplayAboutMe
