import React from "react";
import PropTypes from "prop-types";

export default class VarianceField extends React.Component {
  constructor(props) {
    super(props);

    const baselineVarianceOptions =
      props.formData.varianceBaselineFullPlanningPermissionSubmitted ||
      props.formData.varianceBaselineFullPlanningPermissionGranted ||
      props.formData.landAssemblyVarianceAgainstBaseReturn||
      props.formData.procurementVarianceAgainstBaseline ||
      props.formData.varianceAgainstBaseline;
    const returnVarianceOptions =
      props.formData.varianceLastReturnFullPlanningPermissionSubmitted ||
      props.formData.varianceLastReturnFullPlanningPermissionGranted ||
      props.formData.landAssemblyVarianceAgainstLastReturn ||
      props.formData.procurementVarianceAgainstLastReturn ||
      props.formData.varianceAgainstLastReturn;     

    this.state = {
      baseline: props.formData.baseline,
      percentComplete: props.formData.percentComplete,
      status: props.formData.status || "On schedule",
      current: props.formData.current,
      reason: props.formData.reason,
      completedDate: props.formData.completedDate,
      baselineVariance: baselineVarianceOptions,
      returnVariance: returnVarianceOptions,
      previousReturn: props.formData.previousReturn,
      onCompletedReference: props.formData.onCompletedReference,
      onCompletedNameOfContractor: props.formData.onCompletedNameOfContractor
    };
  }

  onFieldChange = (name, newValue) => {
    this.setState({ [name]: newValue }, () => {
      this.props.onChange(this.state);
    });
  };

  renderBaselineVariance = () => {
    if (this.state.status === "Delayed") {
      return (
        <div className="col-md-4 form-group">
          <label>Baseline Variance (weeks)</label>
          <p data-test="baseline-variance">
            {this.calculateVariance(this.state.baseline, this.state.current)}
          </p>
        </div>
      );
    } else {
      return;
    }
  };

  renderReturnVariance() {
    if (this.state.previousReturn && this.state.status === "Delayed") {
      return (
        <div className="col-md-4 form-group">
          <label>Last Return Variance (weeks)</label>
          <p data-test="return-variance">
            {this.calculateVariance(this.state.previousReturn, this.state.current)}
          </p>
        </div>
      );
    } else {
      return;
    }
  }

  calculateVariance = (originalDate, newDate) => {
    if (!originalDate || originalDate === "") return null;
    if (!newDate || newDate === "") return null;
    let originalDateDatified = new Date(originalDate);
    let newDateDatified = new Date(newDate);

    if(newDateDatified == 'Invalid Date' || originalDateDatified == 'Inavlid Date') return ""
    return Math.round((newDateDatified - originalDateDatified)/(7 * 60 * 60 * 24 * 1000));
  }

  renderCurrentValue = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="current">Current Date *</label>
      <input
        className="form-control"
        data-test="current-date"
        id="current"
        onChange={e => this.onFieldChange("current", e.target.value)}
        type="date"
        value={this.state.current || ""}
      />
    </div>
  );

  renderReason = () => (
    <div className="col-md-9 form-group">
      <label htmlFor="reason">Reason for variance*</label>
      <textarea
        className="form-control"
        data-test="variance-reason"
        onChange={e => this.onFieldChange("reason", e.target.value)}
        type="text"
        value={this.state.reason}
      />
    </div>
  );

  renderDelayed = () => (
      <div className="row">
         {this.renderCurrentValue()}
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

  renderContractorName = () => {
    if (this.props.name === "procurementStatusAgainstLastReturn") {
      return (
        <div className="col-md-3 form-group">
          <label htmlFor="name">Name Of Contractor*</label>
          <input
            className="form-control"
            data-test="variance-name"
            id="name"
            onChange={e =>
              this.onFieldChange("onCompletedNameOfContractor", e.target.value)
            }
            value={this.state.onCompletedNameOfContractor}
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
      {this.renderContractorName()}
    </div>
  );

  renderTitle = () => (
    <div className="panel-heading" data-test="field-title">
      <b>{this.props.schema.title}</b>
    </div>
  );

  renderBaseline = () => (
    <div className="col-md-4 form-group">
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
