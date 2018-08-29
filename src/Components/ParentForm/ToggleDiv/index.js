import React from "react";

export default class ToggleDiv extends React.Component {
  constructor() {
    super();
    this.state = { open: false };
  }
  render() {
    if (this.state.open) {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" onClick={() => this.setState({ open: !this.state.open })}>
            {this.props.title}
            <span
              className="glyphicon glyphicon-chevron-down"
              aria-hidden="true"
            />
          </div>
          <div className="panel-body">{this.props.children}</div>
        </div>
      );
    } else {
      return (
        <div className="panel panel-default">
          <div className="panel-heading" onClick={() => this.setState({ open: !this.state.open })}>
            {this.props.title} {this.props.index}
            <span
              className="glyphicon glyphicon-chevron-right"
              aria-hidden="true"
            />
          </div>
        </div>
      );
    }
  }
}
