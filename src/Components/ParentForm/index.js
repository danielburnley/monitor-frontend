import React from "react";
import PropTypes from "prop-types";
import Form from "react-jsonschema-form";
import ArraySubform from "../ArraySubform";
import Sidebar from "../Sidebar";
import HorizontalFields from "../HorizontalFields";
import VarianceField from "../VarianceField";
import MilestoneField from "../MilestoneField";
import CalculatedField from "../CalculatedField";
import PickInfrastructureWidget from "../PickInfrastructureWidget";
import ValidatedField from "../ValidatedField";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";
import RiskField from "../RiskField";
import StaticData from "../StaticData";
import PeriodsField from "../PeriodsField";
import NumberedArrayField from "../NumberedArrayField";
import QuarterlyBreakdown from "../QuarterlyBreakdown";
import CurrencyWidget from "../CurrencyWidget";
import PercentageWidget from "../PercentageWidget";
import BritishDate from "../BritishDate";
import WorkflowViewer from "../WorkflowViewer";
import "./style.css";
import UploadFileField from "../UploadFileField";

export default class ParentForm extends React.Component {
  constructor(props) {
    super(props);

    let first_tab = this.getFirstProperty(props.schema);

    this.state = {
      userRole: this.props.getRole.execute().role,
      uiSchema: this.props.uiSchema ? this.props.uiSchema : {},
      formData: this.props.formData ? this.props.formData : {},
      selected: first_tab,
      selectedFormSection: this.getInitialFormSection(props.schema, first_tab),
      selectedFormItemIndex: 0
    };
  }

  getFirstProperty(schema) {
    if (schema.workflow)
    {
      return "workflow";
    } else {
      return Object.keys(schema.properties)[0];
    }
  }

  getInitialFormSection(schema, selected_tab) {
    if (selected_tab === "workflow")
    {
      return null;
    } else if (schema.properties[selected_tab].type === "array") {
      return Object.keys(schema.properties[selected_tab].items.properties)[0];
    } else {
      return Object.keys(schema.properties[selected_tab].properties)[0];
    }
  }

  getChild(path, key) {
    return path && path[key];
  }

  setChild(toBurrow, path, nextItemKey, nextIndex) {
    if (toBurrow && toBurrow[nextItemKey]) return toBurrow[nextItemKey];
    if (Number.isInteger(path[nextIndex])) return (toBurrow[nextItemKey] = []);
    if (Array.isArray(toBurrow)) {
      toBurrow.push({});
      return toBurrow[nextItemKey];
    }
    return (toBurrow[nextItemKey] = {});
  }

  shareDataBetweenTabs = formData => {
    if (!this.props.schema.sharedData) return null;

    let sharedDataPaths = this.createPathsInArrays(
      this.props.schema.sharedData,
      formData
    );

    sharedDataPaths.forEach(path => {
      let value = this.getObject(formData, path.from);
      let pathToSet = this.setPath(formData, path.to);

      pathToSet[path.to[path.to.length - 1]] = value;
    });
  }

  createPathsInArrays(sharedData, formData) {
    let allDataPaths = sharedData.map(value => {
      if (!value.from.includes("#") && !value.to.includes("#")) return value;

      let arrayHolder = value.from.includes("#") ? value.from : value.to;
      let arrayData = this.getObject(
        formData,
        arrayHolder.slice(0, arrayHolder.indexOf("#"))
      );

      let newPaths = [];
      for (let i = 0; i < arrayData.length; i++) {
        let newFromPath = value.from.slice(0, value.from.length);
        if (value.from.includes("#")) newFromPath[value.from.indexOf("#")] = i;

        let newToPath = value.to.slice(0, value.to.length);
        newToPath[value.to.indexOf("#")] = i;

        newPaths.push({
          from: newFromPath,
          to: newToPath
        });
      }
      return newPaths;
    });

    return allDataPaths.flat();
  }

  getObject = (formData, path) => {
    return path.reduce(
      (accumulator, fromPath) => this.getChild(accumulator, fromPath),
      formData
    );
  };

  setPath = (formData, path) => {
    return path
      .slice(0, path.length - 1)
      .reduce(
        (accumulator, key, index) =>
          this.setChild(accumulator, path, key, index + 1),
        formData
      );
  };

