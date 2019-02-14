import React from "react";
import "./style.css";

export default class ProjectList extends React.Component {
  
  renderProjectLine = (id, name, type, status) => {
    return <tr data-test={`project-${id}`} key={`project-${id}`}>
      <td className="project-details" data-test={`project-name-${id}`}>{name}</td>
      <td className="project-details" data-test={`project-type-${id}`}>{this.getSchemeName(type)}</td>
      <td className="project-details" data-test={`project-status-${id}`}>{this.getStatus(status)}</td>
      <td><button
      className="btn btn-link project-details"
      data-test={`project-link-${id}`}
      onClick={() => this.props.history.push(`/project/${id}`)}
      >Take me to this project!</button></td>
      </tr>
  }

  getStatus(status) {
    if(status === "Draft") return "Baseline Editor";
    if(status === "Submitted") return "Returns";
    return null;
  }

  getSchemeName(type) {
    if(type === "ac") return "Accelerated Construction";
    if(type === "hif" || type === "mvf") return "Marginal Viability Fund";
    if(type === "ff") return "Forward Funding";
    return null;
  }

  renderList = () => {
    return (this.props.projectList.map(project => {
      return this.renderProjectLine(project.id, project.name, project.type, project.status)
      })
    )
  }

  renderTitles = () => {
    return <tr>
        <th>Project Name</th>
        <th>Scheme</th>
        <th>Status of Project</th>
        <th></th>
    </tr>
  }
  
  render() {
    return (
      <table className="table table-striped table-bordered">
      <tbody>
      {this.renderTitles()}
      {this.renderList()}
      </tbody>
      </table>
    )
  }
}