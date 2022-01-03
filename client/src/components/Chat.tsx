import React from 'react';
import { useQuery } from '@apollo/client';
import { ChatService } from '../services/ChatService';
import { Divider } from 'antd';
import { Message } from './Message';
import { Loader } from './Loader';
import { Error } from './Error';


export interface Messages {
    id: string;
    username: string;
    content: string;
}

interface Props {
    user: string;
}

const Chat = (props: Props) => {

    const { data, loading, error } = useQuery<{ getMessages: Messages[] }>(ChatService.getMessages);

    if (error) {
        return <Error/>;
    }

    if (data && !loading) {
        return (
            <>
                <Divider className='!mt-0 !py-5' orientation="center">Messages</Divider>
                <div className="flex flex-col gap-3 h-full">
                    <Message user={props.user} data={data}/>
                </div>
            </>
        );
    }

    return <Loader/>;
};


export { Chat };