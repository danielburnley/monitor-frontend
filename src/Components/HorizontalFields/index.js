import React from "react";
import "./style.css";

export default class HorizontalFields extends React.Component {
  onFieldChange = (name, value) => {
    let newData = JSON.parse(JSON.stringify(this.props.formData || {}));
    newData[name] = value;

    this.props.onChange(newData);
  };

  renderItem = (key, value) => {
    return (
      <this.props.registry.fields.SchemaField
        id={key}
        schema={value}
        uiSchema={this.props.uiSchema && this.props.uiSchema[key]}
        data-test={`${key}-input`}
        formData={this.props.formData && this.props.formData[key]}
        registry={this.props.registry}
        onChange={e => this.onFieldChange(key, e)}
      />
    );
  };

  renderItems = () =>
    Object.entries(this.props.schema.properties).map(([key, value]) => {
      if (!value.hidden) {
        return (
          <div key={key} data-test="form-field" className="horizontal-item">
            {this.renderItem(key, value)}
          </div>
        );
      }
      return null;
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
