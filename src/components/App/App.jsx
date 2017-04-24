import React, { Component } from 'react';
import io from 'socket.io-client';
import Grid  from 'react-bootstrap/lib/Grid';
import Row  from 'react-bootstrap/lib/Row';
import Col  from 'react-bootstrap/lib/Col';
import PageHeader  from 'react-bootstrap/lib/PageHeader';
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
    this.socket.on('disconnect', this.disconnect);
    this.socket.on('messageAdded', this.messageAdded);
    this.socket.on('userJoined', this.userJoined);
  };

  // Add connection
  connect = () => this.setState({ status: 'connected' });

  // Remove connection
  disconnect = (users) => this.setState({
    users: users,
    status: 'disconnected'
  });

  // Message was added
  messageAdded = (message) => (
    this.setState({ messages: this.state.messages.concat(message) })
  );

  // Message was added
  userJoined = (users) => this.setState({ users });

  // Emit new event
  emit = (eventName, payload) => this.socket.emit(eventName, payload);

  // Set userName
  setUser = (user) => {
    this.setState({ user });
  };

  render() {

    let body;
    if (this.state.user === '') {
      body = (
        <Col md={6} xsOffset={3}>
          <UserForm setUser={this.setUser} emit={this.emit} />
        </Col>
      );
    } else {
      body = (
        <div>
          <PageHeader>Welcome To Chat {this.state.user}</PageHeader>
          <Col md={4}>
            <UserList {...this.state} />
          </Col>
          <Col md={8}>
            <MessageList {...this.state} />
            <MessageForm {...this.state} emit={this.emit} />
          </Col>
        </div>
      );
    }

    return (
      <Grid>
        <Row>
          {body}
        </Row>
      </Grid>
    );
  }
}

export default App;
