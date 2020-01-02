import React from "react";
import { switchDay, filterDatas } from "../commons/commons";
import WebMessage from "../commons/WebMessage";
import SearchInput from "../commons/SearchInput";
import HolidayTableData from "./HolidayTableData";

function dataToHoliday(allHolidayData, year) {
  let showData = [];
  for (let i = 0; i < allHolidayData.length; i++) {
    if (
      new Date(allHolidayData[i].date) >= new Date("1/1/" + year) &&
      new Date(allHolidayData[i].date) <= new Date("12/31/" + year) &&
      allHolidayData[i].holidayCategory !== "星期六、星期日"
    ) {
      let holidayInfo = {
        date: "",
        name: "",
        holidayCategory: "",
        description: ""
      };

      let date = new Date(allHolidayData[i].date);
      holidayInfo.date =
        allHolidayData[i].date + " " + switchDay(date.getDay());
      holidayInfo.name = allHolidayData[i].name;
      holidayInfo.holidayCategory = allHolidayData[i].holidayCategory;
      holidayInfo.description = allHolidayData[i].description;

      showData.push(holidayInfo);
    }
  }

  return showData;
}

class Holiday extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isError: false,
      year: new Date().getFullYear(),
      webDatas: ""
    };

    this.handleSearchYear = this.handleSearchYear.bind(this);
  }

  handleSearchYear(inputed) {
    if (inputed.length === 4) {
      this.setState(state => ({ year: inputed }));
    } else if (inputed === "" || inputed === undefined) {
      let d = new Date();
      let year = d.getFullYear();
      this.setState(state => ({ year: year }));
    } else {
      this.setState(state => ({ year: "error" }));
    }
  }

  getHolidayDatas() {
    console.log("getHoliday");
    let url =
      "https://cors-anywhere.herokuapp.com/http://data.ntpc.gov.tw/api/v1/rest/datastore/382000000A-000077-002";
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(myJson => {
        let resultDatas = myJson.result.records;
        this.setState(state => ({ isLoading: false, webDatas: resultDatas }));
      })
      .catch(error => {
        console.log(error);
        this.setState(state => ({ isLoading: false, isError: true }));
      });
  }

  componentDidMount() {
    this.getHolidayDatas();
  }

  render() {
    let holidayData = this.state.webDatas;

    let message;
    let holiday;

    if (this.state.isLoading) {
      console.log("loading...");
      message = (
        <p id="message">
          <i className="fas fa-spinner"></i> 載入中
        </p>
      );
      holiday = <WebMessage message={message} />;
    } else {
      if (this.state.isError) {
        console.log("error");
        message = (
          <p id="message">
            <i className="fas fa-exclamation-triangle"></i> 伺服器發生問題
          </p>
        );
        holiday = <WebMessage message={message} />;
      } else {
        console.log("success");
        holidayData = filterDatas(
          this.state.webDatas,
          this.state.year,
          dataToHoliday
        );
        if (holidayData.length > 0) {
          const tableTitle = (
            <tr>
              <th>日期</th>
              <th>放假名稱</th>
              <th>放假類型</th>
              <th>其他資訊</th>
            </tr>
          );
          holiday = (
            <div>
              <SearchInput
                placeholder="查詢年份: e.g. 2019"
                onFilterTextChange={this.handleSearchYear}
              />
              <table className="holiday-table">
                <tbody>
                  {tableTitle}
                  <HolidayTableData holidayData={holidayData} />
                </tbody>
              </table>
            </div>
          );
        } else {
          message = (
            <p id="message">
              <i className="far fa-file"></i> 無資料
            </p>
          );
          holiday = (
            <div>
              <SearchInput
                placeholder="查詢年份: e.g. 2019"
                onFilterTextChange={this.handleSearchYear}
              />
              <WebMessage message={message} />
            </div>
          );
        }
      }
    }

    return holiday;
  }
}

export default Holiday;
