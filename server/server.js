import { GraphQLServer } from 'graphql-yoga';


const messages = [];

const typeDefs = `
type Message {
    id: ID!
    username: String!
    content: String!
}

type Query {
    getMessages: [Message!]
}

type Mutation {
    postMessage(username: String!, content: String!): ID!
}
`;

const resolvers = {
    Query: {
        getMessages: () => messages,
    },
    Mutation: {
        postMessage: (parent, { username, content }) => {
            const id = messages.length;
            messages.push({
                id,
                username,
                content,
            });
            return id;
        },
    },
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(({ port }) => {
    console.log(`Server on http://localhost:${port}/`);
});


