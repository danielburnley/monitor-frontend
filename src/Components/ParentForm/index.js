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
    this.setState({selected: changeEvent.target.id})
  }

  render() {
    return (<div className="ParentForm" role="navigation">
          <ul className="nav nav-tabs">
          {
            Object.keys(this.props.schema.properties).map(property =>
                  <li key={property}
                     role="presentation"
                    className={property===this.state.selected ? "active":"inactive"}>
                    <a role="button"
                      id={property}
                      onClick={this.viewSelectorOnChange}>
                      {this.props.schema.properties[property].title}
                    </a>
                  </li>)
          }
          </ul>
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
