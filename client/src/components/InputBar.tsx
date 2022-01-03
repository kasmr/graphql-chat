import React from 'react';

import { Button, Input } from 'antd';

import { EditFilled , SmileOutlined } from '@ant-design/icons';


const InputBar = () => {
    return (
        <Input.Group className="!flex !pt-3" compact>
            <Input allowClear
                   prefix={<EditFilled className='text-2xl mr-5' />}
                   suffix={<Button className="ml-3" size="large" icon={<SmileOutlined/>}/>}
                   size="large"
                   defaultValue="mysite"/>
            <Button className="!h-14 !w-40" size="large" type="primary">Send</Button>
        </Input.Group>
    );
};


export { InputBar };