import React from "react";
import Form from "react-jsonschema-form";
import Sidebar from "../Sidebar";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";

export default class ParentForm extends React.Component {
  constructor(props) {
    super(props);
    this.first_property = Object.keys(this.props.schema.properties)[0];
    this.state = {
      uiSchema: this.props.uiSchema ? this.props.uiSchema : {},
      formData: this.props.formData ? this.props.formData : {},
      selected: this.first_property
    };
  }

  subformOnChange = formData => {
    this.state.formData[this.state.selected] = formData;
    this.props.onChange({ formData: this.state.formData });
  };

  viewSelectorOnChange = changeEvent => {
    this.setState({ selected: changeEvent.target.id });
  };

  renderNavigationTabs() {
    return Object.keys(this.props.schema.properties).map(property => (
      <li
        key={property}
        role="presentation"
        className={property === this.state.selected ? "active" : "inactive"}
      >
        <a role="button" id={property} onClick={this.viewSelectorOnChange}>
          {this.props.schema.properties[property].title}
        </a>
      </li>
    ));
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema.properties[this.state.selected],
      this.state.formData[this.state.selected]
    ).items;
    return <Sidebar items={items} />;
  }

  renderSelectedForm() {
    return (
      <div data-test={`${this.state.selected}_subform`} className="subform">
        <Form
          onChange={({ formData }) => {
            this.subformOnChange(formData);
          }}
          formData={this.state.formData[this.state.selected]}
          schema={this.props.schema.properties[this.state.selected]}
          uiSchema={
            this.props.uiSchema ? this.props.uiSchema[this.state.selected] : {}
          }
        >
          <div />
        </Form>
      </div>
    );
  }

  render() {
    return (
      <div className="ParentForm" role="navigation">
        <ul className="nav nav-tabs">{this.renderNavigationTabs()}</ul>
        <div>
          <div className="col-md-2">{this.renderSidebar()}</div>
          <div className="col-md-10">
            {this.state.selected && this.renderSelectedForm()}
          </div>
        </div>
      </div>
    );
  }
}
