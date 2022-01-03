import React from 'react';

import { Chat } from './components/Chat';
import { InputBar } from './components/InputBar';


const App = () => {
    return (
        <>
            <Chat user="Alik"/>
            <InputBar/>
        </>
    );
};

export default App;
