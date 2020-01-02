import React, { Component } from "react";

export class WebMessage extends Component {
  render() {
    let message = this.props.message;

    return <div className="message-model">{message}</div>;
  }
}

export default WebMessage;
