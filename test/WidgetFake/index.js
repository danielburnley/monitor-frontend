import React from "react";

export default class WidgetFake extends React.Component {
  render = () => (
    <input
      data-test={this.datatest || this.props["rendered-data-test"] || "widget-stub"}
      value={this.props.value || ""}
      onChange={async e => {await this.props.onChange(e.target.value)}}
    />
  )
}
