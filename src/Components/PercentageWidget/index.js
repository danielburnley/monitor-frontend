import React from "react";
import "./style.css";

export default class PercentageWidget extends React.Component {


  cleanNonnumeric(string) {
    return string.replace(/[^0-9]/g, "");
  }

  cleanLeadingZeroes(string) {
    return string.replace(/^0*(?!$)/, "");
  }

  validatePercentage(string) {
    return this.cleanLeadingZeroes(this.cleanNonnumeric(string));
  }

  handleChange = (e) => {
    let {target} = e;
    let {selectionStart, selectionEnd} = target;
    let value = this.validatePercentage(target.value)
    
    this.setState({value} , () => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionEnd;
    });
    this.props.onChange(value);
  }

  isInputDisabled() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:disabled"];
    } else {
      return this.props.disabled
    }
  }

  render() {
    return (
      <div className="input-group" data-test="percentage-field">
        <input
          className="form-control"
          type="text"
          value={this.props.value}
          disabled={this.isInputDisabled()}
          onChange={this.handleChange} 
        />
        <div className={`input-group-addon ${this.isInputDisabled() ? "readonly-percentage": ""}`}>%</div>
      </div>
    );
  }
};
