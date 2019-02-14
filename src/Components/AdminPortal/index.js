import React from "react";

export default class AdminPortal extends React.Component {
  constructor(props) {
    super(props) 

    this.state = {
      projectCreated: false 
    }
  }

  creationSuccess = async id => {
    await this.setState({
      creating: false,
      projectCreated: true,
      id: id
    })
  };

  creationFailure = () =>  {};

  onFieldChange = (value, field) => {
    this.setState({
      [field]: value
    })
  }

  onProjectCreate = () => {
    this.setState({
      creating: true
    })

    if(this.state.name && this.state.type) {
      this.props.createProject.execute(this, this.state.name, this.state.type)
    }
  }

  renderCreateProject= () => {
    return <div>
        {this.renderCreationMessage()}
        <h3>
          Create a new project: 
        </h3>
        {this.renderProjectForm()}
      </div>
  }

  renderCreationMessage = () => {
    if (this.state.projectCreated) {
      return <p data-test="project-created-message">Congrats your new project has been created!</p>
    } else {
      return null;
    }
  } 
  
  renderProjectForm = () => {
    return <div>
        <div className="form-group">
          <label htmlFor="projectName">Enter the name of the project</label>
          <input
            className="form-control"
            id="projectName"
            data-test="create-project-name"
            placeholder="Project Name"
            onChange={e => this.onFieldChange(e.target.value, "name")}
          />
        </div>
        <div className="form-group">
          <label className="radio" htmlFor="projectType">Please select the scheme for this project</label>
          <select
            data-test="create-project-type"
            className="form-control"
            id="projectType"
            onChange={e => this.onFieldChange(e.target.value, "type")}
          >
            <option value="ac">Accelerated Construction</option>
            <option value="hif">Marginal Viability Fund</option>
            
          </select>
        </div>
        <button
          className="btn btn-primary"
          data-test="create-project-submit"
          onClick={() => this.onProjectCreate()}
        >
          Create this project
        </button>
      </div>
  }

  render() {
    if (this.props.getRole.execute().role === "Superuser") {
      return <div data-test="admin">{this.renderCreateProject()}</div>
    }

    return null;
  }
}

