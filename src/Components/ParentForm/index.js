import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";
import ArraySubform from "../ArraySubform";
import Sidebar from "../Sidebar";
import HorizontalFields from "../HorizontalFields";
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
    return <Sidebar items={items} onItemClick={() => {}} />;
  }

  selectedSchema() {
    return this.props.schema.properties[this.state.selected];
  }

  renderSubform() {
    if (this.selectedSchema().type === "array") {
      const fields = { horizontal: HorizontalFields };

      return (
        <ArraySubform
          data-test={`${this.state.selected}_subform`}
          key={`${this.state.selected}_subform`}
          onChange={formData => {
            this.subformOnChange(formData);
          }}
          data={this.state.formData[this.state.selected]}
          fields={fields}
          schema={this.props.schema.properties[this.state.selected]}
          uiSchema={
            this.props.uiSchema
              ? this.props.uiSchema[this.state.selected].items
              : {}
          }
        />
      );
    }
    return (
      <div>
        <div className="col-md-2">{this.renderSidebar()}</div>
        <div className="col-md-10">
          {this.state.selected && this.renderSelectedForm()}
        </div>
      </div>
    );
  }

  renderSelectedForm() {
    const fields = { horizontal: HorizontalFields };

    return (
      <div data-test={`${this.state.selected}_subform`} className="subform">
        <Form
          onChange={({ formData }) => {
            this.subformOnChange(formData);
          }}
          formData={this.state.formData[this.state.selected]}
          fields={fields}
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
        {this.renderSubform()}
      </div>
    );
  }
}

ParentForm.propTypes = {
  schema: PropTypes.object.isRequired,
  formData: PropTypes.object
};
