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

      statusAgainstLastReturn: this.props.formData.statusAgainstLastReturn,
      currentReturn: this.props.formData.currentReturn,
      reasonForVariance: this.props.formData.reasonForVariance,
      milestonePercentCompleted: this.props.formData.milestonePercentCompleted
    };
  }

  onFieldChange = (name, e) => {
    this.setState({ [name]: e.target.value }, () => {
      this.props.onChange(this.state);
    });
  };

  renderMilestoneDescription() {
    return (
      <div data-test="milestone-description">{this.state.description}</div>
    );
  }

  renderMilestoneTargetDate() {
    return (
      <div data-test="milestone-milestoneBaselineCompletion">
        {this.state.milestoneBaselineCompletion}
      </div>
    );
  }

  renderMilestoneSummary() {
    return (
      <div data-test="milestone-summary">
        {this.state.milestoneSummaryOfCriticalPath}
      </div>
    );
  }

  renderStatusAgainstLastReturn() {
    return (
      <div>
        <select
          onChange={e => this.onFieldChange("statusAgainstLastReturn", e)}
          data-test="milestone-status-against-last-return"
          value={this.state.statusAgainstLastReturn}
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
        <input
          onChange={e => this.onFieldChange("currentReturn", e)}
          data-test="milestone-current-return"
          value={this.state.currentReturn}
        />
      </div>
    );
  }

  renderReasonForVariance() {
    return (
      <input
        onChange={e => this.onFieldChange("reasonForVariance", e)}
        data-test="milestone-reason-for-variance"
        value={this.state.reasonForVariance}
      />
    )
  }

  renderMilestonePercentCompleted() {
    return (
      <input
        onChange={e => this.onFieldChange("milestonePercentCompleted", e)}
        data-test="milestone-percent-completed"
        value={this.state.milestonePercentCompleted}
      />
    )
  }

  renderBody() {
    return (
      <div className="panel-body">
        {this.renderMilestoneDescription()}
        {this.renderMilestoneTargetDate()}
        {this.renderMilestoneSummary()}
        {this.renderStatusAgainstLastReturn()}
        {this.renderCurrentReturn()}
        {this.renderReasonForVariance()}
        {this.renderMilestonePercentCompleted()}
      </div>
    );
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading" data-test="schema-title">
          {this.props.schema.title}
        </div>
        {this.renderBody()}
      </div>
    );
  }
}
