import React from "react";

export default class RemoveButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1 pull-right">
          <button
            data-test="remove-button"
            className="btn btn-danger"
            onClick={this.props.passedFunction}
          >
            -
          </button>
        </div>
      </div>
    );
  }
}
