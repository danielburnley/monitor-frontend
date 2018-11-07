import React from "react";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="pull-right">
          <button
            data-test="add-button"
            className="btn btn-primary add-remove"
            onClick={this.props.passedFunction}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
