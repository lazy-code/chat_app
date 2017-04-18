import React, {Component} from 'react';
import FormControl from 'react-bootstrap/lib/FormControl';
import FormGroup from 'react-bootstrap/lib/FormGroup';
import ControlLabel from 'react-bootstrap/lib/ControlLabel';

class MessageForm extends Component {

  state = {
    value: '',
    validationState: null
  };

  handleChange = (e) => {
    const value = e.target.value.trim();
    const validationState = (value.length < 2) ? 'error' : 'success';
    this.setState({ value, validationState });
  };

  render() {
    return (
      <form>
        <FormGroup
          controlId="formBasicText"
          validationState={this.state.validationState}
        >
          <ControlLabel>Enter a message</ControlLabel>
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Enter text"
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>
      </form>
    );
  }
}

export default MessageForm;
