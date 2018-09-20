import React from "react";
import PropTypes from "prop-types";

export default class ValidationMessage extends React.Component {
  constructor(props) {
    super(props);
  }

  decamelize = (string) => {
    let all_camelcase_word_boundaries = /(^.|[A-Z])/g;
    return string.replace(all_camelcase_word_boundaries, (character) => " "+character.toUpperCase()).substring(1);
  }

  formatPathNode = (node) => {
    if (typeof node == 'string') {
      return this.decamelize(node)
    }
    if (typeof node == 'number') {
      return "Item " + (node + 1);
    }
  };

  renderInvalidPaths = () => {
    return this.props.invalidPaths.map(path => {
      return (<span key={path}>
        {path.map(this.formatPathNode).join(' → ')}<br/>
      </span>)
    })
  };

  renderValidation = () => {
    if (this.props.valid) {
      return null;
    }

    if (this.props.type==="Submit") {
      return (
        <div className="alert alert-danger" role="alert" data-test="validationError">
          <strong>Error:</strong> This return could not be submitted because the following fields were missing: <br/>
          {this.renderInvalidPaths()}
        </div>
      );
    }

    return (
      <div className="alert alert-warning" role="alert" data-test="validationWarning">
        <strong>Warning:</strong> You will not be able to submit this return until the following fields are filled in: <br/>
        {this.renderInvalidPaths()}
      </div>
    );
  }

  render() {
    return this.renderValidation();
  }
}

ValidationMessage.propTypes = {
  valid: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  invalidPaths: PropTypes.arrayOf(PropTypes.array).isRequired
};
