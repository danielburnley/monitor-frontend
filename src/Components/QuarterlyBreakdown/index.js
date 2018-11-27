import React from "react";
import AddButton from "../AddButton";
import RemoveButton from "../RemoveButton";
import "./style.css";

export default class QuarterlyBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.formData || []
    };
  }

  onFieldChange(index, name, value) {
    let newData = this.state.data;
    newData[index][name] = value
    this.setState({ data: newData }, () => {
      this.props.onChange(this.state.data);
    });
  }

  renderData() {
    let quarterlyObject = this.props.schema.items.properties;
    if(this.props.schema.addable){
      quarterlyObject.remove = { title: "Remove", type: "string" };
    }
    return Object.entries(quarterlyObject).map(([key, v]) => {
      if (!v.hidden) {
        return (
          <div className="col-xs-2 column" key={`${key}_col`}>
            {this.renderHeader(v, key)}
            {this.renderPeriods(key, v)}
          </div>
        );
      }
      return null;
    });
  }

  renderHeader(v, key) {
    return (
      <div className="row header" key={`${key}`} data-test={`${key}_title`}>
        {v.title}
      </div>
    );
  }

  renderPeriods(key, v) {
    return this.state.data.map((value, index) => {
      return (
        <div className="row" key={`row_${index}`}>
          {this.renderPeriodsInternal(key, value, index, v)}
        </div>
      );
    });
  }

  renderPeriodsInternal(key, value, index, v) {
    if (key !== "remove") {
      return (
        <div className="row" key={`row_${index}`}>
          {this.renderInputField(key, value, index, v)}
        </div>
      );
    } else {
      return (
        <div key={`remove_${index}`}>{this.renderRemoveButton(index)}</div>
      );
    }
  }

  renderOptions = (options) => {
    return(
      options.map((value, index) => {
      return <option key={index}>{value}</option>
      })
    )
  }

  renderDropdown = (key, value, v, index) => {
    return (
      <select
      data-test={`${key}_${index}`}
      className="form-control"
      value={value}
      onChange={e => this.onFieldChange(index, key, e.target.value)}
      disabled={v.readonly}
      >
        <option></option>
        {this.renderOptions(v.enum)}
      </select>
    )
  }

  renderInputField(key, periodData, index, v) {
    if (!periodData) return
    if (v.currency) {
      return (
        <this.props.registry.widgets.currency
          data-test={`${key}_${index}`}
          className="form-control"
          value={periodData[key]}
          key={`${key}_${index}`}
          onChange={e => this.onFieldChange(index, key, e)}
          disabled={v.readonly}
        />
      );
    } else if (v.enum) { 
      return this.renderDropdown(key, periodData[key], v, index)
    } else {
      return (
        <input
        data-test={`${key}_${index}`}
        className="form-control"
        value={periodData[key]}
        onChange={e => this.onFieldChange(index, key, e.target.value)}
        disabled={v.readonly}
      />
      );
    }
  }

  renderAddButton() {
    if (!this.props.schema.addable) {
      return null;
    }
    return <AddButton onClick={() => this.addEvent()} />;
  }

  addEvent() {
    let newPeriod = {};
    let updatedArray = this.state.data;
    updatedArray.push(newPeriod);

    this.setState({ data: updatedArray });
  }

  renderRemoveButton(index) {
    if (this.props.schema.addable) {
      return <div className="remove"><RemoveButton onClick={() => this.removeEvent(index)} /></div>;
    }
    return null;
  }

  removeEvent(index) {
    let updatedArray = this.state.data;
    updatedArray.splice(index, 1);

    this.setState({ data: updatedArray });

    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div data-test="title" className="title">
          <h4>{this.props.schema.title}</h4>
        </div>
        <div className="row container">{this.renderData()}</div>
        {this.renderAddButton()}
      </div>
    );
  }
}
