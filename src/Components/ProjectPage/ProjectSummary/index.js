import React from "react";
import "./style.css";

export default class ProjectSummary extends React.Component {
  render() {
    return (
      <div data-test="summary" className="summary-field">
        <div className="row title">
          <h3 className="col-md-2" data-test="project_name">
            {this.props.data.summary.projectName}
          </h3>
        </div>
        <div className="row" data-test="project_description">
          <p className="col-md-6 text">{this.props.data.summary.projectDescription}</p>
        </div>
        <br/>
        <div className="row" data-test="helper_text">
          <p className="col-md-6 text">
          Click below to create a new return. <br/> If you have any previous returns, they will be displayed below.
          </p>
        </div>
      </div>
    );
  }
}
