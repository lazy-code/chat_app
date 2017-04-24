import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Panel from 'react-bootstrap/lib/Panel';
import ListGroup from 'react-bootstrap/lib/ListGroup';
import ListGroupItem from 'react-bootstrap/lib/ListGroupItem';

class UserList extends Component {
  render() {

    const { users } = this.props;
    const body = users.map((user) => (
      <ListGroupItem key={user.id}>{user.name}</ListGroupItem>)
    );

    return (
      <Panel header={`Users List - ${users.length}`}>
        <ListGroup>
          {body}
        </ListGroup>
      </Panel>
    );
  }
}

UserList.propTypes = {
  // Form App Component
  users: PropTypes.array.isRequired
};

export default UserList;
