import React from "react";
import Form from "react-jsonschema-form";
import Sidebar from "../Sidebar";
import GenerateSidebarItems from "../../UseCase/GenerateSidebarItems";

export default class ArraySubForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: props.data,
      selectedSection: Object.keys(props.schema.items.properties)[0],
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
          this.setState({ selectedSection: section, selectedIndex: index });
        }}
      />
    );
  }

  onFormChange = formData => {
    let updatedData = [...this.state.formData];
    updatedData[this.state.selectedIndex][
      this.state.selectedSection
    ] = formData;

    this.setState({ formData: updatedData }, () => {
      this.props.onChange(updatedData)
    });
  };

  render() {
    return (
      <div>
        {this.renderSidebar()}
        <Form
          data-test={`${this.state.selectedSection}-form`}
          schema={
            this.props.schema.items.properties[this.state.selectedSection]
          }
          formData={
            this.state.formData[this.state.selectedIndex][
              this.state.selectedSection
            ]
          }
          onChange={({ formData }) => {
            this.onFormChange(formData);
          }}
        />
      </div>
    );
  }
}
