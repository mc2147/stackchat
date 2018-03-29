import React, { Component } from 'react';
import store, { gotNewMessageFromServer } from '../store';
import axios from 'axios';
import socket from '../socket';

export default class NewMessageEntry extends Component {

  constructor(){
    super();
    this.state = store.getState();

    this.changeHandler = this.changeHandler.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
        this.setState(
          store.getState()
        );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  changeHandler(event) {
    this.setState({newMessageEntry: event.target.value})
  }

  submitHandler(event) {
    event.preventDefault();
    const content = this.state.newMessageEntry;
    const channelId = this.props.channelId;

    axios.post('/api/messages', {content: content, channelId: channelId})
    .then(res => res.data)
    .then(message => {
      store.dispatch(gotNewMessageFromServer(message))
      socket.emit('new-message', message)
    })
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.submitHandler}>
        <div className="input-group input-group-lg">
          <input
            onChange={this.changeHandler}
            className="form-control"
            type="text"
            name="content"
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}
