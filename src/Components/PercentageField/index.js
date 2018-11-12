import React from "react";

export default class PercentageField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value || ''
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

  cleanNonnumeric(string) {
    return string.replace(/[^0-9]/g, "");
  }

  cleanLeadingZeroes(string) {
    return string.replace(/^0*(?!$)/, "");
  }

  validatePercentage(string) {
    return this.cleanLeadingZeroes(this.cleanNonnumeric(this.clampPercentage(string)));
  }

  handleChange = (e) => {
    let {target} = e;
    let {selectionStart, selectionEnd} = target;
    
    this.setState({value: this.validatePercentage(target.value)}, () => {
        target.selectionStart = selectionStart;
        target.selectionEnd = selectionEnd;
    });
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div className="input-group" data-test="percentage-field">
        <input className="form-control" type="text" value={this.state.value} onChange={this.handleChange} />
        <div className="input-group-addon">%</div>
      </div>
    );
  }
};
