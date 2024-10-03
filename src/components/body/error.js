import React from 'react'
import { NavLink } from 'react-router-dom'

function Error() {
  return (
    <div>
        <div className='text-4xl w-screen text-center mt-20'>
        404 Not Found!
        </div>

        <div className='text-xl w-screen text-center mt-10'>
            <NavLink to='/' className='text-blue-500 underline'>
                Go to Home Page
            </NavLink>
        </div>
    </div>
  )
}

export default Error
