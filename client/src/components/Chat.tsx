import React, { useLayoutEffect, useRef } from 'react';

import { useSubscription } from '@apollo/client';

import { Navigate } from 'react-router-dom';

import { ChatService } from '../services/ChatService';

import { Avatar, Button, Divider, Tag, Typography } from 'antd';

import { InputBar } from './InputBar';
import { Error } from './Error';
import { Loader } from './Loader';


interface Messages {
    id: string;
    username: string;
    content: string;
}

interface Props {
    user: string;
    leaveChat: Function;
}

const Chat = (props: Props) => {

    const { user, leaveChat } = props;

    const { data, loading, error } = useSubscription<{ messages: Messages[] }>(ChatService.getMessages);

    useLayoutEffect(() => scrollToLastMessage(), [ data?.messages ]);

    const messageRef = useRef<HTMLDivElement>(null);

    const scrollToLastMessage = () => messageRef.current?.scrollIntoView({ behavior: 'smooth' });

    if (!user) {
        return <Navigate to="/" replace/>;
    }

    if (error) {
        return <Error/>;
    }

    if (loading && !data) {
        return <Loader/>;
    }

    return (
        <main className="h-screen flex flex-col flex-1">
            <Divider className="!my-0 !pt-5 !text-2xl" orientation="center">Messages</Divider>

            <Typography.Text className="text-2xl !absolute !left-[25px] !top-[10px]">
                {user}
            </Typography.Text>
            <Button className="!absolute !right-[25px] !top-[10px]"
                    onClick={() => leaveChat()}
                    type="primary"
                    danger>
                Leave Chat
            </Button>

            <div className="flex flex-col px-4 mt-4 mb-16 gap-3 overflow-auto">
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

                        <Tag className="!flex !m-0 items-center" color="geekblue">
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