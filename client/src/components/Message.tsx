import React from 'react';
import { Avatar, Tag, Typography } from 'antd';
import { Messages } from './Chat';


interface Props {
    user: string;
    data: {
        getMessages: Messages[]
    };
}

const Message = (props: Props) => {

    const { data, user } = props;

    return (
        <>
            {data.getMessages.map(({ id, username, content }) => (
                <div className={user === username ? 'flex justify-end' : 'flex justify-start'}>
                    <Avatar className="!mr-1" size={40}>{username}</Avatar>
                    <Tag key={id} color="geekblue">
                        <Typography.Text className="text-xl">
                            {content}
                        </Typography.Text>
                    </Tag>
                </div>
            ))}
        </>
    );
};


export { Message };