import React from "react";
import PropTypes from "prop-types";

export default class PercentageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value
    }
  }

  clampPercentage(value) {
    if (value < 0) {
      return '0';
    }

    if (value > 100) {
      return '100';
    }

    return value;
  }

  handleChange = (e) => {
    this.setState({value: "" + this.clampPercentage(e.target.value)});
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="input-group">
        <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
        <div className="input-group-addon">%</div>
      </div>
    );
  }
};
