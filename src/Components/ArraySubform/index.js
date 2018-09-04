import React from "react";
import Form from "react-jsonschema-form";
import Sidebar from "../Sidebar";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";
import './style.css'

export default class ArraySubForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: props.data,
      selectedFormSection: Object.keys(props.schema.items.properties)[0],
      selectedIndex: 0
    };
  }

  renderSidebar() {
    let items = new GenerateSidebarItems().execute(
      this.props.schema,
      this.props.data
    ).items;

    return (
      <Sidebar
        items={items}
        onItemClick={(section, index) => {
          this.setState({ selectedFormSection: section, selectedIndex: index });
        }}
      />
    );
  }

  onFormChange = formData => {
    let updatedData = [...this.state.formData];
    updatedData[this.state.selectedIndex][
      this.state.selectedFormSection
    ] = formData;

    this.setState({ formData: updatedData }, () => {
      this.props.onChange(updatedData);
    });
  };

  render() {
    return (
      <div>
        <div className="col-md-3 subform-sidebar">{this.renderSidebar()}</div>
        <div className="col-md-9 subform">
          <Form
            data-test={`${this.state.selectedFormSection}-form`}
            uiSchema={this.props.uiSchema[this.state.selectedFormSection]}
            fields={this.props.fields}
            schema={
              this.props.schema.items.properties[this.state.selectedFormSection]
            }
            formData={
              this.state.formData[this.state.selectedIndex][
                this.state.selectedFormSection
              ]
            }
            onChange={({ formData }) => {
              this.onFormChange(formData);
            }}
          >
            <div />
          </Form>
        </div>
      </div>
    );
  }
}
