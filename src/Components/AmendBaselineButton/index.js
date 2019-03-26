import React from "react";

export default class AmendBaselineButton extends React.Component {
  amendBaseline = async () => {
    await this.props.amendBaseline.execute(this, {
      projectId: this.props.match.params.projectId
    });
  }
  
  amendBaselineSuccess = ({ baselineId }) => {
    this.props.history.push(
      `/project/${this.props.match.params.projectId}/baseline/${baselineId}`
    );
  }

  render = () => {
    if (this.props.status === 'Submitted') {
      return (
        <button
          data-test="amend-button"
          className="btn btn-primary"
          onClick={this.amendBaseline}
        >
          Amend Baseline
        </button>
      );
    } else {
      return null;
    }
  };
}
