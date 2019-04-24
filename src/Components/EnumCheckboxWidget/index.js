import React from 'react';

export default class EnumCheckboxWidget extends React.Component {
  valueMeansChecked = () =>
    this.props.schema.enum.indexOf(this.props.value) == 0

  invertValue = () => {
    if (this.props.schema.enum[1] == this.props.value) {
      return this.props.schema.enum[0];
    } else {
      return this.props.schema.enum[1];
    }
  }

  render() {
    return <input
      data-test="checkbox"
      type="checkbox"
      checked={this.valueMeansChecked()}
      onChange={this.props.onChange(this.invertValue())}
      disabled={this.props.disabled}
    />;
  }
}
