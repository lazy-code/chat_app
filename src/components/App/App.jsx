import React, { Component } from 'react';
import io from 'socket.io-client';
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import { MessageList, MessageForm } from '../Messages';
import { UserList, UserForm } from '../Users';
import './bootstrap.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      status: 'disconnected',
      messages: [{
        timeStamp: Date.now(),
        text: 'Welcome to chat'
      }],
      users: [],
      user: ''
    };
  }

  componentWillMount = () => {
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
    this.socket.on('messageAdded', this.messageAdded);
  };

  // Add connection
  connect = () => this.setState({ status: 'connected' });

  // Remove connection
  disconnect = () => this.setState({ status: 'disconnected' });

  // Message was added
  messageAdded = (message) => (
    this.setState({ messages: this.state.messages.concat(message) })
  );

  // Emit new message
  emit = (eventName, payload) => this.socket.emit(eventName, payload);

  render() {

    return (
      <Grid>
        <Row>
          <Col md={4}>
            <UserList {...this.state} />
          </Col>
          <Col md={8}>
            <MessageList {...this.state} />
            <MessageForm {...this.state} emit={this.emit}/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
