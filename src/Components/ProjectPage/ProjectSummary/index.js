import React from "react";
import "./style.css";

export default class ProjectSummary extends React.Component {
  render() {
    return (
      <div data-test="summary" className="summary-field">
        <div className="row">
          <h3 className="col-md-2 name" data-test="project_name">
            {this.props.data.summary.projectName}
          </h3>
        </div>
        <div className="row" data-test="project_description">
          <p className="col-md-6 text">{this.props.data.summary.projectDescription}</p>
        </div>
      </div>
    );
  }
}
