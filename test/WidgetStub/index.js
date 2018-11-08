import React from "react";

export default class WidgetStub extends React.Component {
  render() {
    return <input data-test={this.datatest} value={this.props.value || ""} onChange={e => this.props.onChange(e)}/>;
  }
}
