import React from "react";
import Form from "react-jsonschema-form";

export default class Subform extends React.Component {
  render() {
    return (
      <div data-test="subform">
        <Form
          children={<div />}
          formData={this.props.formData}
          onChange={({ formData }) => this.props.onChange(formData)}
          uiSchema={this.props.uiSchema}
          schema={this.props.schema}
        />
      </div>
    );
  }
}
