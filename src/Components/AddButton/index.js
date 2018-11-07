import React from "react";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-1 pull-right">
          <button
            data-test="add-button"
            className="btn btn-primary"
            onClick={this.props.passedFunction}
          >
            +
          </button>
        </div>
      </div>
    );
  }
}
