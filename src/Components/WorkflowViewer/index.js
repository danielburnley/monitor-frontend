import React from 'react';
import './style.css';

export default class WorkflowViewer extends React.Component {
  renderStep = (step, index) =>
    <li
      key={index}>
      <a
        data-test='workflowStep'
        onClick={() => this.props.onClick(step.section, step.subsection)}
      >
      {step.title}
      </a>
    </li>

  renderSection = (section, index) =>
    <li className="workflow-section" key={index}>
      <div data-test="workflowTitle"><h2>{section.title}</h2></div>
      <div data-test='workflowDescription'><h3>{section.description}</h3></div>
      <ol>
      {
        section.steps.map(this.renderStep)
      }
      </ol>
      <hr/>
    </li>

  renderWorkflow = (workflow) =>
    <ol className="workflow-items">
      {workflow.map(this.renderSection)}
    </ol>

  render = () =>
    <div className="col-md-offset-2 col-md-10">
      {this.renderWorkflow(this.props.workflow)}
    </div>
}
