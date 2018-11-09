import React from "react";
import "./style.css"

export default class CurrencyWidget extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value || '',
      currency: this.props.currency ? this.props.currency : "£",
      key: this.props.key
    };
  }

  onFieldChange(e) {
    this.setState({value: e.target.value});
    this.props.onChange(e.target.value);
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
