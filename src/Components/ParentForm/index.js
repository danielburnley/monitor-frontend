import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";
import ArraySubform from "../ArraySubform";
import Sidebar from "../Sidebar";
import HorizontalFields from "../HorizontalFields";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";
import "./style.css";

export default class ParentForm extends React.Component {
  constructor(props) {
    super(props);

    let first_property = this.getFirstProperty(props.schema);

    this.state = {
      uiSchema: this.props.uiSchema ? this.props.uiSchema : {},
      formData: this.props.formData ? this.props.formData : {},
      selected: first_property,
      selectedFormSection: this.getInitialFormSection(
        props.schema.properties[first_property]
      ),
      selectedFormItemIndex: 0
    };
  }

  getFirstProperty(schema) {
    return Object.keys(schema.properties)[0];
  }

  getInitialFormSection(schema) {
    if (schema.type === "array") {
      return Object.keys(schema.items.properties)[0];
    } else {
      return Object.keys(schema.properties)[0];
    }
  }

  subformOnChange = formData => {
    this.state.formData[this.state.selected] = formData;
    this.props.onChange({ formData: this.state.formData });
  };

  viewSelectorOnChange = changeEvent => {
    let selectedSection = changeEvent.target.id;
    this.setState({
      selected: selectedSection,
      selectedFormSection: this.getInitialFormSection(
        this.props.schema.properties[selectedSection]
      ),
      selectedFormItemIndex: 0
    });
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

    return (
      <Sidebar
        items={items}
        onItemClick={(section, index) => {
          this.setState({
            selectedFormSection: section,
            selectedFormItemIndex: index
          });
        }}
      />
    );
  }

  selectedSchema() {
    return this.props.schema.properties[this.state.selected];
  }

  renderSubform() {
    const fields = { horizontal: HorizontalFields };
    if (this.selectedSchema().type === "array") {
      return (
        <div className="col-md-10">
          <ArraySubform
            data-test={`${this.state.selected}_subform`}
            key={`${this.state.selected}_subform`}
            onChange={formData => {
              this.subformOnChange(formData);
            }}
            data={this.state.formData[this.state.selected]}
            fields={fields}
            selectedFormSection={this.state.selectedFormSection}
            selectedIndex={this.state.selectedFormItemIndex}
            schema={this.props.schema.properties[this.state.selected]}
            uiSchema={
              this.props.uiSchema
                ? this.props.uiSchema[this.state.selected].items
                : {}
            }
          />
        </div>
      );
    } else {
      return (
        <div data-test={`${this.state.selected}_subform`} className="col-md-10 subform">
          <Form
            onChange={({ formData }) => {
              this.subformOnChange(formData);
            }}
            formData={this.state.formData[this.state.selected]}
            fields={fields}
            schema={this.props.schema.properties[this.state.selected]}
            uiSchema={
              this.props.uiSchema
                ? this.props.uiSchema[this.state.selected]
                : {}
            }
          >
            <div />
          </Form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ParentForm" role="navigation">
        <div className="subform-selectors">
          <ul className="col-md-offset-2 form-selection nav nav-tabs">
            {this.renderNavigationTabs()}
          </ul>
        </div>
        <div className="parent-form-body">
          <div className="col-md-2 sidebar-column">{this.renderSidebar()}</div>
          <div className="col-md-10">
            {this.renderSubform()}
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

ParentForm.propTypes = {
  schema: PropTypes.object.isRequired,
  formData: PropTypes.object
};
