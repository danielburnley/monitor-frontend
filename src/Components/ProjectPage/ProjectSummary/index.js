import React from "react";
import "./style.css";

export default class ProjectSummary extends React.Component {

  unsubmitbutton = () => {
    if(!process.env.REACT_APP_BACK_TO_BASELINE) return null;
    return (
    <button
      className="btn btn-danger"
      onClick={this.onUnsubmit}
        >
      Click here to go back to the basleine Editor. <br/>
      WARNING: This will delete any returns made.
    </button>
    )
  }

  onUnsubmit = (e) => {
    this.props.unsubmitProject.execute(this, this.props.projectId)
  }

  unsubmitSuccess = (e) => {
    window.location.reload()
  }
  unsubmitFailure = () => {}

  render() {
    return (
      <div data-test="summary" className="summary-field">
        <div className="row">
          <div className="col-lg pull right">
            {this.unsubmitbutton()}
          </div>
        </div>
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
