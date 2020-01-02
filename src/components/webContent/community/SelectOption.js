import React, { Component } from "react";
import Option from './Option';

export class SelectOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showOption: false,
      selected: this.props.defaultSelected
    };

    this.selectBarClick = this.selectBarClick.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  selectBarClick() {
    this.setState(state => ({ showOption: !state.showOption }));
  }

  onOptionChange(selected) {
    this.setState(state => ({ selected: selected }));
    this.props.onSelecOptionChange(selected);
  }

  render() {
    let selected = this.state.selected;

    return (
      <div className="select-bar" onClick={this.selectBarClick}>
        <p>{selected}</p> <i className="fas fa-caret-down"></i>
        <Option
          isShow={this.state.showOption}
          optionList={this.props.optionDatas}
          defaultSelected={selected}
          onOptionChange={this.onOptionChange}
        />
      </div>
    );
  }
}

export default SelectOption;
