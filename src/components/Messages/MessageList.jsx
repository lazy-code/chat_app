import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Message from './Message';
import Well from 'react-bootstrap/lib/Well';

class MessageList extends Component {
  render() {

    const { messages } = this.props;
    const body = messages.map((message) => {
      return <Message message={message} key={message.timeStamp} />
    });

    return (
      <div>
        <Well bsSize="small">
          <h3>Messages</h3>
          {body}
        </Well>
      </div>
    );
  }
}

MessageList.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageList;
