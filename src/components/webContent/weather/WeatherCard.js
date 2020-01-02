import React, { Component } from "react";
import { switchDay } from "../community/community";
export class WeatherCard extends Component {
  render() {
    let startWeatherDate = new Date(this.props.dayInfo.startTime);
    let endWeatherDate = new Date(this.props.dayInfo.endTime);
    let startDay = switchDay(startWeatherDate.getDay());
    let endDay = switchDay(endWeatherDate.getDay());
    let date;
    let startTime = startWeatherDate.toLocaleTimeString("en-US");
    let endTime = endWeatherDate.toLocaleTimeString("en-US");
    if (startDay === endDay) {
      date = startDay;
    } else {
      date = startDay + " - " + endDay;
    }

    return (
      <div className="weather-card">
        <div className="weather-time">
          {date}
          <br />
          <p className="start-time">{startTime}</p>
          <p className="end-time"> - {endTime}</p>
        </div>
        <div className="weather-description">
          {this.props.dayInfo.weatherDescription}
        </div>
        <div className="weather-temperature">
          {this.props.dayInfo.minTemperature} ~{" "}
          {this.props.dayInfo.maxTemperature}
        </div>
        <div className="rain-probability">
          降雨機率：{this.props.dayInfo.rainProbability}
        </div>
      </div>
    );
  }
}

export default WeatherCard;
