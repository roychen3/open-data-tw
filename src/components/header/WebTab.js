import React, { Component } from "react";
import { NavLink } from "react-router-dom";
export class WebTab extends Component {
  render() {
    const tabList = [{ Holiday: "國定假日" }, { Weather: "天氣預報" }];
    let linkName;
    let tabName;
    const rows = [];
    tabList.forEach((tab, i) => {
      linkName = Object.keys(tab)[0];
      tabName = Object.values(tab)[0];
      if (i === 0) {
        rows.push(
          <NavLink exact to={"/"} key={i} className="header-tab">
            {tabName}
          </NavLink>
        );
      } else {
        rows.push(
          <NavLink to={"/" + linkName} key={i} className="header-tab">
            {tabName}
          </NavLink>
        );
      }
    });
    return <div className="header-tab-column">{rows}</div>;
  }
}

export default WebTab;
