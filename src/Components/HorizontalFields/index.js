import React from "react";
import "./style.css";

export default class HorizontalFields extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.formData || []
    };
  }

  onFieldChange = (name, value) => {
    let newData = this.state.data;
    newData[name] = value;

    this.props.onChange(newData);

    this.setState({ data: newData });
  };

  renderItem = (k, v) => {
    return (
      <this.props.registry.fields.SchemaField
        id={k}
        schema={v}
        uiSchema={this.props.uiSchema && this.props.uiSchema[k]}
        data-test={`${k}-input`}
        formData={this.state.data[k]}
        registry={this.props.registry}
        onChange={e => this.onFieldChange(k, e)}
      />
    );
  };

  renderItems = () =>
    Object.entries(this.props.schema.properties).map(([k, v]) => {
      if (!v.hidden) {
        return (
          <div key={k} data-test="form-field" className="horizontal-item">
            {this.renderItem(k, v)}
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
