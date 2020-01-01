import React from 'react';
import {
    Route,
    NavLink,
    HashRouter
} from "react-router-dom";
import './style/App.css';
import Holiday from "./webContent/holiday";
import Weather from "./webContent/weather";



class WebTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const tabList = [{ "Holiday": "國定假日" }, { "Weather": "天氣預報" }];
        let linkName;
        let tabName;
        const rows = [];
        tabList.forEach((tab, i) => {
            linkName = Object.keys(tab)[0];
            tabName = Object.values(tab)[0];
            if (i === 0){
                rows.push(<NavLink exact to={"/"} key={i} className="header-tab">{tabName}</NavLink>);
            }
            else {
                rows.push(<NavLink to={"/" + linkName} key={i} className="header-tab">{tabName}</NavLink>);
            }
            
        });
        return <div className="header-tab-column">{rows}</div>;
    }
}

class WebTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1 className="title">{this.props.title}</h1>;
    }
}

class WebHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let title = "政府資料開放平台";

        return (<header>
            <WebTitle title={title} />
            <WebTab />
        </header>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            webModel: "國定假日"
        }
    }

    render() {
        let Web;

        Web = (<HashRouter>
            <WebHeader />
            <div className="container">
                <Route exact path="/" component={Holiday} />
                <Route path="/Weather" component={Weather} />
            </div>
        </HashRouter>);

        return Web;
    }
}

export default App;
