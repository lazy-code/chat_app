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
    this.state = {};
    this.socket = io('http://localhost:3000');
    this.socket.on('connect', this.connect);
  }

  connect = () => {
    this.setState({status: 'connected'});
    console.log('Connected ', this.socket.id);
  };

  render() {
    return (
      <Grid>
        <Row>
          <Col md={4}>
            <UserList />
          </Col>
          <Col md={8}>
            <MessageList />
            <MessageForm />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default App;
