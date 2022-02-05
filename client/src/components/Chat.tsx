import React, { useLayoutEffect, useRef, useState } from 'react';

import { useSubscription } from '@apollo/client';

import { ChatService } from '../services/ChatService';

import { Avatar, Divider, Tag, Typography } from 'antd';

import { InputBar } from './InputBar';
import { Error } from './Error';
import { Loader } from './Loader';
import { UserModal } from './UserModal';


interface Messages {
    id: string;
    username: string;
    content: string;
}

const Chat = () => {

    const { data, loading, error } = useSubscription<{ messages: Messages[] }>(ChatService.getMessages)

    useLayoutEffect(() => scrollToLastMessage(), [ data?.messages ]);

    const [user, setUser] = useState('')

    const messageRef = useRef<HTMLDivElement>(null);

    const scrollToLastMessage = () => messageRef.current?.scrollIntoView({ behavior: 'smooth' });


    if (error) {
        return <Error/>;
    }

    if (loading && !data) {
        return <Loader/>;
    }

    return (
        <main className="h-screen flex flex-col flex-1">
            <Divider className="!my-0 !pt-5" orientation="center">Messages</Divider>

            <UserModal user={user} setUser={setUser} />

            <div className="flex flex-col mx-4 mt-4 mb-16 gap-3 overflow-auto">
                {data?.messages.map(({ id, username, content }) => (
                    <div key={id}
                         ref={messageRef}
                         className={user === username ? 'flex justify-start flex-row-reverse' : 'flex justify-start'}>
                        <Avatar draggable shape="square" className={
                            user === username
                                ? '!bg-gradient-to-r !from-green-500 !to-green-600'
                                : '!bg-gradient-to-r !from-red-500 !to-yellow-600'
                        } size={40}>
                            {username}
                        </Avatar>

                        <Tag className="!flex items-center" color="geekblue">
                            <Typography.Text className="text-xl">
                                {content}
                            </Typography.Text>
                        </Tag>
                    </div>
                ))}
            </div>

            <InputBar user={user}/>
        </main>
    );
};


export { Chat };