import React, { useState } from 'react';

import { Button, Form, Input } from 'antd';

import { EditFilled, SmileOutlined } from '@ant-design/icons';


interface Props {
    user: string;
}

const InputBar = (props: Props) => {

    const [ state, setState ] = useState({
        user: props.user,
        content: '',
    });

    return (
        <Form>
            <Input.Group className="!flex !pt-3" compact>
                <Input allowClear
                       prefix={<EditFilled className="text-2xl mr-5"/>}
                       suffix={<Button className="ml-3" size="large" icon={<SmileOutlined/>}/>}
                       size="large"
                       placeholder="mysite"/>
                <Button className="!h-14 !w-40" size="large" htmlType="submit" type="primary">Send</Button>
            </Input.Group>
        </Form>
    );
};


export { InputBar };