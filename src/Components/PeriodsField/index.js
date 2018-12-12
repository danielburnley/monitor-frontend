import React from "react";
import AddButton from "../AddButton";
import RemoveButton from "../RemoveButton";
import "./style.css";

export default class PeriodsField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.formData
    };
  }

  onChange = (name, index, value) => {
    let newFormData = this.state.formData;
    newFormData[index][name] = value;
    
    this.props.onChange(newFormData)
    
    this.setState({ formData: newFormData })
  };

  renderLine(key, item) {
    return this.props.formData.map((column, index) => (
      <div
        className="col-sm-1 flex-data less-padding"
        key={`input-${index}-${key}`}
      >
        {this.renderItem(key, index, column)}
      </div>
    ));
  }
  
  renderItem = (key, index, column) => {
    if (key === "remove") {
      return this.renderRemoveButton(index)
    } else {
      let schema_title_striped = JSON.parse(JSON.stringify(this.props.schema.items.properties[key]))
      schema_title_striped.title = ""
      return (
        <this.props.registry.fields.SchemaField
          data-test={`${key}-input`}
          onChange={e => this.onChange(key, index, e)}
          formData={column[key] || ""}
          className="form-control"
          schema={schema_title_striped}
          registry={this.props.registry}
          uiSchema={this.props.uiSchema && this.props.uiSchema.items[key]}
        />
      )
    }
  }

  renderHeader(title) {
    return (
      <div className="col-sm-2 no-wrap less-padding flex-header">
        <p data-test="line-title">
          <strong>{title}</strong>
        </p>
      </div>
    );
  }

  renderAddButton() {
    if (!this.props.schema.addable) {
      return null;
    }
    return <AddButton onClick={() => this.addEvent()} />;
  }

  renderRemoveButton(index) {
    if (!this.props.schema.addable) {
      return null;
    }
    return <RemoveButton onClick={() => this.removeEvent(index)} index={index} />;
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
    if (this.props.schema.addable) {
      updatedRows.remove = { title: "Remove", type: "string" };
    }

    return (
      <div>
        {Object.entries(this.props.schema.items.properties).map(
          ([key, value]) => {
            return (
              <div key={`${key}`}>
                <div className="row flex-row">
                  {this.renderHeader(value.title)}
                  {this.renderLine(key, value)}
                </div>
              </div>
            );
          }
        )}
        {this.renderAddButton()}
      </div>
    );
  }
}
