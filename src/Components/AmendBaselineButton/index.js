import React from "react";

export default class AmendBaselineButton extends React.Component {
  render = () => {
    return (
      <button
        data-test="amend-button"
        className="btn btn-primary"
        onClick={() => {
          this.props.history.push(
            `/project/${this.props.match.params.projectId}/baseline/amend`
          );
        }}
      >
        Amend Baseline
      </button>
    );
  };
}
