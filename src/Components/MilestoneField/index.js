import React from "react";

export default class MilestoneField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.formData.description,
      milestoneBaselineCompletion: this.props.formData
        .milestoneBaselineCompletion,
      milestoneSummaryOfCriticalPath: this.props.formData
        .milestoneSummaryOfCriticalPath,

      statusAgainstLastReturn:
        this.props.formData.statusAgainstLastReturn || "On schedule",
      milestoneCompletedDate: this.props.formData.milestoneCompletedDate,
      currentReturn: this.props.formData.currentReturn,
      reasonForVariance: this.props.formData.reasonForVariance,
      milestonePercentCompleted: this.props.formData.milestonePercentCompleted
    };
  }

  onFieldChange = (name, newValue) => {
    this.setState({ [name]: newValue }, () => {
      this.props.onChange(this.state);
    });
  };

  renderMilestoneDescription() {
    return (
      <div>
        <label htmlFor="milestoneDescription">Description</label>
        <p data-test="milestone-description" id="milestoneDescription">
          {this.state.description}
        </p>
      </div>
    );
  }

  renderMilestoneTargetDate() {
    return (
      <div>
        <label htmlFor="milestoneBaselineCompletion">Baseline Completion Date</label>
        <p
          data-test="milestone-milestoneBaselineCompletion"
          id="milestoneBaselineCompletion"
        >
          {this.state.milestoneBaselineCompletion}
        </p>
      </div>
    );
  }

  renderMilestoneSummary() {
    return (
      <div>
        <label htmlFor="milestoneSummary">
          Summary of Baseline Critical Path
        </label>
        <p data-test="milestone-summary" id="milestoneSummary">
          {this.state.milestoneSummaryOfCriticalPath}
        </p>
      </div>
    );
  }

  renderStatusAgainstLastReturn() {
    return (
      <div>
        <label htmlFor="statusAgainstLastReturn">
          Status against last return?
        </label>
        <select
          onChange={e => this.onFieldChange("statusAgainstLastReturn", e.target.value)}
          data-test="milestone-status-against-last-return"
          value={this.state.statusAgainstLastReturn}
          className="form-control"
          id="statusAgainstLastReturn"
        >
          <option>Completed</option>
          <option>On schedule</option>
          <option>Delayed</option>
        </select>
      </div>
    );
  }

  renderCurrentReturn() {
    return (
      <div>
        <label htmlFor="currentReturn">Current Return</label>
        <input
          className="form-control"
          onChange={e => this.onFieldChange("currentReturn", e.target.value)}
          data-test="milestone-current-return"
          value={this.state.currentReturn || ""}
          type="date"
          id="currentReturn"
        />
      </div>
    );
  }

  renderCompletedDate = () => {
    return (
      <div>
        <label htmlFor="milestoneBaselineCompletedDate">Completion Date</label>
        <input
          className="form-control"
          onChange={e => this.onFieldChange("milestoneCompletedDate", e.target.value)}
          data-test="milestone-completed-date"
          value={this.state.milestoneCompletedDate || ""}
          type="date"
          id="milestoneCompletedDate"
        />
      </div>
    );
  }

  renderDate = () => {
    if(this.state.statusAgainstLastReturn === "Completed") return this.renderCompletedDate();
    return this.renderCurrentReturn();
  }

  renderReasonForVariance() {
    if(this.state.statusAgainstLastReturn==="Delayed") {
      return (
        <div>
          <label htmlFor="reasonForVariance">Reason for Variance</label>
          <textarea
            className="form-control"
            onChange={e => this.onFieldChange("reasonForVariance", e.target.value)}
            data-test="milestone-reason-for-variance"
            value={this.state.reasonForVariance }
            id="reasonForVariance"
          />
        </div>
      );
    }
    else {
      return;
    }
  }

  renderMilestonePercentCompleted() {
    return (
      <div>
        <label htmlFor="milestonePercentCompleted">Percent Complete</label>
        <this.props.registry.widgets.percentage
          className="form-control"
          onChange={e => this.onFieldChange("milestonePercentCompleted", e)}
          data-test="milestone-percent-completed"
          value={this.state.milestonePercentCompleted}
          id="milestonePercentCompleted"
        />
      </div>
    );
  }

  renderBody() {
    return (
      <div className="panel-body">
        <div className="row">
          <div className="col-md-6">
            {this.renderMilestoneDescription()}
            {this.renderMilestoneTargetDate()}
          </div>
          <div className="col-md-6">{this.renderMilestoneSummary()}</div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderStatusAgainstLastReturn()}</div>
          <div className="col-md-6">
            {this.renderMilestonePercentCompleted()}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">{this.renderDate()}</div>
          <div className="col-md-6">{this.renderReasonForVariance()}</div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        {this.renderBody()}
      </div>
    );
  }
}
