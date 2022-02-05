import React, { Dispatch, SetStateAction, useState } from 'react';

import { Button, Input, Modal, Typography } from 'antd';

import { SmileTwoTone } from '@ant-design/icons';


interface Props {
    user: string;
    setUser: Dispatch<SetStateAction<string>>;
}

const UserModal = (props: Props) => {

    const { user, setUser } = props;

    const [ isOpen, setIsOpen ] = useState(true);

    return (
        <Modal keyboard={true}
               centered
               closable={false}
               footer={<Button className="!flex !mx-auto"
                               onClick={() => setIsOpen(false)}
                               disabled={!user}
                               type="primary">Start chatting!</Button>}
               visible={isOpen}>
            <div className="flex flex-col justify-center items-center gap-4">
                <div>
                    <SmileTwoTone className="!text-8xl" twoToneColor="#52c41a"/>

                </div>

                <Typography.Text className="text-xl !text-green-600 text-center">
                    Welcome to graphql-apollo-socket chat!
                </Typography.Text>

                <Typography.Text className="text-xl !text-green-600 text-center">
                    How shall we call you?
                </Typography.Text>

                <Input value={user}
                       onChange={(event) => setUser(event.target.value)}
                       placeholder="Your beautiful name..."/>
            </div>
        </Modal>
    );
};


export { UserModal };