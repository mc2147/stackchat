import { createStore, applyMiddleware } from 'redux'
import loggerMiddleWare from 'redux-logger';


const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';

const initialState = {
    messages: [],
    newMessageEntry: '',
}

const resultMiddleware = applyMiddleware(loggerMiddleWare)


export function gotMessagesFromServer (messages) {
    return {
        type: GOT_MESSAGES_FROM_SERVER, // be sure to use the constant, not a string literal
        messages,
    };
}

export function writeMessage (inputContent) {
    return {
        type: WRITE_MESSAGE,
        newMessageEntry: inputContent
    };
}

export function gotNewMessageFromServer (message) {
    return {
        type: GOT_NEW_MESSAGE_FROM_SERVER,
        message: message
    };
}

function reducer (prevState = initialState, action) {
    switch (action.type) {
        case GOT_MESSAGES_FROM_SERVER:
            return Object.assign({}, prevState, { messages: action.messages });
        case WRITE_MESSAGE:
            return {...prevState, newMessageEntry: action.newMessageEntry}
        case GOT_NEW_MESSAGE_FROM_SERVER:
            return {...prevState, messages: [...prevState.messages, action.message]}
        default:
        return prevState;
    }
}

const store = createStore(reducer, resultMiddleware);
export default store;

