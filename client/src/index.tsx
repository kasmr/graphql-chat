import React from 'react';
import ReactDOM from 'react-dom';

import './assets/styles/index.css';
import 'antd/dist/antd.css';

import App from './App';

import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import { ConfigProvider } from 'antd';
import { getMainDefinition } from '@apollo/client/utilities';


const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
});

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000',
    options: {
        reconnect: true,
    },
});

const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
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

