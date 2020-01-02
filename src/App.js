import React from "react";
import { Route, HashRouter } from "react-router-dom";
import "./style/App.css";
import WebHeader from "./components/header/WebHeader";
import Holiday from "./components/webContent/holiday/Holiday";
import Weather from "./components/webContent/weather/Weather";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      webModel: "國定假日"
    };
  }

  render() {
    return (
      <HashRouter>
        <WebHeader />
        <div className="container">
          <Route exact path="/" component={Holiday} />
          <Route path="/Weather" component={Weather} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
