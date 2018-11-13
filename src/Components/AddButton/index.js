import React from "react";

export default class AddButton extends React.Component {
  render() {
    return (
      <div className="row">
        <div className="pull-right">
          <button
            data-test="add-button"
            className="btn btn-primary add-remove"
            onClick={this.props.onClick}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
