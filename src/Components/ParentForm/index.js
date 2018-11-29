import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";
import ArraySubform from "../ArraySubform";
import Sidebar from "../Sidebar";
import HorizontalFields from "../HorizontalFields";
import VarianceField from "../VarianceField";
import MilestoneField from "../MilestoneField";
import PercentageField from "../PercentageField";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";
import RiskField from "../RiskField";
import BaselineData from "../BaselineData";
import PeriodsField from "../PeriodsField";
import NumberedArrayField from "../NumberedArrayField";
import QuarterlyBreakdown from "../QuarterlyBreakdown";
import CurrencyWidget from "../CurrencyWidget";
import "./style.css";

export default class ParentForm extends React.Component {
  constructor(props) {
    super(props);

    let first_property = this.getFirstProperty(props.schema);

    this.state = {
      userRole: this.props.getRole.execute().role,
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
    let newFormData = { ...this.state.formData };
    newFormData[this.state.selected] = formData;
    this.setState({ formData: newFormData }, () =>
      this.props.onChange({ formData: this.state.formData })
    );
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

  renderTab = ([property, value]) => {
    if (value.laHidden && this.state.userRole === "Local Authority") {
      return null;
    } else {
      return (
      <li
        key={property}
        role="presentation"
        className={
          "nav-item " +
          (property === this.state.selected ? "active" : "inactive")
        }
        data-test={`${property}_property`}
      >
      <a role="button" id={property} onClick={this.viewSelectorOnChange}>
        {value.title}
      </a>
    </li>)
    }
  }

  renderNavigationTabs() {
    return Object.entries(this.props.schema.properties).map(this.renderTab);
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema.properties[this.state.selected],
      this.state.formData[this.state.selected]
    ).items;

    return (
      <Sidebar
        items={items}
        selectedFormItemIndex={this.state.selectedFormItemIndex}
        selectedFormSection={this.state.selectedFormSection}
        onItemClick={(section, index) => {
          let jump_to_id;
          if (this.selectedSchema().type === "object") {
            jump_to_id = `root_${section}__title`;
          } else {
            jump_to_id = "subform";
            this.setState({
              selectedFormSection: section,
              selectedFormItemIndex: index
            });
          }
          let documentObject = this.props.documentGateway.getDocument();
          if (documentObject.getElementById(jump_to_id)) {
            documentObject.getElementById(jump_to_id).scrollIntoView();
          }
        }}
      />
    );
  }

  selectedSchema() {
    return this.props.schema.properties[this.state.selected];
  }

  selectedUiSchema() {
    if (!this.props.uiSchema) {
      return {};
    }

    if (this.selectedSchema().type === "array") {
      return this.props.uiSchema[this.state.selected]
        ? this.props.uiSchema[this.state.selected].items
        : {};
    } else {
      return this.props.uiSchema[this.state.selected]
        ? this.props.uiSchema[this.state.selected]
        : {};
    }
  }

  renderSubform() {
    const fields = {
      horizontal: HorizontalFields,
      variance: VarianceField,
      risk: RiskField,
      periods: PeriodsField,
      base: BaselineData,
      milestone: MilestoneField,
      numbered: NumberedArrayField,
      quarterly: QuarterlyBreakdown
    };

    const widgets = {
      currency: CurrencyWidget,
      percentage: PercentageField
    };

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
            widgets={widgets}
            selectedFormSection={this.state.selectedFormSection}
            selectedIndex={this.state.selectedFormItemIndex}
            schema={this.props.schema.properties[this.state.selected]}
            uiSchema={this.selectedUiSchema()}
          />
        </div>
      );
    } else {
      return (
        <div className="col-md-10 subform">
          <Form
            data-test={`${this.state.selected}_subform`}
            onChange={({ formData }) => {
              this.subformOnChange(formData);
            }}
            formData={this.state.formData[this.state.selected]}
            widgets={widgets}
            fields={fields}
            schema={this.props.schema.properties[this.state.selected]}
            uiSchema={this.selectedUiSchema()}
            noValidate={true}
          >
            <div />
          </Form>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ParentForm" data-test="parent-form" role="navigation">
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
