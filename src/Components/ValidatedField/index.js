import React from "react";

export default class ValidatedField extends React.Component {
  constructor(props) {
    super(props);
  }

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

  render = () => (
    <div className={`form-group ${ this.getHasError() }`}>
      <this.props.registry.fields.SchemaField
        formData={this.props.formData}
        schema={this.props.schema}
        onChange={this.onChange}
        uiSchema={this.removeCalculationBeforeRender(this.props.uiSchema)}
        registry={this.props.registry}
      />
    </div>
  );
}
