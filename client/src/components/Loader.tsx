import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';


const Loader = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <LoadingOutlined className="text-9xl !text-sky-600" spin/>
        </div>
    );
};


export { Loader };