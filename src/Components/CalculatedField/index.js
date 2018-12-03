import React from 'react';

export default class CalculatedField extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formData: this.props.formData
    }

    let formData = this.state.formData;
    eval(this.props.schema.calculation);
    this.state.formData = formData;
  }

  onChange = (formData) => {
    eval(this.props.schema.calculation);
    this.setState({formData});
    this.props.onChange(formData);
  }

  render = () => (
    <this.props.registry.fields.SchemaField
      formData = { this.state.formData }
      schema = { this.props.schema }
      onChange = { this.onChange }
      uiSchema = { this.props.uiSchema }
      registry = { this.props.registry }
      />
  )
}
