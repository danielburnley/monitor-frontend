import React from "react";
import AddButton from "../AddButton";
import RemoveButton from "../RemoveButton";
import "./style.css";

export default class PeriodsField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.formData || [{}]
    };
  }

  onChange = (name, index, value) => {
    let newFormData = this.state.formData;
    newFormData[index][name] = value;

    this.props.onChange(newFormData)

    this.setState({ formData: newFormData })
  };

  renderData() {
    return this.state.formData.map((columnData, index) => (
      <div
        className="flex-data less-padding"
        key={`input-${index}`}
      >
        {this.renderColumn(index, columnData)}
      </div>
    ));
  }

  renderColumn = (index, column) => {
    return Object.entries(this.props.schema.items.properties).map( ([key, value]) => {
      return <div key={`${key}-${value}-${index}`}>
        {this.renderItem(key, index, column)}
      </div>
    });
  }

  renderItem = (key, index, column) => {
    if (key === "remove") {
      return this.renderRemoveButton(index)
    } else {
      return (
        <this.props.registry.fields.SchemaField
          data-test={`${key}-input`}
          onChange={e => this.onChange(key, index, e)}
          formData={column[key] || ""}
          className="form-control"
          schema={this.removeTitles(this.props.schema.items.properties[key])}
          registry={this.props.registry}
          uiSchema={this.props.uiSchema && this.props.uiSchema.items[key]}
        />
      )
    }
  }

  removeTitles = (schema) => {
     let schema_title_striped = JSON.parse(JSON.stringify(schema))
     schema_title_striped.title = ""
     return schema_title_striped
  }

  renderHeaders() {
    return Object.entries(this.props.schema.items.properties).map( ([key, value]) => {
      if(value.hidden) return null;
      return (
        <p key={key} data-test="line-title" className="no-wrap period-header form-control">
          <strong>{value.title}</strong>
        </p>
      );
    })
  }

  isAddable = () => this.props.uiSchema && this.props.uiSchema['ui:options'] &&
    this.props.uiSchema['ui:options']['addable']


  renderAddButton() {
    if (this.isAddable()) {
      return <AddButton onClick={() => this.addEvent()} />;
    }
    return null;
  }

  renderRemoveButton(index) {
    if (this.isAddable()) {
      return <RemoveButton onClick={() => this.removeEvent(index)} index={index} />;
    }
    return null;
  }

  addEvent() {
    let newPeriod = { period: "" };
    let updatedArray = this.state.formData;
    updatedArray.push(newPeriod);

    this.setState({ formData: updatedArray });
  }

  removeEvent(index) {
    let updatedArray = this.state.formData;
    updatedArray.splice(index, 1);

    this.setState({ formData: updatedArray });
  }

  render() {
    let updatedRows = this.props.schema.items.properties;
    if (this.isAddable()) {
      updatedRows.remove = { title: "Remove", type: "string" };
    }
    return (
      <div>
        <div className="flex-row">
          <div className="flex-header">
            {this.renderHeaders()}
          </div>
          {this.renderData()}
        </div>
        {this.renderAddButton()}
      </div>
    )
  }
}
