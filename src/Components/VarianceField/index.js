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
      targetDateOfAchievingStart: props.formData.targetDateOfAchievingStart,
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

  onFieldChange = async (name, newValue) => {
    await this.setState({ [name]: newValue }, () => {
      this.props.onChange(this.state);
    });
  };

  baselineVarianceSchema = () => {
    return (this.props.schema.properties.varianceBaselineFullPlanningPermissionSubmitted
    || this.props.schema.properties.varianceBaselineFullPlanningPermissionGranted
    || this.props.schema.properties.landAssemblyVarianceAgainstBaseReturn
    || this.props.schema.properties.procurementVarianceAgainstBaseline
    || this.props.schema.properties.varianceAgainstBaseline)
  }

  lastReturnVarianceSchema = () => {
    return (this.props.schema.properties.varianceLastReturnFullPlanningPermissionSubmitted
    || this.props.schema.properties.varianceLastReturnFullPlanningPermissionGranted
    || this.props.schema.properties.landAssemblyVarianceAgainstLastReturn
    || this.props.schema.properties.procurementVarianceAgainstLastReturn
    || this.props.schema.properties.varianceAgainstLastReturn )
  }

  renderBaselineVariance = () => {
    if (this.isDelayed()) {
      return (
        <div className="col-md-4 form-group">
          <label data-test="baseline-variance-title">{this.baselineVarianceSchema().title}</label>
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
    if (this.state.previousReturn && this.isDelayed()) {
      return (
        <div className="col-md-4 form-group">
          <label data-test="return-variance-title">{this.lastReturnVarianceSchema().title}</label>
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

    if(newDateDatified == 'Invalid Date' || originalDateDatified == 'Invalid Date') return ""
    return Math.round((newDateDatified - originalDateDatified)/(7 * 60 * 60 * 24 * 1000));
  }

  renderCurrentValue = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="current" data-test="current-date-title">{this.props.schema.properties.current.title}*</label>
      <this.props.registry.widgets.britishDate
        className="form-control"
        data-test="current-date"
        disabled={
          this.props.uiSchema &&
          this.props.uiSchema.current &&
          this.props.uiSchema.current["ui:disabled"]
        }
        id="current"
        onChange={e => {this.onFieldChange("current", e)}}
        value={this.state.current || ""}
      />
    </div>
  );

  renderReason = () => (
    <div className="col-md-9 form-group">
      <label htmlFor="reason" data-test="variance-reason-title">{this.props.schema.properties.reason.title}*</label>
      <textarea
        className="form-control"
        data-test="variance-reason"
        disabled={
          this.props.uiSchema &&
          this.props.uiSchema.reason &&
          this.props.uiSchema.reason["ui:disabled"]
        }
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
          <label htmlFor="reference" data-test="variance-reference-title">{this.props.schema.properties.onCompletedReference.title}*</label>
          <input
            className="form-control"
            data-test="variance-reference"
            id="reference"
            disabled={
              this.props.uiSchema &&
              this.props.uiSchema.onCompletedReference &&
              this.props.uiSchema.onCompletedReference["ui:disabled"]
            }
            onChange={e =>
              this.onFieldChange("onCompletedReference", e.target.value)
            }
            value={this.state.onCompletedReference || ""}
          />
        </div>
      );
    }
  };

  renderContractorName = () => {
    if (this.props.name === "procurementStatusAgainstLastReturn") {
      return (
        <div className="col-md-3 form-group">
          <label htmlFor="name" data-test="variance-name-title">{this.props.schema.properties.onCompletedNameOfContractor.title}*</label>
          <input
            className="form-control"
            data-test="variance-name"
            id="name"
            disabled={
              this.props.uiSchema &&
              this.props.uiSchema.onCompletedNameOfContractor&&
              this.props.uiSchema.onCompletedNameOfContractor["ui:disabled"]
            }
            onChange={e =>
              this.onFieldChange("onCompletedNameOfContractor", e.target.value)
            }
            value={this.state.onCompletedNameOfContractor || ""}
          />
        </div>
      );
    }
  };

  dateIsInvalid = () => {
    return (new Date(this.state.targetDateOfAchievingStart) < new Date(this.state.completedDate));
  }

  renderCompletedDate = () => {
    return (
      <div className={`col-md-3 form-group ${this.dateIsInvalid()?"has-error":""} error-message-no-wrap`}>
        <label htmlFor="completed" data-test="variance-completed-title">{this.props.schema.properties.completedDate.title}*</label>
        <this.props.registry.widgets.britishDate
          className="form-control"
          data-test="variance-completed"
          id="completed"
          disabled={
            this.props.uiSchema &&
            this.props.uiSchema.completedDate &&
            this.props.uiSchema.completedDate["ui:disabled"]
          }
          onChange={e => {this.onFieldChange("completedDate", e)}}
          value={this.state.completedDate || ""}
        />
      {
        this.dateIsInvalid()?
          <span className="help-block" data-test="validation-error-msg">
            Completion date cannot be later than start date
          </span>:null
      }
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
      <label className="static-label" data-test="target-date-title">
        {this.props.schema.properties.baseline.title}
      </label>
      <this.props.registry.widgets.britishDate
        className="form-control"
        disabled={true}
        onChange={async e => { await this.onFieldChange("baseline", e);}}
        data-test="target-date"
        value={this.state.baseline}
      />
    </div>
  );

  renderStatus = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="status" data-test="variance-status-title">
        {this.props.schema.properties.status.title}*
      </label>
      <select
        data-test="variance-status"
        disabled={
          this.props.uiSchema &&
          this.props.uiSchema.status &&
          this.props.uiSchema.status["ui:disabled"]
        }
        id="status"
        className="form-control"
        value={this.state.status}
        onChange={e => this.onFieldChange("status", e.target.value)}
      >
        <option>On schedule</option>
        <option>Delayed - minimal impact</option>
        <option>Delayed - moderate impact</option>
        <option>Delayed - critical</option>
        <option>Completed</option>
      </select>
    </div>
  );

  renderPercentComplete = () => (
    <div className="col-md-3 form-group">
      <label htmlFor="percent-complete" data-test="variance-percentage-title">{this.props.schema.properties.percentComplete.title}*</label>
      <this.props.registry.widgets.percentage
        className="form-control"
        data-test="variance-percentage"
        disabled={
          this.props.uiSchema &&
          this.props.uiSchema.reason &&
          this.props.uiSchema.reason["ui:disabled"]
        }
        id="percent-complete"
        onChange={e => this.onFieldChange("percentComplete", e)}
        value={this.state.percentComplete || ""}
      />
    </div>
  );

  isDelayed = () => {
    return this.state.status.substring(0, 7) === "Delayed";
  }

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
      {this.state.status && this.isDelayed() && this.renderDelayed()}
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
    targetDateOfAchievingStart: PropTypes.string,
    baseline: PropTypes.string.isRequired,
    percentComplete: PropTypes.number,
    status: PropTypes.oneOf(["Completed", "On schedule", "Delayed - minimal impact", "Delayed - moderate impact", "Delayed - critical", "Delayed"]),
    current: PropTypes.string,
    reason: PropTypes.string,
    completedDate: PropTypes.string,
    varianceBaselineFullPlanningPermissionSubmitted: PropTypes.string
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  schema: PropTypes.object.isRequired
};
