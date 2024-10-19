import React, { useState, useEffect } from 'react'
import { Table, TableHeader, TableBody, TableColumn, TableRow, TableCell, Pagination } from "@nextui-org/react";
import axiosInstance from '../../axios/request';
import { Navigate } from 'react-router-dom';

function Contact() {
    const [isTokenValid, setIsTokenValid] = useState(null)
    const [messages, setMessages] = useState([])
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        if (messages.length === 0) {
            axiosInstance.get("/fetchMessages")
                .then((response) => {
                    const statusCode = response.status
                    if (statusCode === 200) {
                        const receivedMessages = response.data
                        const totalPages = Math.ceil(receivedMessages.length / rowsPerPage);
                        setMessages(receivedMessages)
                        setTotalPages(totalPages)
                        // console.log(response.data)
                    } else if(statusCode === 401) {
                        setIsTokenValid(false)
                    }
                })
        }
    }, [messages])

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return messages.slice(start, end);
    }, [page, messages]);

    if (isTokenValid === false) {
        return <Navigate to='/login' />
    } else {
        return (
            <div className='w-full h-auto p-4'>
                <Table aria-label="the table for messages"
                    isStriped
                    bottomContent={
                        <div className="flex w-full justify-center">
                            <Pagination
                                isCompact
                                showControls
                                showShadow
                                color="secondary"
                                page={page}
                                total={totalPages}
                                onChange={(page) => setPage(page)}
                            />
                        </div>
                    }
                    classNames={{
                        wrapper: "min-h-[222px]",
                    }}
                >
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>FULL NAME</TableColumn>
                        <TableColumn>EMAIL</TableColumn>
                        <TableColumn>PHONE NUMBER</TableColumn>
                        <TableColumn>MESSAGE</TableColumn>
                        <TableColumn>SEND DATE</TableColumn>
                        <TableColumn>ISSUBSCRIBED</TableColumn>
                    </TableHeader>
                    <TableBody items={items}
                        emptyContent={"No messages to display."}
                    >
                        {
                            (item) => {
                                console.log(item)
                                return (
                                    <TableRow key={item.id}>
                                        <TableCell>{item.id}</TableCell>
                                        <TableCell>{item.firstName + ' ' + item.lastName}</TableCell>
                                        <TableCell>{item.email}</TableCell>
                                        <TableCell>{item.phoneNumber}</TableCell>
                                        <TableCell>
                                            <p className='max-w-[350px]'>
                                                {item.message}
                                            </p>
                                        </TableCell>
                                        <TableCell>{item.date}</TableCell>
                                        <TableCell>{item.subscribe ? 'Yes' : 'No'}</TableCell>
                                    </TableRow>
                                )
                            }
                        }
                    </TableBody>
                </Table>
            </div>
        )
    }
}

export default Contact
