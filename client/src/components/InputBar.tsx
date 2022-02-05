import React, { useEffect, useState } from 'react';

import { useMutation } from '@apollo/client';

import { ChatService } from '../services/ChatService';

import { Button, Input } from 'antd';
import { EditFilled, SmileOutlined } from '@ant-design/icons';


interface Props {
    user: string;
}

const InputBar = (props: Props) => {

    const [ state, setState ] = useState({
        user: '',
        content: '',
    });

    useEffect(() => setState({ ...state, user: props.user }), [ props.user ]);

    const [ sendMessage ] = useMutation(ChatService.sendMessage);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, content: event.target.value });
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSend();
        }
    };

    const handleSend = () => {
        if (!state.content) {
            return;
        }
        sendMessage({ variables: { username: state.user, content: state.content } });
        setState({ ...state, content: '' });
    };

    return (
        <Input.Group className="!absolute !bottom-0 !flex !pt-3" compact>
            <Input allowClear
                   prefix={<EditFilled className="text-2xl mr-5"/>}
                   suffix={<Button className="ml-3" size="large" icon={<SmileOutlined/>}/>}
                   size="large"
                   value={state.content}
                   onChange={handleChange}
                   onKeyPress={handleKeyPress}
                   placeholder="Type something here..."/>
            <Button className="!h-14 !w-40" size="large" type="primary" onClick={handleSend}>Send</Button>
        </Input.Group>
    );
};


export { InputBar };