  subformOnChange = formData => {
    let newFormData = { ...this.state.formData };
    newFormData[this.state.selected] = formData;
    this.shareDataBetweenTabs(newFormData);

    this.setState({ formData: newFormData }, () =>
      this.props.onChange({ formData: this.state.formData })
    );
  };

  changeSelection(newSection) {
    this.setState({
      selected: newSection,
      selectedFormSection: this.getInitialFormSection(
        this.props.schema, newSection
      ),
      selectedFormItemIndex: 0
    });
  }

  viewSelectorOnChange = changeEvent => {
    let selectedSection = changeEvent.target.id;
    this.changeSelection(selectedSection)
  };

  renderTab = (tab, value) => {
    return (
      <li
        key={tab}
        role="presentation"
        className={
          "nav-item " +
          (tab === this.state.selected ? "active" : "inactive")
        }
        data-test={`${tab}_tab`}
      >
        <a data-test={`${tab}_tab_link`} role="button" id={tab} onClick={this.viewSelectorOnChange}>
          {value.title}
        </a>
      </li>
    );
  }

  renderPropertyTab = ([property, value]) => {
    if (value.hidden || (value.laHidden && this.state.userRole === "Local Authority")) {
      return null;
    } else {
      return this.renderTab(property, value);
    }
  };

  renderNavigationTabs() {
    return Object.entries(this.props.schema.properties).map(this.renderPropertyTab);
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema.properties[this.state.selected],
      this.state.formData[this.state.selected]
    ).items;
    return (
      <Sidebar
        userRole={this.state.userRole}
        addable={this.selectedSchema().addable}
        section={this.state.selected}
        linkedArray={this.selectedSchema().linkedArray}
        formData={this.state.formData}
        // onChange={data => this.subformOnChange(data)}
        onChange={data =>
          this.setState({ formData: data }, () =>
            this.props.onChange({ formData: this.state.formData })
          )
        }
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

  resetSelectedItem(numberOfItems) {
    this.setState({
      selectedFormSection: this.getInitialFormSection(
        this.props.schema.properties[this.state.selected]
      ),
      selectedFormItemIndex: numberOfItems-1
    });
  }

  renderSubform() {
    const fields = {
      base: StaticData,
      calculated: CalculatedField,
      horizontal: HorizontalFields,
      milestone: MilestoneField,
      numbered: NumberedArrayField,
      periods: PeriodsField,
      quarterly: QuarterlyBreakdown,
      risk: RiskField,
      uploadFile: UploadFileField,
      validated: ValidatedField,
      variance: VarianceField
    };

    const widgets = {
      britishDate: BritishDate,
      currency: CurrencyWidget,
      percentage: PercentageWidget,
      pickInfrastructure: PickInfrastructureWidget
    };

    if (this.selectedSchema().type === "array") {
      return (
        <div className="col-md-10">
          <ArraySubform
            formContext={this.props.formContext}
            data-test={`${this.state.selected}_subform`}
            key={`${this.state.selected}_subform`}
            onChange={formData => {
              this.subformOnChange(formData);
            }}
            resetSelectedItem={(numberOfItems) => {
              this.resetSelectedItem(numberOfItems);
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
            formContext={this.props.formContext}
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

  renderForm = () =>
    <div className="parent-form-body">
      <div className="col-md-2 sidebar-column">{this.renderSidebar()}</div>
      <div className="col-md-10">
        {this.renderSubform()}
        {this.props.children}
      </div>
    </div>

  renderWorkflow = () =>
    <WorkflowViewer workflow={this.props.schema.workflow} onClick={(selection) => {this.changeSelection(selection)}}/>

  render() {
    return (
      <div className="ParentForm" data-test="parent-form" role="navigation">
        <div className="subform-selectors">
          <ul className="col-md-offset-2 form-selection nav nav-tabs">
            {this.renderTab("workflow", {title: "Getting started"})}
            {this.renderNavigationTabs()}
          </ul>
        </div>

        {
            this.state.selected === "workflow"?
              this.renderWorkflow():this.renderForm()
        }
      </div>
    );
  }
}

ParentForm.propTypes = {
  schema: PropTypes.object.isRequired,
  formData: PropTypes.object
};
