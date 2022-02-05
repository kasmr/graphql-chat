import { GraphQLServer, PubSub } from 'graphql-yoga';


const messages = [];

const typeDefs = `
type Message {
    id: ID!
    username: String!
    content: String!
}

type Query {
    messages: [Message!]
}

type Mutation {
    sendMessage(username: String!, content: String!): ID!
}

type Subscription {
    messages: [Message!]
}
`;

const subscribers = [];

const onMessage = (fn) => subscribers.push(fn);

const resolvers = {
    Query: {
        messages: () => messages,
    },
    Mutation: {
        sendMessage: (parent, { username, content }) => {
            const id = messages.length;
            messages.push({
                id,
                username,
                content,
            });
            subscribers.forEach(fn => fn());
            return id;
        },
    },
    Subscription: {
        messages: {
            subscribe: (parent, args, { pubsub }) => {
                const channel = Math.random().toString(36).slice(2, 15);
                onMessage(() => pubsub.publish(channel, { messages }));
                setTimeout(() => pubsub.publish(channel, { messages }), 0);
                return pubsub.asyncIterator(channel);
            },
        },
    },
};

const pubsub = new PubSub();

const server = new GraphQLServer({ typeDefs, resolvers, context: { pubsub } });
server.start(({ port }) => {
    console.log(`Server on http://localhost:${port}/`);
});


