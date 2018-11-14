import React from "react";
import "./style.css";

export default class ProjectSummary extends React.Component {
  render() {
    return (
      <div data-test="summary">
        <h2>{this.props.schema.properties.summary.title}</h2>
        <h3 data-test="project_name_title">{this.props.schema.properties.summary.properties.projectName.title}</h3>
        <h4 data-test="project_name">{this.props.data.summary.projectName}</h4>
        <h3 data-test="project_description_title">{this.props.schema.properties.summary.properties.projectDescription.title}</h3>
        <div data-test="project_description">{this.props.data.summary.projectDescription}</div>
        <div data-test="helper_text">Click below to create a new return, or if you have any, view your previous returns below.</div>
      </div>
    );
  }
}
