import React from "react";

export default class RemoveButton extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="pull-right">
          <button
            data-test={`remove-button-${this.props.index}`}
            className="btn btn-danger"
            onClick={this.props.onClick}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
