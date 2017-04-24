import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {

  // Format timestamp into date
  formatDate = (timeStamp) => {
    const dt = new Date(timeStamp);
    let hours = dt.getHours();
    let minutes = dt.getMinutes();
    let seconds = dt.getSeconds();

    hours = (hours < 10) ? '0' + hours : hours;
    minutes = (minutes < 10) ? '0' + minutes : minutes;
    seconds = (seconds < 10) ? '0' + seconds : seconds;

    return hours + ':' + minutes + ':' + seconds;
  };

  render() {

    const { message } = this.props;
    const time = this.formatDate(message.timeStamp);

    return (
      <div>
        {time} <b>{message.user}</b> : {message.text}
      </div>
    );
  }
}

Message.propTypes = {
  // From MessageList Component
  message: PropTypes.object.isRequired
};

export default Message;
