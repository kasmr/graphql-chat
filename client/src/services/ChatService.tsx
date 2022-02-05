import { gql } from '@apollo/client';


class ChatService {

    static get getMessages() {
        return gql`
            subscription {
                messages {
                    id
                    content
                    username
                }
            }
        `;
    }

    static get sendMessage() {
        return gql`
            mutation  sendMesage($username: String!, $content: String!) {
                sendMessage(username: $username, content: $content)
            }
        `;
    }
}

export { ChatService };