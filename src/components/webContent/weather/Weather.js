import React from "react";
import { filterDatas } from "../commons/commons";
import SelectOption from "../commons/SelectOption";
import WebMessage from "../commons/WebMessage";
import WeatherCard from "./WeatherCard";

function dataToWeather(datas, condition) {
  let weatherObj = {
    location: "",
    info: [
      {
        startTime: "",
        endTime: "",
        weatherDescription: "",
        maxTemperature: "",
        minTemperature: "",
        rainProbability: "",
        comfort: ""
      },
      {
        startTime: "",
        endTime: "",
        weatherDescription: "",
        maxTemperature: "",
        minTemperature: "",
        rainProbability: "",
        comfort: ""
      },
      {
        startTime: "",
        endTime: "",
        weatherDescription: "",
        maxTemperature: "",
        minTemperature: "",
        rainProbability: "",
        comfort: ""
      }
    ]
  };
  let weatherDataSite;

  // 尋找選擇地區在陣列中的位子
  for (let i = 0; i < datas.length; i++) {
    if (datas[i].locationName === condition) {
      weatherDataSite = i;
      break;
    }
  }

  let infoType;
  let infoStartTime;
  let infoEndTime;
  let weatherDescription;
  let rainProbability;
  let degree;

  for (let i = 0; i < datas[weatherDataSite].weatherElement.length; i++) {
    infoType = datas[weatherDataSite].weatherElement[i].elementName;
    weatherObj.location = datas[weatherDataSite].locationName;

    for (
      let j = 0;
      j < datas[weatherDataSite].weatherElement[i].time.length;
      j++
    ) {
      infoStartTime =
        datas[weatherDataSite].weatherElement[i].time[j].startTime;
      infoEndTime = datas[weatherDataSite].weatherElement[i].time[j].endTime;

      if (j < 3) {
        weatherObj.info[j].startTime = infoStartTime;
        weatherObj.info[j].endTime = infoEndTime;
      }

      if (infoType === "Wx") {
        // 天氣描述
        weatherDescription =
          datas[weatherDataSite].weatherElement[i].time[j].parameter
            .parameterName;
        weatherObj.info[j].weatherDescription = weatherDescription;
      } else if (infoType === "MaxT") {
        // 最高溫度
        degree =
          datas[weatherDataSite].weatherElement[i].time[j].parameter
            .parameterName + "℃";
        weatherObj.info[j].maxTemperature = degree;
      } else if (infoType === "MinT") {
        // 最低溫度
        degree =
          datas[weatherDataSite].weatherElement[i].time[j].parameter
            .parameterName + "℃";
        weatherObj.info[j].minTemperature = degree;
      } else if (infoType === "CI") {
        // 舒適感
        weatherDescription =
          datas[weatherDataSite].weatherElement[i].time[j].parameter
            .parameterName;
        weatherObj.info[j].comfort = weatherDescription;
      } else if (infoType === "PoP") {
        // 降雨機率
        rainProbability =
          datas[weatherDataSite].weatherElement[i].time[j].parameter
            .parameterName + "%";
        weatherObj.info[j].rainProbability = rainProbability;
      }
    }
  }

  return weatherObj;
}

class Weather extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      city: "臺北市",
      webDatas: ""
    };

    this.onSelecOptionChange = this.onSelecOptionChange.bind(this);
  }

  onSelecOptionChange(selected) {
    this.setState(state => ({ city: selected }));
  }

  getWeatherDatas() {
    console.log("getWeather");
    let url =
      "https://opendata.cwb.gov.tw/fileapi/v1/opendataapi/F-C0032-001?Authorization=rdec-key-123-45678-011121314&format=JSON";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        let resultDatas = myJson.cwbopendata.dataset.location;
        this.setState(state => ({ isLoading: false, webDatas: resultDatas }));
      })
      .catch(error => {
        console.log(error);
        this.setState(state => ({ isLoading: false, isError: true }));
      });
  }

  componentDidMount() {
    this.getWeatherDatas();
  }

  render() {
    let weather;
    let message;
    if (this.state.isLoading) {
      console.log("loading...");
      message = (
        <p id="message">
          <i className="fas fa-spinner"></i> 載入中
        </p>
      );
      weather = <WebMessage message={message} />;
    } else {
      if (this.state.isError) {
        console.log("error");
        message = (
          <p id="message">
            <i className="fas fa-exclamation-triangle"></i> 伺服器發生問題
          </p>
        );
        weather = <WebMessage message={message} />;
      } else {
        console.log("success");

        let weatherData = filterDatas(
          this.state.webDatas,
          this.state.city,
          dataToWeather
        );
        const weatherAllCard = weatherData.info.map((dayInfo, i) => (
          <WeatherCard key={i} dayInfo={dayInfo} />
        ));
        weather = (
          <div>
            <SelectOption
              optionDatas={this.state.webDatas}
              defaultSelected={this.state.city}
              onSelecOptionChange={this.onSelecOptionChange}
            />
            <div className="weather">
              <h3 className="weather-location">{weatherData.location}</h3>
              <div className="weather-card-container">{weatherAllCard}</div>
            </div>
          </div>
        );
      }
    }

    return weather;
  }
}

export default Weather;
