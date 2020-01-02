import React, { Component } from "react";

export class HolidayTableData extends Component {
  render() {
    const allHoliday = this.props.holidayData;
    const rows = [];
    for (let i = 0; i < allHoliday.length; i++) {
      if (allHoliday[i].holidayCategory === "補行上班日") {
        rows.push(
          <tr key={allHoliday[i].date} className="work-day">
            <td>{allHoliday[i].date}</td>
            <td>{allHoliday[i].name}</td>
            <td>{allHoliday[i].holidayCategory}</td>
            <td>{allHoliday[i].description}</td>
          </tr>
        );
      } else {
        rows.push(
          <tr key={allHoliday[i].date}>
            <td>{allHoliday[i].date}</td>
            <td>{allHoliday[i].name}</td>
            <td>{allHoliday[i].holidayCategory}</td>
            <td>{allHoliday[i].description}</td>
          </tr>
        );
      }
    }

    return rows;
  }
}

export default HolidayTableData;
