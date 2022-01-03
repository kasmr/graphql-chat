import React from 'react';
import { useQuery } from '@apollo/client';
import { ChatService } from '../services/ChatService';
import { Button, Divider, Result, Spin, Tag, Typography } from 'antd';
import { SyncOutlined } from '@ant-design/icons';


interface Messages {
    id: string;
    user: string;
    content: string;
}

const Chat = () => {

    const { data, loading, error } = useQuery<{ getMessages: Messages[] }>(ChatService.getMessages);

    if (loading && !data) {
        return <Spin size="large"/>;
    }

    if (error) {
        return <Result status="500"
                       title="Sorry, something went wrong."
                       subTitle="Please try again"
                       extra={<Button type="primary" icon={<SyncOutlined spin/>}>Refresh</Button>}/>;
    }

    return (
        <div className='bg-gradient-to-r from-blue-400 to-blue-600 h-screen'>
            <Divider className='!m-0 !py-5' orientation="left">Messages</Divider>
            {data?.getMessages.map(({ id, user, content }) => (
                <div>
                    <Typography.Text keyboard={true} strong={true}>
                        {user}
                    </Typography.Text>
                    <Tag key={id} color="geekblue">{content}</Tag>
                </div>

            ))}
        </div>
    );
};


export { Chat };