import React from "react";
import PropTypes from "prop-types";

export default class VarianceField extends React.Component {
  constructor(props) {
    super(props);

    const baselineVarianceOptions =
      props.formData.varianceBaselineFullPlanningPermissionSubmitted ||
      props.formData.varianceBaselineFullPlanningPermissionGranted ||
      props.formData.landAssemblyVarianceAgainstBaseReturn;
    const returnVarianceOptions =
      props.formData.varianceLastReturnFullPlanningPermissionSubmitted ||
      props.formData.varianceLastReturnFullPlanningPermissionGranted ||
      props.formData.landAssemblyVarianceAgainstLastReturn;

    this.state = {
      baseline: props.formData.baseline,
      percentComplete: props.formData.percentComplete,
      status: props.formData.status || "On schedule",
      current: props.formData.current,
      reason: props.formData.reason,
      completedDate: props.formData.completedDate,
      baselineVariance: baselineVarianceOptions,
      returnVariance: returnVarianceOptions,
      previousReturn: props.formData.previousReturn
    };
  }

  onFieldChange = (name, newValue) => {
    this.setState({ [name]: newValue || undefined }, () => {
      this.props.onChange(this.state);
    });
  };

  renderBaselineVariance = () => {
    if (this.state.status === "Delayed") {
      return (
        <div className="col-md-3 form-group">
          <label>Baseline Variance (weeks)</label>
          <p data-test="baseline-variance">
            {this.state.baselineVariance || 0}
          </p>
        </div>
      );
    } else {
      return;
    }
  };

  renderReturnVariance() {
    if (this.state.previousReturn !== undefined) {
      return (
        <div className="col-md-3 form-group">
          <label>Return Variance (weeks)</label>
          <p data-test="return-variance">{this.state.returnVariance || 0}</p>
        </div>
      );
    } else {
      return;
    }
  }

  renderCurrentValue = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="current">Current Return *</label>
      <input
        className="form-control"
        data-test="variance-current"
        id="current"
        onChange={e => this.onFieldChange("current", e.target.value)}
        type="date"
        value={this.state.current || ""}
      />
    </div>
  );

  renderPreviousValue() {
    if (this.state.previousReturn !== undefined) {
      return (
        <div className="col-md-3 form-group">
          <label htmlFor="previous">Previous Return</label>
          <p data-test="variance-previous" id="previous">
            {this.state.previousReturn}
          </p>
        </div>
      );
    } else {
      return;
    }
  }

  renderReason = () => (
    <div className="row">
      <div className="col-md-6 form-group">
        <label htmlFor="reason">Reason for variance*</label>
        <textarea
          className="form-control"
          data-test="variance-reason"
          onChange={e => this.onFieldChange("reason", e.target.value)}
          type="text"
          value={this.state.reason}
        />
      </div>
    </div>
  );

  renderDelayed = () => (
    <div>
      <div className="row">
        {this.renderPreviousValue()}
        {this.renderCurrentValue()}
      </div>
      {this.renderReason()}
    </div>
  );

  renderReference = () => {
    if (this.props.name === "planningSubmitted" || this.props.name === "submitted") {
      return (
        <div className="col-md-3 form-group">
          <label htmlFor="reference">Reference*</label>
          <input
            className="form-control"
            data-test="variance-reference"
            id="reference"
            onChange={e =>
              this.onFieldChange("onCompletedReference", e.target.value)
            }
            value={this.state.onCompletedReference}
          />
        </div>
      );
    }
  };

  renderCompletedDate = () => {
    return (
      <div className="col-md-3 form-group">
        <label htmlFor="completed">Completed Date*</label>
        <input
          className="form-control"
          data-test="variance-completed"
          id="completed"
          onChange={e => this.onFieldChange("completedDate", e.target.value)}
          type="date"
          value={this.state.completedDate}
        />
      </div>
    );
  };

  renderCompleted = () => (
    <div className="row">
      {this.renderCompletedDate()}
      {this.renderReference()}
    </div>
  );

  renderTitle = () => (
    <div className="panel-heading" data-test="field-title">
      {this.props.schema.title}
    </div>
  );

  renderBaseline = () => (
    <div className="col-md-3 form-group">
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
        onChange={e => this.onFieldChange("status", e.target.value)}
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
      <this.props.registry.widgets.percentage
        className="form-control"
        data-test="variance-percentage"
        id="percent-complete"
        onChange={e => this.onFieldChange("percentComplete", e)}
        value={this.state.percentComplete || ""}
      />
    </div>
  );

  renderBody = () => (
    <div className="panel-body">
      <div className="row">
        {this.renderBaseline()}
        {this.renderBaselineVariance()}
        {this.renderReturnVariance()}
      </div>
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
    completedDate: PropTypes.string,
    varianceBaselineFullPlanningPermissionSubmitted: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};
