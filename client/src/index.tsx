import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/index.css';
import 'antd/dist/antd.css';

import App from './App';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { ConfigProvider } from 'antd';


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <ConfigProvider>
                <App/>
            </ConfigProvider>
        </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root'),
);

