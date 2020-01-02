import React, { Component } from "react";
import WebTab from "./WebTab";
import WebTitle from "./WebTitle";

export class WebHeader extends Component {
  render() {
    let title = "政府資料開放平台";

    return (
      <header>
        <WebTitle title={title} />
        <WebTab />
      </header>
    );
  }
}

export default WebHeader;
