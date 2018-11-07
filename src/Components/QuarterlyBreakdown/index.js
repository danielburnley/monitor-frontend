import React from "react";
import "./style.css";

export default class QuarterlyBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: this.props.formData
    };
  }

  onFieldChange(index, name, e) {
    let newData = this.state.data;
    newData[index][name] = e.target.value;

    this.setState({ data: newData }, () => {
      this.props.onChange(this.state.data);
    });
  }

  renderData() {
    return Object.entries(this.props.schema.items.properties).map(
      ([key, v]) => {
        if (!v.hidden) {
          return (
            <div className="col-xs-2 column" key={`${key}_col`}>
              {this.renderHeader(v, key)}
              {this.renderPeriods(key, v)}
            </div>
          );
        }
        return null;
      }
    );
  }

  renderHeader(v, key) {
    return (
      <div className="row header" key={`${key}`} data-test={`${key}_title`}>
        {v.title}
      </div>
    );
  }

  renderPeriods(key, v) {
    return this.props.formData.map((value, index) => {
      return (
        <div className="row" key={`row_${index}`}>{this.renderInputField(key, value, index, v)}</div>
      );
    });
  }

  renderInputField(key, value, index, v) {
    if(this.props.schema.items.properties[key].currency) {
      return (
        <this.props.registry.widgets.currency
          data-test={`${key}_${index}`}
          className="form-control"
          value={value[key]}
          onChange={e => this.onFieldChange(index, key, e)}
          disabled={v.readonly}
        />
      );
    } else {
      return (
        <input
        data-test={`${key}_${index}`}
        className="form-control"
        value={value[key]}
        onChange={e => this.onFieldChange(index, key, e)}
        disabled={v.readonly}
      />
      );
    }
  }

  render() {
    console.log(this.state.data)
    return (
      <div>
        <div data-test="title" className="title">
          <h4>{this.props.schema.title}</h4>
        </div>
        <div className="row container">{this.renderData()}</div>
      </div>
    );
  }
}
