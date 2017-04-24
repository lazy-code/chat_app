import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class UserForm extends Component {

  state = {
    user: '',
    validationState: null
  };

  handleChange = (e) => {
    const user = e.target.value;
    const validationState = (user.trim().length < 2) ? 'error' : 'success';
    this.setState({ user, validationState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.validationState === 'error' ||
      this.state.validationState === null) {
      this.setState({ validationState: 'error' });
      return false;
    }

    this.props.setUser(this.state.user);
    this.props.emit('userJoined', { user: this.state.user });

    this.setState({
      validationState: null
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="messageForm"
          validationState={this.state.validationState}
        >
          <ControlLabel>Chat Login</ControlLabel>
          <FormControl
            type="text"
            value={this.state.user}
            placeholder="Choose a UserName"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    );
  }
}

UserForm.propTypes = {
  // From App Component
  emit: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default UserForm;
