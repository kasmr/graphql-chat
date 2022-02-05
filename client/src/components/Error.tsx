import React from 'react';

import { Result } from 'antd';


const Error = () => {
    return (
        <Result status="500" title="Sorry, something went wrong." subTitle="Please reload page"/>
    );
};


export { Error };