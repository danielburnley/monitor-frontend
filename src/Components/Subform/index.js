import React from 'react';
import Form from 'react-jsonschema-form';

export default class Subform extends React.Component {
  render() {
    return <Form
      onChange = {({formData}) => this.props.onChange(formData)}
      schema = {this.props.schema}/>;
  }
}
