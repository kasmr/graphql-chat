import { gql } from '@apollo/client';


class ChatService {

    static get getMessages() {
        return gql`
            query {
                getMessages {
                    id
                    content
                    username
                }
            }
        `;
    }
}

export { ChatService };