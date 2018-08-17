import React from 'react';
import Form from 'react-jsonschema-form';
import Subform from '../Subform';

export default class ProjectForm extends React.Component {
  constructor(props)
  {
    super(props);
    this.first_property = Object.keys(this.props.schema.properties)[0];
    this.state = {
      uiSchema: this.props.uiSchema ? this.props.uiSchema : {},
      formData: this.props.formData ? this.props.formData : {},
      selected: this.first_property
    }
  }

  subformOnChange = (formData) => {
    this.state.formData[this.state.selected] = formData;
    this.props.onChange({formData: this.state.formData});
  }

  viewSelectorOnChange = (changeEvent) => {
    if (changeEvent.target.value == 'on') {
      this.setState({selected: changeEvent.target.id})
    }
  }

  //We need a way to connect the input to the subforms cleanly
  render() {
    return (<div className="ParentForm">
        <form>
          {
            Object.keys(this.props.schema.properties).map(property =>
              <div key={property}>
                <label>
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
              className="Subform"
              onChange={(formData) => {this.subformOnChange(formData)}}
              id={this.state.selected+"_subform"}
              formData={this.state.formData[this.state.selected]}
              schema={this.props.schema.properties[this.state.selected]}
              uiSchema={this.props.uiSchema? this.props.uiSchema[this.state.selected] : {}}></Subform>
        }
        </div>
      </div>)
  }
}
