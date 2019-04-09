import React from "react";
import "./style.css"

export default class CurrencyWidget extends React.Component {
  removeInvalidCharacters = (value) =>
    value.replace(/[^0-9.-]/g, "");

  removeLeadingZeroes = (value) =>
    value.replace(/^0*(?=0$)|^0+/,"");

  clampValue = (value) => {
    if (this.props.schema && Number(value) > Number(this.props.schema.currencyMaximum)) {
      return this.props.schema.currencyMaximum;
    }
    return value;
  }

  formatCurrencyString = (value) =>
    this.removeLeadingZeroes(this.removeInvalidCharacters(value));

  validateString = (value) =>
    this.clampValue(this.formatCurrencyString(value));

  insertCommas = (value) =>
    value.replace(/\B(?=(\d{3})+(?!\d))/g, (digits) => digits+",");

  formatNumber = (value) =>
    this.insertCommas(this.validateString(value));

  countMatches = (str, re) =>
    ((str || '').match(re) || []).length;

  commaCountUntilPosition = (value, endIndex) =>
    this.countMatches(value.substr(0, endIndex), /,/g);

  commaCountDifference = (newValue, oldValue, endIndex) =>
    this.commaCountUntilPosition(newValue, endIndex) - this.commaCountUntilPosition(oldValue, endIndex);

  onFieldChange(e) {
    let {target} = e;
    let {selectionStart, selectionEnd} = target;
    let value = this.formatNumber(e.target.value);

    // This functionality is untested because progressive text entry is not part
    // of Enzyme, please implement a test if this changes
    let cursorAdjustment = this.commaCountDifference(value, this.formatNumber(''+this.props.value), selectionStart);

    this.setState({value}, () => {
        target.selectionStart = selectionStart + cursorAdjustment;
        target.selectionEnd = selectionEnd + cursorAdjustment;
    });
    this.props.onChange(value);
  }

  isInputDisabled() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:disabled"];
    } else {
      return this.props.disabled;
    }
  }

  isHidden() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:widget"] === "hidden";
    } else {
      return this.props.hidden;
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
            {this.props.currency ? this.props.currency : "£"}
          </span>
          <input
            className="form-control input"
            data-test="currency-input"
            value={this.formatNumber(''+this.props.value)}
            onChange={e => this.onFieldChange(e)}
            disabled={this.isInputDisabled()}
            type="text"
            id="moneyLabel"
          />
        </div>
      </div>
    );
  }
}
