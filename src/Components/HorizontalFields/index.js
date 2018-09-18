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

  requiredProperty(key) {
    if(!this.props.schema.required) {
      return false
    }
    return this.props.schema.required.indexOf(key) >= 0
  }

  renderLabel(schemaKey, property) {
    if (this.requiredProperty(schemaKey)) {
      return (
        <label htmlFor={schemaKey} data-test={`${schemaKey}-label`}>
          {property.title} *
        </label>
      );
    }
    
    return (
      <label htmlFor={schemaKey} data-test={`${schemaKey}-label`}>
        {property.title}
      </label>
    );
  }

  renderItems = () =>
    Object.entries(this.props.schema.properties).map(([k, v]) => {
      if (!v.hidden) {
        return (
          <div key={k} data-test="form-field" className="horizontal-item">
            {this.renderLabel(k, v)}
            <input
              id={k}
              disabled={v.readonly}
              data-test={`${k}-input`}
              value={this.state[k]}
              onChange={e => this.onChange(k, e.target.value)}
            />
          </div>
        );
      }
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
