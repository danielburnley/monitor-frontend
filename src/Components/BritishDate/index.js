import React from "react";
import "./style.css";

export default class BritishDate extends React.Component {
  constructor(props) {
    super(props)
    this.dayInputRef = React.createRef();
    this.monthInputRef = React.createRef();
    this.yearInputRef = React.createRef();
  }

  parseDate = (isoDate) => {
    if (isoDate) {
      isoDate = this.convertToIsoDate(isoDate)
      let [year, month, day] = isoDate.split("-");
      if (year === "0000")
      {
        year = "";
      }
      if (month === "00")
      {
        month = "";
      }
      if (day === "00")
      {
        day = "";
      }
      return {year, month, day};
    }
    return {year: "", month: "", day: ""};
  }

  convertToIsoDate = (date) => {
    if (date[2] === "/") {
      return `${date.substring(6, 10)}-${date.substring(3, 5)}-${date.substring(0,2)}`;
    }
    return date;
  }

  composeDate = (dateObject) => (
    `${dateObject.year}-${dateObject.month}-${dateObject.day}`
  )

  removeLeadingZeroes = (string) => {
    if (string) {
      return string.replace(/^0+/m, '')
    }
    return "";
  }


  formatDay = (newDay, currentDay) => {
    if (newDay !== undefined && this.removeLeadingZeroes(newDay) <= 31) {
      return this.removeLeadingZeroes(newDay).padStart(2, "0");
    }

    return currentDay.padStart(2, "0");
  }

  formatMonth = (newMonth, currentMonth) => {
    if (newMonth !== undefined && this.removeLeadingZeroes(newMonth) <= 12) {
      return this.removeLeadingZeroes(newMonth).padStart(2, "0");
    }

    return currentMonth.padStart(2, "0");
  }

  formatYear = (newYear, currentYear) => {
    if (newYear !== undefined && this.removeLeadingZeroes(newYear) <= 3000) {
      return this.removeLeadingZeroes(newYear).padStart(4, "0");
    }

    return currentYear.padStart(4, "0");
  }

  moveInputFocus = (dateChangeObject) => {
    if (dateChangeObject.day && dateChangeObject.day.length > 2)
    {
      this.monthInputRef.current.focus()
    }

    if (dateChangeObject.month && dateChangeObject.month.length > 2)
    {
      this.yearInputRef.current.focus()
    }
  }

  onDateChanged = (dateChangeObject) => {
    this.moveInputFocus(dateChangeObject)

    let parsedDate = this.parseDate(this.props.value);
    let newDate = this.composeDate({
      day: this.formatDay(dateChangeObject.day, parsedDate.day),
      month: this.formatMonth(dateChangeObject.month, parsedDate.month),
      year: this.formatYear(dateChangeObject.year, parsedDate.year)
    });

    if(newDate == "0000-00-00") {
      this.props.onChange("");
    } else {
      this.props.onChange(newDate);
    }
  }

  isInputDisabled = () => {
    if (
      this.props.disabled ||
      (this.props.schema && this.props.schema.readonly)
    ) {
      return true;
    }

    return false;
  }

  render = () => (
    <div className="form-group BritishDate">
      <input
        type="text"
        ref={this.dayInputRef}
        className="form-control day"
        data-test="date-day"
        placeholder="dd"
        value={this.parseDate(this.props.value).day}
        onChange={ (e) => {this.onDateChanged({day: e.target.value})}}
        readOnly={this.isInputDisabled()}
      />
      <input
        type="text"
        ref={this.monthInputRef}
        className="form-control month"
        data-test="date-month"
        placeholder="mm"
        value={this.parseDate(this.props.value).month}
        onChange={ (e) => {this.onDateChanged({month: e.target.value})}}
        readOnly={this.isInputDisabled()}
      />
      <input
        type="text"
        ref={this.yearInputRef}
        className="form-control year"
        data-test="date-year"
        placeholder="yyyy"
        value={this.parseDate(this.props.value).year}
        onChange={ (e) => {this.onDateChanged({year: e.target.value})}}
        readOnly={this.isInputDisabled()}
      />
    </div>
  )
}
