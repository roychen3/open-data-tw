import React from 'react';

function switchDay(day) {
    let result;
    switch (day) {
        case 0:
            result = "星期日";
            break;
        case 1:
            result = "星期一";
            break;
        case 2:
            result = "星期二";
            break;
        case 3:
            result = "星期三";
            break;
        case 4:
            result = "星期四";
            break;
        case 5:
            result = "星期五";
            break;
        case 6:
            result = "星期六";
            break;
    }
    return result;
}

function filterDatas(datas, condition, program) {
    if (condition === "error") {
        return "";
    }
    else {
        return program(datas, condition);
    }
}

class SearchInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            placeholder: this.props.placeholder
        }

        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    }

    handleFilterTextChange(e) {
        this.props.onFilterTextChange(e.target.value);
    }

    render() {
        return (<input type="text" id="search" placeholder={this.state.placeholder} onChange={this.handleFilterTextChange} />);
    }
}

class Option extends React.Component {
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
                    <li key={i} className="option selected" onClick={(() => this.selectedClick(item))}>{item}</li>
                )
            }
            else {
                rows.push(
                    <li key={i} className="option" onClick={(() => this.selectedClick(item))}>{item}</li>
                )
            }
        });

        return (<ul className={this.props.isShow ? "select-option show-select-option" : "select-option"}>
            {rows}
        </ul>);
    }
}

class SelectOption extends React.Component {
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

        return (<div className="select-bar" onClick={this.selectBarClick}>
            <p>{selected}</p> <i className="fas fa-caret-down"></i>
            <Option isShow={this.state.showOption} optionList={this.props.optionDatas} defaultSelected={selected} onOptionChange={this.onOptionChange} />
        </div>);
    }
}

class WebMessage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let message = this.props.message;

        return (<div className="message-model">
            {message}
        </div>
        );
    }
}

export { switchDay, filterDatas, SearchInput,  SelectOption, WebMessage};