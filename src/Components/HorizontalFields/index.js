import React from "react";
import "./style.css";

export default class HorizontalFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ...props.formData };
  }

  onChange = (name, value) => {
    this.setState({ [name]: value }, () => this.props.onChange(this.state));
  };

  renderItems = () =>
    Object.entries(this.props.schema.properties).map(([k, v]) => {
      return (
        <div
          key={k}
          className="form-group col-sm-3 col-md-3"
          data-test="form-field"
        >
          <label htmlFor={k} data-test={`${k}-label`}>
            {v.title}
          </label>
          <input
            id={k}
            disabled={v.readonly}
            className="form-control"
            data-test={`${k}-input`}
            value={this.state[k]}
            onChange={e => this.onChange(k, e.target.value)}
          />
        </div>
      );
    });

  render() {
    return (
      <div className="horizontal-row">
        <h4 className="horizontal-title" data-test="form-title">
          {this.props.schema.title}
        </h4>
        <div className="horizontal-items">{this.renderItems()}</div>
      </div>
    );
  }
}
