import React from 'react';

export default class WorkflowViewer extends React.Component {
  renderStep = (step, index) =>
    <li
      key={index}>
      <a
        data-test='workflowStep'
        onClick={() => this.props.onClick(step.section)}
      >
      {step.title}
      </a>
    </li>

  renderSection = (section, index) =>
    <div key={index}>
      <div data-test="workflowTitle">{section.title}</div>
      <div data-test='workflowDescription'>{section.description}</div>
      <ol>
      {
        section.steps.map(this.renderStep)
      }
      </ol>
    </div>

  renderWorkflow = (workflow) =>
    workflow.map(this.renderSection)

  render = () =>
    this.renderWorkflow(this.props.workflow)
}
