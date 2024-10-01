import React, { Component } from 'react'
import {Listbox, ListboxItem} from "@nextui-org/react";
import {IconWrapper} from "../../icons/iconWrapper";
import { ItemCounter } from "./itemCounter";
import {BookIcon, FaceIcon, WallIcon} from '../../icons/icons'
import { NavLink, Outlet } from 'react-router-dom'

export class Body extends Component {
    state = {
        jwtToken: null
    }

    componentDidMount() {
        // localStorage.clear('token')
        const cacheToken = localStorage.getItem('token')
        if (cacheToken) {
            const token = atob(cacheToken)  // base64 decode token after getting from local storage.
            console.log('in body: ' + token)
            this.setState({
                jwtToken: token
            })

            // request data here.

        } else {
            this.props.setJwtToken(null) // return to the login page.
        }
    }

    handleRequestWithToken = async (token) => {
        alert(2)
        console.log('here is the token:')
        console.log(token)
    }

    render() {

        return (
            // <div className='flex flex-col h-screen'>
            //     <div class='w-screen h-12 flex flex-row bg-blue-100'>
            //         <p className='basis-1/2 h-full text-left pl-4 content-center'>Hi, admin</p>
            //         <p className='basis-1/2 h-full text-right pr-4 font-medium content-center'>Artist Content Management System.</p>
            //     </div>
            
                <div className='flex gap-2 h-screen'>
                    <div className='flex flex-col min-w-[250px] max-w-[300px] '>
                        <Listbox
                            aria-label="User Menu"
                            // onAction={(key) => alert(key)}
                            className="basis-11/12 p-0 gap-0 divide-y divide-default-300/50 dark:divide-default-100/80 bg-content1 overflow-visible shadow-small"
                            itemClasses={{
                                base: "px-3 first:rounded-t-medium last:rounded-b-medium rounded-none gap-3 h-12 data-[hover=true]:bg-default-100/80",
                            }}
                            >
                            <ListboxItem
                                key="issues"
                                endContent={<ItemCounter number={13} />}
                                startContent={
                                <IconWrapper className="bg-success/10 text-success">
                                    <BookIcon className="text-lg " />
                                </IconWrapper>
                                }
                            >
                                <NavLink to='/paintWork'>
                                    <p className='h-full w-full'>Painting Work</p>
                                </NavLink>
                                
                            </ListboxItem>

                            <ListboxItem 
                                key="pull_requests" 
                                endContent={<ItemCounter number={6} />}
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <FaceIcon className="text-lg " />
                                    </IconWrapper>
                                    } >
                                <NavLink to='/faceArt'>
                                    <p className='h-full w-full'>Face Art</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                key="discussions"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <WallIcon className="text-lg " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/wallArt'>
                                    <p className='h-full w-full'>Wall Art</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem key="actions">
                                Actions
                            </ListboxItem>

                            <ListboxItem key="projects">
                                Projects
                            </ListboxItem>
                            
                        </Listbox>
                        <div className='basis-1/12 text-xs text-center pb-2 content-end text-gray-500'>Artist Content Management System.</div>
                    </div>
                    {console.log('check token : ' + this.state.jwtToken)}
                    <Outlet context={{ jwtToken: this.state.jwtToken, setJwtToken: this.props.setJwtToken }} className='bg-gray-200'></Outlet>
                    
                </div>
        )
    }
}

export default Body
