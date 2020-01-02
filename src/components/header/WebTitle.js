import React, { Component } from "react";

export class WebTitle extends Component {
  render() {
    return <h1 className="title">{this.props.title}</h1>;
  }
}

export default WebTitle;
