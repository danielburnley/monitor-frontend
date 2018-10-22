import React from "react";

export default class PeriodFinancials extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (name, value) => {
    this.setState({ [name]: value }, () => this.props.onChange(this.state));
  };

  renderLine(key, item) {
    if (item.readonly) {
      return this.renderReadOnlyLine(key, item);
    } else {
      return this.renderInputLine(key, item);
    }
  }

  renderInputLine(key, item) {
    return this.props.data.map(column => {
      return (
        <div className="col-sm-1" key={`input-for-${column.period}`}>
          <input
            data-test="age-input"
            onChange={e => this.onChange(key, e.target.value)}
            type="text"
            className="form-control"
          />
        </div>
      );
    });
  }

  renderReadOnlyLine(key) {
    return this.props.data.map(columnData => {
      return (
        <div className="col-sm-1" key={`data-${columnData.period}-${key}`}>
          <p data-test={`${key}-line-data`}>{columnData[key]}</p>
        </div>
      );
    });
  }

  renderHeader(title) {
    return (
      <div className="col-sm-2">
        <p data-test="line-title">
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
