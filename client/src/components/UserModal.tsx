import React, { Dispatch, SetStateAction, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { Button, Input, Modal, Typography } from 'antd';
import { SmileTwoTone } from '@ant-design/icons';


interface Props {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}

const UserModal = (props: Props) => {

    const { user, setUser } = props;

    const [ isOpen, setIsOpen ] = useState(true);
    const navigateTo = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => setUser(event.target.value);

    const handleClick = () => {
        setIsOpen(false);
        navigateTo('/chat');
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleClick();
        }
        return;
    };

    return (
        <Modal keyboard={true}
               centered
               closable={false}
               visible={isOpen}
               footer={<Button className="!flex !mx-auto" onClick={handleClick} disabled={!user} type="primary">
                   Start chatting!
               </Button>}>
            <div className="flex flex-col justify-center items-center gap-4">
                <SmileTwoTone className="!text-8xl" twoToneColor="#52c41a"/>

                <Typography.Text className="text-xl !text-green-600 text-center">
                    Welcome to graphql-apollo-socket chat!
                </Typography.Text>

                <Typography.Text className="text-xl !text-green-600 text-center">
                    How shall we call you?
                </Typography.Text>

                <Input value={user}
                       onChange={handleChange}
                       onKeyPress={handleKeyPress}
                       placeholder="Your beautiful name..."/>
            </div>
        </Modal>
    );
};


export { UserModal };