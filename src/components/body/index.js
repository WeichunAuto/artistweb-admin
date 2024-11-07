import React, { Component } from 'react'
import {Listbox, ListboxItem} from "@nextui-org/react";
import {IconWrapper} from "../../icons/iconWrapper";
import {BookIcon, FaceIcon, WallIcon, AboutMeIcon, TopicsIcon, MessageIcon, SettingIcon} from '../../icons/icons'
import { NavLink, Outlet } from 'react-router-dom'

export class Body extends Component {

    render() {
        return (
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
                                key="Painting_Work"
                                // endContent={<ItemCounter number={13} />}
                                startContent={
                                <IconWrapper className="bg-success/10 text-success">
                                    <BookIcon className="text-lg " />
                                </IconWrapper>
                                }
                            >
                                <NavLink to='/body/paintWork'>
                                    <p className='h-full w-full'>Painting Work</p>
                                </NavLink>
                                
                            </ListboxItem>

                            <ListboxItem 
                                isDisabled={true}
                                key="Face_Art" 
                                // endContent={<ItemCounter number={6} />}
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <FaceIcon className="text-lg " />
                                    </IconWrapper>
                                    } >
                                <NavLink to='/body/faceArt'>
                                    <p className='h-full w-full'>Face Art</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                isDisabled={true}
                                key="Wall_Art"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <WallIcon className="text-lg " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/body/wallArt'>
                                    <p className='h-full w-full'>Wall Art</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                key="About_Me"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <AboutMeIcon className="text-lg " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/body/aboutMe'>
                                    <p className='h-full w-full'>About Me</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                key="Topics"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <TopicsIcon className="text-base " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/body/topics'>
                                    <p className='h-full w-full'>Topics</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                key="Contact_Me"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <MessageIcon className="text-base " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/body/contactMe'>
                                    <p className='h-full w-full'>Customer Messages</p>
                                </NavLink>
                            </ListboxItem>

                            <ListboxItem 
                                key="Setting"
                                startContent={
                                    <IconWrapper className="bg-success/10 text-success">
                                        <SettingIcon className="text-base " />
                                    </IconWrapper>
                                    } 
                                >
                                <NavLink to='/body/settings'>
                                    <p className='h-full w-full'>Settings</p>
                                </NavLink>
                            </ListboxItem>
                            
                        </Listbox>
                        <div className='basis-1/12 text-xs text-center pb-2 content-end text-gray-500'>Artist Content Management System.</div>
                    </div>
                    <Outlet className='bg-gray-200'></Outlet>
                </div>
        )
    }
}

export default Body
