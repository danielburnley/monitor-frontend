import React from "react";
import "./style.css"

export default class CurrencyField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.formData,
      currency: this.props.currency ? this.props.currency : "£"
    };
  }

  onFieldChange(e) {
    this.setState({ data: e.target.value }, () => {
      this.props.onChange(this.state.data);
    });
  }

  isInputDisabled() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:disabled"];
    }
  }

  isHidden() {
    if (this.props.uiSchema) {
      return this.props.uiSchema["ui:widget"] === "hidden";
    }
  }


  render() {
    return (
      <div className="formGroup" hidden={this.isHidden()}>
        <label
          htmlFor="moneyLabel"
          data-test="currency-label"
        >
          {this.props.schema.title}
        </label>
        <div className="input-group">
          <span
            className={`input-group-addon ${this.isInputDisabled() ? "readonly-currency": ""}`}
            data-test="currency-symbol"
          >
            {this.state.currency}
          </span>
          <input
            className="form-control"
            data-test="currency-input"
            value={this.state.data}
            onChange={e => this.onFieldChange(e)}
            disabled={this.isInputDisabled()}
            id="moneyLabel"
          />
        </div>
      </div>
    );
  }
}
