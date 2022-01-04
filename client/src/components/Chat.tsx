import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ChatService } from '../services/ChatService';
import { Divider } from 'antd';
import { Message } from './Message';
import { Loader } from './Loader';
import { Error } from './Error';
import { InputBar } from './InputBar';


export interface Messages {
    id: string;
    username: string;
    content: string;
}


const Chat = () => {

    const user = 'Alik'

    const { data, loading, error } = useQuery<{ getMessages: Messages[] }>(ChatService.getMessages);

    if (error) {
        return <Error/>;
    }

    if (data && !loading) {
        return (
            <>
                <Divider className="!mt-0 !py-5" orientation="center">Messages</Divider>
                <div className="flex flex-col gap-3 h-full">
                    <Message user={user} data={data}/>
                </div>
                <InputBar user={user}/>
            </>
        );
    }

    return <Loader/>;
};


export { Chat };