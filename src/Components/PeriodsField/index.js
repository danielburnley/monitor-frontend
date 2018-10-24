import React from "react";
import "./style.css";


export default class PeriodsField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.formData
    };
  }

  onChange = (name, index, value) => {
    let newFormData = this.state.formData
    newFormData[index][name] = value

    this.setState({ formData: newFormData }, () => this.props.onChange(this.state.formData));
  };

  renderLine(key, item) {
    if (item.readonly) {
      return this.renderReadOnlyLine(key);
    } else {
      return this.renderInputLine(key);
    }
  }

  renderInputLine(key) {
    return this.props.formData.map((column, index) => {
      return (
        <div className="col-sm-1" key={`input-${index}-${key}`}>
          <input
            data-test={`${key}-input`}
            onChange={e => this.onChange(key, index, e.target.value)}
            value={this.state.formData[index][key] || ""}
            className="form-control"
          />
        </div>
      );
    });
  }

  renderReadOnlyLine(key) {
    return this.props.formData.map(columnData => {
      return (
        <div className="col-sm-1" key={`data-${columnData.period}-${key}`}>
          <p className="no-wrap" data-test={`${key}-line-data`}>{columnData[key]}</p>
        </div>
      );
    });
  }

  renderHeader(title) {
    return (
      <div className="col-sm-2">
        <p data-test="line-title" >
          <strong>{title}</strong>
        </p>
      </div>
    );
  }

  render() {
    return (
      <div>
        {Object.entries(this.props.schema.items.properties).map(
          ([key, value]) => {
            return (
              <div key={`${key}`}>
                <div className="row" />
                {this.renderHeader(value.title)}
                {this.renderLine(key, value)}
              </div>
            );
          }
        )}
      </div>
    );
  }
}
