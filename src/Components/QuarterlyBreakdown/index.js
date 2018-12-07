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

  renderData = (quarterlyObject) => {
    let data = this.state.data
    if(this.state.data.length === 0) {
      data.push({})
    }
    return data.map((value, index) => {
      return (
        <div className="line" key={`${index}`}>
          {this.renderPeriod(quarterlyObject, value, index)}
        </div>
      )
    })
  }

  renderPeriod = (quarterlyObject, value, index) => {
    return Object.entries(quarterlyObject).map(([key, schema])=> {
      if (key !== "remove") {
        return ( 
          <div className="data-column" key={`${index}_${key}`}>
            {this.renderInputField(key, value[key], index, schema)}
          </div>
        )
      } else {
        return (
          <div className="remove" key={`${index}_${key}`}>
            {this.renderRemoveButton(index)}
          </div>
        )
      }
    })
  }

  renderHeaders = (quarterlyObject) => {
    let column_class = "data-column"
    return Object.entries(quarterlyObject).map(([key, value])=> {
      if (key === "remove") column_class = "remove";
      return ( 
        <div className={`header ${column_class}`} key={`${key}`} data-test={`${key}_title`}>
          {value.title}
        </div>
      )
    });
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
    let numberOfRows = Object.keys(this.state.data).length
    if (v.currency) {
      return (
        <this.props.registry.widgets.currency
          data-test={`${key}_${index}`}
          className="form-control"
          value={periodData}
          key={`${key}_${index}_${numberOfRows}`}
          onChange={e => this.onFieldChange(index, key, e)}
          disabled={v.readonly}
        />
      );
    } else if (v.enum) {
      return this.renderDropdown(key, periodData, v, index)
    } else {
      return (
        <input
        data-test={`${key}_${index}`}
        className="form-control"
        value={periodData}
        key={`${key}_${index}_${numberOfRows}`}
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
    return <div className="data-column"><AddButton onClick={() => this.addEvent()} /></div>;
  }

  addEvent() {
    let newPeriod = {};
    let updatedArray = this.state.data;
    updatedArray.push(newPeriod);

    this.setState({ data: updatedArray });
  }

  renderRemoveButton(index) {
    if (this.props.schema.addable) {
      return <div className="remove"><RemoveButton onClick={() => this.removeEvent(index)} index={index}/></div>;
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
    let quarterlyObject = this.props.schema.items.properties;

    if(this.props.schema.addable){
      quarterlyObject.remove = { title: "Remove", type: "string" };
    }
    return <div>
      <div data-test="title" className="title">
        <h4>{this.props.schema.title}</h4>
      </div>
      <div className="line">{this.renderHeaders(quarterlyObject)}</div>
      <div>{this.renderData(quarterlyObject)}</div>
      <div className="line">{this.renderAddButton()}</div>
    </div>
  }
}
