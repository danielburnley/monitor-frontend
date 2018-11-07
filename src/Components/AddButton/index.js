import React from "react";

export default class AddButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <button
        data-test="add-button"
        className="btn btn-primary"
        onClick={this.props.passedFunction}
      >
        +
      </button>
    );
  }
}
