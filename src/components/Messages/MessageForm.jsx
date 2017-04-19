import React, {Component} from 'react';
import PropTypes from 'prop-types';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class MessageForm extends Component {

  state = {
    value: '',
    validationState: null
  };

  handleChange = (e) => {
    const value = e.target.value;
    const validationState = (value.trim().length === 0) ? 'error' : 'success';
    this.setState({ value, validationState });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.validationState === 'error' ||
        this.state.validationState === null) {
      this.setState({ validationState: 'error' });
      return false;
    }
    this.props.emit('messageAdded', {
      timeStamp: Date.now(),
      text: this.state.value
    });
    this.setState({
      value: '',
      validationState: null
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.state.validationState}
        >
          <ControlLabel>Enter a message</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Type a message and press Enter"
            onChange={this.handleChange}
          />
        </FormGroup>
      </form>
    );
  }
}

MessageForm.propTypes ={
  // From App Component
  emit: PropTypes.func.isRequired
};

export default MessageForm;
