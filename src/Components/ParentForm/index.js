import React from 'react';
import Form from 'react-jsonschema-form';
import Subform from '../Subform';

export default class ProjectForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.first_property = Object.keys(this.props.schema.properties)[0];
    this.state = {
      formData: {},
      selected: this.first_property
    }
  }

  subformOnChange = (formDataKey, formData) => {
    this.state.formData[formDataKey] = formData
  }

  viewSelectorOnChange = (changeEvent) => {
    if (changeEvent.target.value == 'on') {
      this.setState({selected: changeEvent.target.id})
    }
  }

  //We need a way to connect the input to the subforms cleanly
  render() {
    return (<div>
        <form>
          {
            Object.keys(this.props.schema.properties).map(property =>
              <div>
                <label key={property}>
                  <input checked={
                    property===this.state.selected
                  } name="view_selector" onChange={this.viewSelectorOnChange} type="radio" id={property}/>
                  {this.props.schema.properties[property].title}
                </label><br/>
              </div>)
          }
        </form>
        <div>
        {
            this.state.selected &&
            <Subform
              onChange={(formData) => {this.subformOnChange(this.state.selected, formData)}}
              id={this.state.selected+"_subform"}
              schema={this.props.schema.properties[this.state.selected]}></Subform>
        }
        </div>
      </div>)
  }
}
