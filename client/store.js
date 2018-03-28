import { createStore } from 'redux'


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';

const initialState = {
    messages: [],
}


export function gotMessagesFromServer (messages) {
    return {
        type: GOT_MESSAGES_FROM_SERVER, // be sure to use the constant, not a string literal
        messages: messages
    };
};

function reducer (prevState = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, prevState, { messages: action.messages });
        default:
        return prevState;
    }
}
const store = createStore(reducer);
export default store;