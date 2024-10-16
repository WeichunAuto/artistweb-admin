import React, { useState, useEffect } from 'react'
import { PlusIcon } from '../../../icons/icons'
import { Button, User, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import AddTopics from './addTopics';
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';


function Topics() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [isTokenValid, setIsTokenValid] = useState(null)
    const [topicList, setTopicList] = useState([])
    const [topicDtoList, setTopicDtoList] = useState([])
    const [isRefresh, setIsRefresh] = useState(true)

    useEffect(() => {
        if (isRefresh) {
            axiosInstance.get("/fetchTopics")
                .then((response) => {
                    setIsRefresh(false)
                    const statusCode = response.status
                    // console.log(response)
                    if (statusCode === 200) {
                        setTopicDtoList(response.data)
                    }
                })
        }
    }, [isRefresh])
    useEffect(() => {
        if (topicDtoList.length > 0) {
            (async () => {
                const updatedMainData = await Promise.all(
                    topicDtoList.map(async (aTopic) => {
                        try {
                            const response = await axiosInstance.get(`/getATopic/${aTopic.id}/image`, { responseType: "blob" })

                            const imageURL = URL.createObjectURL(response.data);
                            return { ...aTopic, imageURL }
                        } catch (error) {
                            console.error(
                                "Error fetching image for aPaintWork ID:",
                                aTopic.id,
                                error
                            );
                            return { ...aTopic, imageURL: "" };
                        }
                    })
                )
                setTopicList(updatedMainData)
            })()
        }

    }, [topicDtoList])

    const deleteTopic = (id) => {
        // console.log('the id is going to be deleted: ' + id)
        axiosInstance.delete(`/deleteTopic/${id}`)
            .then((response) => {
                const statusCode = response.status
                if (statusCode === 200) {
                    console.log('successfully....')
                    setIsRefresh(true)
                } else if (statusCode === 401) {
                    setIsTokenValid(false)
                }
            })
    }
    if (isTokenValid === false) {
        return <Navigate to='/login' />
    } else {
        return (
            <div className='w-full m-4 flex flex-col'>
                <div className='w-full flex justify-end' >
                    <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
                        Add Topic
                    </Button>
                </div>
                <div className='pt-4'>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            <TableColumn>ID</TableColumn>
                            <TableColumn>
                                TITLE
                            </TableColumn>
                            <TableColumn>
                                DESCRIPTION
                            </TableColumn>
                            <TableColumn>ACTIONS</TableColumn>
                        </TableHeader>
                        <TableBody emptyContent={"No topics to display."}>
                            {
                                topicList.map((topic, index) => {
                                    return (
                                        <TableRow key={index}>
                                            <TableCell>{topic.id}</TableCell>

                                            <TableCell>
                                                <User
                                                    avatarProps={{ radius: "lg", src: topic.imageURL }}
                                                    description={topic.title}
                                                    name={topic.title}
                                                >
                                                    {topic.title}
                                                </User>
                                            </TableCell>

                                            <TableCell>
                                            <p className='max-w-[800px]'>
                                                {topic.description}
                                            </p>
                                            </TableCell>

                                            <TableCell>
                                                <Button color='primary' variant='light' onPress={() => deleteTopic(topic.id)}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </div>

                <div className='w-full'>
                    <AddTopics isOpen={isOpen} onOpenChange={onOpenChange} setIsRefresh={setIsRefresh}/>
                </div>
            </div>
        )
    }
}

export default Topics
