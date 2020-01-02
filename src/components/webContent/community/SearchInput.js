import React, { Component } from "react";

export class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder
    };

    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
  }

  handleFilterTextChange(e) {
    this.props.onFilterTextChange(e.target.value);
  }

  render() {
    return (
      <input
        type="text"
        id="search"
        placeholder={this.state.placeholder}
        onChange={this.handleFilterTextChange}
      />
    );
  }
}

export default SearchInput;
