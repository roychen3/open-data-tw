import React, { Component } from "react";

export class Option extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.defaultSelected
    };

    this.selectedClick = this.selectedClick.bind(this);
  }

  selectedClick(item) {
    this.setState(state => ({ selected: item }));
    this.props.onOptionChange(item);
  }

  render() {
    let optionList = [];
    for (let i = 0; i < this.props.optionList.length; i++) {
      optionList.push(this.props.optionList[i].locationName);
    }
    const rows = [];
    optionList.forEach((item, i) => {
      if (item === this.state.selected) {
        rows.push(
          <li
            key={i}
            className="option selected"
            onClick={() => this.selectedClick(item)}
          >
            {item}
          </li>
        );
      } else {
        rows.push(
          <li
            key={i}
            className="option"
            onClick={() => this.selectedClick(item)}
          >
            {item}
          </li>
        );
      }
    });

    return (
      <ul
        className={
          this.props.isShow
            ? "select-option show-select-option"
            : "select-option"
        }
      >
        {rows}
      </ul>
    );
  }
}

export default Option;
