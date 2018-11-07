import React from "react";
import Form from "react-jsonschema-form";
import "./style.css";

export default class ProjectForm extends React.Component {
  render() {
    return (
      <Form
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        formData={this.props.data}
        noValidate={true}
      >
        <div />
      </Form>
    );
  }
}
