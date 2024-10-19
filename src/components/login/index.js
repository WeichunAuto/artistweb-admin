import React, {useReducer, useState} from 'react'
import SHA256 from 'crypto-js/sha256';
import JwtToken from '../token/token'
import { Navigate } from 'react-router-dom';

export default function Login(props) {

    const initState = {
        appName: '',
        appKey: ''
    }
    const [errorMsg, setErrorMsg] = useState('')
    const [isRedirect, setIsRedirect] = useState(false)
    const [state, dispatch] = useReducer(hashOrSubmitHandler, initState)

    function changeForm(e) {
        const {name, value} = e.target
        dispatch({type: name, value})
    }

    async function submitForm(e) {
        e.preventDefault()
        const {appName, appKey} = state
        const hashedAppKey= SHA256(appKey).toString()
        
        const {isSuccess, token, msg} = await JwtToken.getToken({appName: appName, appKey: hashedAppKey})
        if(isSuccess === true) {
          const base64Token = btoa(token)
          localStorage.setItem('token', base64Token) // Save token with Base64 encode.
          setIsRedirect(true)
        } else {
          setErrorMsg(msg)
        }
    }

    function hashOrSubmitHandler(state, action) {
        switch(action.type) {
            case 'appName': {
                return {...state, appName: action.value}
            }
            case 'appKey': {
                return {...state, appKey: action.value}
            }
            default:
                return state
        }
    }

    if (isRedirect) {
      // alert(isRedirect)
      return <Navigate to="/" />; // Navigate after successful login
    }

    return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
           
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-wide text-gray-900">
              {String.fromCodePoint(0x1F44B)} , Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action='#' method="POST" className="space-y-6">
              <div>
                <label htmlFor="appName" className="block text-sm font-medium leading-6 text-gray-900">
                  Account Name
                </label>
                <div className="mt-2">
                  <input
                    id="appName"
                    name="appName"
                    type="text"
                    required
                    defaultValue={initState.appName}
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={changeForm }
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="appKey" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="appKey"
                    name="appKey"
                    type="password"
                    defaultValue={initState.appKey}
                    required
                    autoComplete="current-password"
                    className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={changeForm }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <label htmlFor="appKey" className="block text-sm font-medium leading-6 text-red-600">
                    {errorMsg}
                  </label>
                </div>
              </div>
  
              <div>
                <button
                  type="button"
                  name='submit'
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={submitForm}
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a remember?{'   '}
                Contact the Admin
            </p>
          </div>
        </div>
      </>
    )
  }
  