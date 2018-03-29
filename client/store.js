import { createStore, applyMiddleware } from 'redux'
import loggerMiddleWare from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import axios from 'axios';
import socket from './socket';

const GOT_MESSAGES_FROM_SERVER = 'GOT_MESSAGES_FROM_SERVER';
const WRITE_MESSAGE = 'WRITE_MESSAGE';
const GOT_NEW_MESSAGE_FROM_SERVER = 'GOT_NEW_MESSAGE_FROM_SERVER';
const CHANGE_NAME = 'CHANGE_NAME';

const initialState = {
    messages: [],
    newMessageEntry: '',
    name: ''
}

const resultMiddleware = applyMiddleware(loggerMiddleWare, thunkMiddleware)


export function fetchMessages() {
    return function thunk (dispatch) {
        return axios.get('/api/messages')
        .then(res => res.data)
        .then(messages => {
            // this.setState({ messages });
            const action = gotMessagesFromServer(messages);
            dispatch(action);
        });
    }
    // return thunk
}

export function postMessage(body) {
    return function thunk (dispatch) {
        return axios.post('/api/messages', {name: body.name, content: body.content, channelId: body.channelId,})
        .then(res => res.data)
        .then(message => {
            const action = gotNewMessageFromServer(message);
            dispatch(action);
            socket.emit('new-message', message)
        })
    }    
}

export function enterName(name) {
    return {
        type: CHANGE_NAME,
        name: name,
    };
}

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
        case CHANGE_NAME:
            return Object.assign({}, prevState, { name: action.name })
        default:
            return prevState;
    }
}

const store = createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    resultMiddleware,
);

// const store = createStore(
//     reducer, /* preloadedState, */
//  +  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//   );

export default store;

