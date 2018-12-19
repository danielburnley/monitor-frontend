import React from "react";

export default class ValidatedField extends React.Component {
  onChange = formData => {
    this.props.onChange(formData);
  };

  removeCalculationBeforeRender = uiSchema => {
    if (uiSchema) {
      uiSchema["ui:field"] = "";
    }
    return uiSchema;
  };

  getHasError = () => {
    if (this.props.formData && !this.props.formData._valid)
    {
      return "has-error"
    }

    return "";
  }

  getErrorText = () => {
    if (this.props.formData && !this.props.formData._valid) {
      return <span className="help-block">{this.props.schema.invalidText}</span>;
    }
  }

  render = () => (
    <div className={`form-group ${ this.getHasError() }`}>
      <this.props.registry.fields.SchemaField
        formData={this.props.formData}
        schema={this.props.schema}
        onChange={this.onChange}
        uiSchema={this.removeCalculationBeforeRender(this.props.uiSchema)}
        registry={this.props.registry}
      />
      {this.getErrorText()}
    </div>
  );
}
