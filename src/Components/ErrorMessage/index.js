import React from "react";
import PropTypes from "prop-types";

export default class ErrorMessage extends React.Component {
  renderInvalidPaths = () => {
    const strippedPaths = this.stripEmptyPaths();
    return strippedPaths.map(path => {
      return (
        <span key={path}>
          {path.join(" → ")}
          <br />
        </span>
      );
    });
  };

  stripEmptyPaths = () => {
    const strippedPaths = [];
    this.props.invalidPaths.forEach(element => {
      strippedPaths.push(element.filter(Boolean));
    });
    return strippedPaths;
  };

  renderValidation = () => {
    if (this.props.valid) {
      return null;
    }
    if (this.props.type === "Submit") {
      return (
        <div
          className="alert alert-danger"
          role="alert"
          data-test="validationError"
        >
          <strong>Error:</strong> This return could not be submitted because the
          following fields were missing: <br />
          {this.renderInvalidPaths()}
        </div>
      );
    }

    return (
      <div
        className="alert alert-warning"
        role="alert"
        data-test="validationWarning"
      >
        <strong>Warning:</strong> You will not be able to submit this return
        until the following fields are filled in: <br />
        {this.renderInvalidPaths()}
      </div>
    );
  };

  renderOverWritingError = () => {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        data-test="overwriting-error"
      >
        <strong>Error:</strong> You cannot save as newer data has already been saved to the system.<br />
      </div>
    );
  }

  renderValidationConnectionError = () =>
    <div
      className="alert alert-danger"
      role="alert"
      data-test="validation-connection-error"
    >
      <strong>Error:</strong> There was an error validating, please ensure you are connected to the internet.<br />
    </div>

  render() {
    if (this.props.validationSuccess === false) {
      return this.renderValidationConnectionError();
    }
    if (this.props.errors && this.props.errors.length > 0) {
      return this.renderOverWritingError()
    }

    return this.renderValidation();
  }
}

ErrorMessage.propTypes = {
  valid: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  invalidPaths: PropTypes.arrayOf(PropTypes.array).isRequired,
  validationSuccess: PropTypes.bool
};
