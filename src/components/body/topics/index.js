import React, { useState, useEffect } from 'react'
import { PlusIcon } from '../../../icons/icons'
import { Button, User, useDisclosure, Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react'
import AddTopics from './addTopics';
import axiosInstance from '../../axios/request';


function Topics() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [topicList, setTopicList] = useState([])
    const [topicDtoList, setTopicDtoList] = useState([])

    useEffect(() => {
        axiosInstance.get("/fetchTopics")
            .then((response) => {
                const statusCode = response.status
                console.log(response)
                if (statusCode === 200) {
                    setTopicDtoList(response.data)
                }
            })
    }, [])
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

    if (topicList.length > 0) {
        console.log(topicList)
    }

    return (
        <div className='w-full m-4 flex flex-col'>
            <div className='w-full flex justify-end' >
                <Button color="primary" endContent={<PlusIcon />} onPress={onOpen}>
                    Add Topic
                </Button>
            </div>
            <div>
                <Table aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>TITLE</TableColumn>
                        <TableColumn>DESCRIPTION</TableColumn>
                        <TableColumn>ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {
                            topicList.map((topic, index) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell>{topic.id}</TableCell>
                                        <TableCell>
                                            <User
                                                avatarProps={{ radius: "lg", src: topic.imageURL }}
                                                description={topic.title}
                                                name={topic.id + "_" + topic.title}
                                            >
                                                {topic.title}
                                            </User>
                                        </TableCell>
                                        <TableCell>{topic.description}</TableCell>
                                        <TableCell>
                                            Delete
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </div>

            <div className='w-full'>
                <AddTopics isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
        </div>
    )
}

export default Topics
