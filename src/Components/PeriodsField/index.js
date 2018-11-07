import React from "react";
import AddButton from "../AddButton";
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

    this.setState({ formData: newFormData }, () =>
      this.props.onChange(this.state.formData)
    );
  };

  renderLine(key, item) {
    return this.props.formData.map((column, index) => {
      return (
        <div
          className="col-sm-1 flex-data less-padding"
          key={`input-${index}-${key}`}
        >
          <input
            data-test={`${key}-input`}
            onChange={e => this.onChange(key, index, e.target.value)}
            value={column[key] || ""}
            className="form-control"
            disabled={item.readonly}
          />
        </div>
      );
    });
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

  renderAddButton(item) {
    let inputKey = Object.keys(item)[1];
    if (item[inputKey].readonly) {
      return null;
    }
    return (
      <AddButton passedFunction={() => this.addEvent()}/>
    );
  }

  renderRemoveButton(item) {
    let inputKey = Object.keys(item)[1];
    if (item[inputKey].readonly) {
      return null;
    }
    return (
      <button
        data-test="remove-button"
        className="btn btn-danger"
        onClick={e => this.removeEvent(e)}
      >
        -
      </button>
    );
  }

  addEvent() {
    let newPeriod = { period: "" };
    let updatedArray = this.state.formData;
    updatedArray.push(newPeriod);

    this.setState({ formData: updatedArray });
  }

  removeEvent() {
    let updatedArray = this.state.formData;
    updatedArray.pop();

    this.setState({ formData: updatedArray });
  }

  render() {
    return (
      <div>
        {this.renderRemoveButton(this.props.schema.items.properties)}
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
        {this.renderAddButton(this.props.schema.items.properties)}
      </div>
    );
  }
}
