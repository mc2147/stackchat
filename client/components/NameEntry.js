import React, { Component } from 'react';
import store from '../store';
import {enterName} from '../store';

export default class NameEntry extends Component {
    constructor(){
        super();
        this.state = store.getState();
        this.changeHandler = this.changeHandler.bind(this);
    }
    
    componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
        this.setState(
            store.getState()
        );
    });
    }
    
    changeHandler(event) {
        this.setState({name: event.target.value});
        store.dispatch(enterName(event.target.value));
        // .then(() => {
            console.log(this.state.name);
        // })                
    }

  render () {
    return (
        <form className="form-inline">
        <label htmlFor="name">Your name: </label>
        <input
            onChange={this.changeHandler}
            type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
        //   style="margin-left:2px;"
        />
        </form>    
    );
  }
}




