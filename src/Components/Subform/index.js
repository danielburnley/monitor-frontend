import React from 'react';
import Form from 'react-jsonschema-form';

export default class Subform extends React.Component {
  render() {
    return <Form
      children={<div/>}
      formData = {this.props.formData}
      onChange = {({formData}) => this.props.onChange(formData)}
      schema = {this.props.schema}/>;
  }
}
