import React from "react";
import "./style.css"

export default class CurrencyWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.formatNumber(''+this.props.value),
      currency: this.props.currency ? this.props.currency : "£",
      key: this.props.key
    };
  }

  removeInvalidCharacters = (value) =>
    value.replace(/[^0-9\.]/g, "");

  clampValue = (value) => {
    if (this.props.schema && Number(value) > Number(this.props.schema.maximum)) {
      return this.props.schema.maximum;
    }
    return value;
  }

  validateString = (value) =>
    this.clampValue(this.removeInvalidCharacters(value));

  insertCommas = (value) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, (digits) => digits+",");

  formatNumber = (value) =>
    this.insertCommas(this.validateString(value));

  onFieldChange(e) {
    let value = this.formatNumber(e.target.value);
    this.setState({value});
    this.props.onChange(value);
  }

  isInputDisabled() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:disabled"];
    } else {
      return this.props.disabled
    }
  }

  isHidden() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:widget"] === "hidden";
    } else {
      return this.props.hidden
    }
  }


  render() {
    return (
      <div className="formGroup" hidden={this.isHidden()}>
        <div className="input-group">
          <span
            className={`input-group-addon ${this.isInputDisabled() ? "readonly-currency": ""}`}
            data-test="currency-symbol"
          >
            {this.state.currency}
          </span>
          <input
            className="form-control input"
            data-test="currency-input"
            value={this.state.value}
            onChange={e => this.onFieldChange(e)}
            disabled={this.isInputDisabled()}
            id="moneyLabel"
          />
        </div>
      </div>
    );
  }
}
