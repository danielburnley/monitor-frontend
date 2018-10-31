import React from "react";
import PropTypes from "prop-types";

export default class VarianceField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      baseline: props.formData.baseline,
      percentComplete: props.formData.percentComplete,
      status: props.formData.status || "On schedule",
      current: props.formData.current,
      reason: props.formData.reason,
      completedDate: props.formData.completedDate
    };
  }

  onFieldChange = (name, e) => {
    this.setState({ [name]: e.target.value || undefined }, () => {
      this.props.onChange(this.state);
    });
  };

  renderCurrentValue = () => (
    <div className="row">
      <div className="col-md-3 form-group">
        <label htmlFor="current">Current value*</label>
        <input
          className="form-control"
          data-test="variance-current"
          id="current"
          onChange={e => this.onFieldChange("current", e)}
          type="date"
          value={this.state.current || ""}
        />
      </div>
    </div>
  );

  renderReason = () => (
    <div className="row">
      <div className="col-md-6 form-group">
        <label htmlFor="reason">Reason for variance*</label>
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

  renderCompletedDate = () => (
    <div className="row">
      <div className="col-md-3 form-group">
        <label htmlFor="completed">Completed Date*</label>
        <input
          className="form-control"
          data-test="variance-completed"
          id="completed"
          onChange={e => this.onFieldChange("completedDate", e)}
          type="date"
          value={this.state.completedDate}
        />
      </div>
    </div>
  );

  renderCompleted = () => <div>{this.renderCompletedDate()}</div>;

  renderTitle = () => (
    <div className="panel-heading" data-test="field-title">
      {this.props.schema.title}
    </div>
  );

  renderBaseline = () => (
    <div className="form-group">
      <label className="static-label">Baseline</label>
      <p className="form-control-static" data-test="target-date">
        {this.state.baseline}
      </p>
    </div>
  );

  renderStatus = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="status">Status*</label>
      <select
        data-test="variance-status"
        id="status"
        className="form-control"
        value={this.state.status}
        onChange={e => this.onFieldChange("status", e)}
      >
        <option>On schedule</option>
        <option>Delayed</option>
        <option>Completed</option>
      </select>
    </div>
  );

  renderPercentComplete = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="percent-complete">Percent complete*</label>
      <input
        className="form-control"
        data-test="variance-percentage"
        id="percent-complete"
        onChange={e => this.onFieldChange("percentComplete", e)}
        type="number"
        value={this.state.percentComplete || ""}
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
      {this.state.status === "Delayed" && this.renderDelayed()}
      {this.state.status === "Completed" && this.renderCompleted()}
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
    status: PropTypes.oneOf(["Delayed", "On schedule", "Completed"]),
    current: PropTypes.string,
    reason: PropTypes.string,
    completedDate: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};
