import React, { useState } from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Chat } from './components/Chat';
import { UserModal } from './components/UserModal';


const App = () => {

    const [ user, setUser ] = useState('');

    const leaveChat = () => {
        localStorage.removeItem('user');
        setUser('');
    };

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserModal user={user} setUser={setUser}/>}/>
                <Route path="/chat" element={<Chat user={user} leaveChat={leaveChat}/>}/>
            </Routes>
        </BrowserRouter>
    );
};


export default App;
