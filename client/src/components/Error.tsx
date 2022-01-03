import React from 'react';

import { Button, Result } from 'antd';

import { SyncOutlined } from '@ant-design/icons';


const Error = () => {
    return (
        <Result status="500"
                title="Sorry, something went wrong."
                subTitle="Please try again"
                extra={<Button type="primary" icon={<SyncOutlined spin/>}>Refresh</Button>}/>
    );
};


export { Error };