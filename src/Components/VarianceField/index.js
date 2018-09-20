import React from "react";
import PropTypes from "prop-types";

export default class VarianceField extends React.Component {
  constructor(props) {
    super(props);

    this.setupInitialState(props.formData);
  }

  setupInitialState = formData => {
    this.state = {
      baseline: formData.baseline || "",
      percentComplete: formData.percentComplete || 0,
      status: formData.status || "On schedule",
      current: formData.current || "",
      reason: formData.reason || ""
    };
  };

  renderCurrentValue = () => (
    <div className="row">
      <div className="col-md-3 form-group">
        <label htmlFor="current">Current value</label>
        <input
          className="form-control"
          data-test="variance-current"
          id="current"
          onChange={e => this.onFieldChange("current", e)}
          type="text"
          value={this.state.current}
        />
      </div>
    </div>
  );

  renderReason = () => (
    <div className="row">
      <div className="col-md-6 form-group">
        <label htmlFor="reason">Reason for variance</label>
        <textarea
          className="form-control"
          data-test="variance-reason"
          onChange={e => this.onFieldChange("reason", e)}
          type="text"
          value={this.state.reason}
        />
      </div>
    </div>
  );

  renderDelayed = () => (
    <div>
      {this.renderCurrentValue()}
      {this.renderReason()}
    </div>
  );

  onFieldChange = (name, e) => {
    this.setState({ [name]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  };

  renderTitle = () => (
    <div className="panel-heading" data-test="field-title">
      {this.props.schema.title}
    </div>
  );

  renderBaseline = () => (
    <div className="form-group">
      <label className="static-label">Baseline</label>
      <p data-test="form-control-static" data-test="target-date">
        {this.props.formData.baseline}
      </p>
    </div>
  );

  renderStatus = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="status">Status</label>
      <select
        data-test="variance-status"
        id="status"
        className="form-control"
        value={this.state.status}
        onChange={e => this.onFieldChange("status", e)}
      >
        <option>On schedule</option>
        <option>Delayed</option>
      </select>
    </div>
  );

  renderPercentComplete = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="percent-complete">Percent complete</label>
      <input
        className="form-control"
        data-test="variance-percentage"
        id="percent-complete"
        onChange={e => this.onFieldChange("percentComplete", e)}
        type="number"
        value={this.state.percentComplete}
      />
    </div>
  );

  renderBody = () => (
    <div className="panel-body">
      {this.renderBaseline()}
      <div className="row">
        {this.renderStatus()}
        {this.renderPercentComplete()}
      </div>
      {this.state.status == "Delayed" && this.renderDelayed()}
    </div>
  );

  render() {
    return (
      <div className="panel panel-default">
        {this.renderTitle()}
        {this.renderBody()}
      </div>
    );
  }
}

VarianceField.propTypes = {
  formData: PropTypes.shape({
    baseline: PropTypes.string.isRequired,
    percentComplete: PropTypes.number,
    status: PropTypes.oneOf(["Delayed", "On schedule"]),
    current: PropTypes.string,
    reason: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};
