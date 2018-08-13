import React from 'react';
import Form from 'react-jsonschema-form';
import Subform from '../Subform';

export default class ProjectForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {formData: {}}
  }

  subformOnChange = (formDataKey, formData) => {
    this.state.formData[formDataKey] = formData
  }

  render() {
    return (<div>
        {
            Object.keys(this.props.schema.properties).map(property =>
              <Subform id={property} onChange={(formData) => {this.subformOnChange(property, formData)}} key={property} schema={this.props.schema.properties[property]}/>)
        }
      </div>)
  }
}
