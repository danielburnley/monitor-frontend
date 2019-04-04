import React from "react";
import runtimeEnv from "@mars/heroku-js-runtime-env";
import "./style.css";

export default class AdminPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectCreated: false,
      userAdded: false,
      lastProjectUserAddedTo: null,
      bidId: "",
      name: "",
      id: "",
      email: "",
      errors: []
    };
    this.env = runtimeEnv();
  }

  creationSuccess = async id => {
    await this.setState({
      projectCreated: true,
      id: id,
      bidId: "",
      name: "",
      type: null
    });
  };

  creationFailure = () => {};

  onFieldChange = (value, field) => {
    this.setState({
      [field]: value
    });
  };

  userAddedSuccess = async (projectId) => {
    await this.setState({
      userAdded: true,
      lastProjectUserAddedTo: projectId,
      id: "",
      role: null,
      email: ""
    });
  };

  userAddedFailure = () => {};

  checkError = (value, type) => {
    let errors = this.state.errors
    if (!value && !errors.includes(type)) {
      errors.push(type)
    } else if (value && errors.includes(type)) {
      errors.splice(errors.indexOf(type), 1)
    } 
    this.setState({
      errors: errors 
    })
  }

  validateCreation = () => {
    this.checkError(this.state.type, "projectType")
    this.checkError(this.state.name, "projectName")
    this.checkError(this.state.bidId, "projectBidId")
    
    return !this.state.errors.includes("projectType") &&
    !this.state.errors.includes("projectName") &&
     !this.state.errors.includes("projectBidId")
  }

  onProjectCreate = async () => {
    let success = this.validateCreation();
    if (success) {
      await this.props.createProject.execute(
        this,
        this.state.name,
        this.state.type,
        this.state.bidId
      );
      await this.addSelf();
    } else {
      this.setState({
        projectCreated: false
      })
    }
  };

  addSelf = async () => {
    await this.props.addUsersToProject.execute(this, this.state.id);
  }

  validateUserAddition = () => {
    this.checkError(this.state.id, "projectId")
    this.checkError(this.state.role, "userRole")
    this.checkError(this.state.email, "userEmail")
    
    return !this.state.errors.includes("projectId") &&
    !this.state.errors.includes("userRole") &&
     !this.state.errors.includes("userEmail")
  }

  addUser = async () => {
    let success = this.validateUserAddition()

    if(success) {
      await this.props.addUsersToProject.execute(this, this.state.id, [
        { email: this.state.email, role: this.state.role }
      ]);
    } else {
      this.setState({
        userAdded: false
      })
    }
  };

  renderCreateProject = () => {
    console.log(this.state)
    return (
      <div>
        <h3>Create a new project</h3>
        {this.renderProjectForm()}
      </div>
    );
  };

  renderMessage = () => {
    return <div>
      {this.renderSuccessMessage()}
      {this.renderValidationMessage()}
    </div>
  }

  renderSuccessMessage = () => {
    if (this.state.projectCreated) {
      return (
        <div
        role="alert"
        className="alert alert-success"
        data-test="project-created-message"
        >
          <p>
            Your new project has been created!
          </p>
        </div>
      );
    } else if (this.state.userAdded) {
      return <div
        role="alert"
        className="alert alert-success"
        data-test="user-added"
        >
          <p>The user has been added!</p>
        </div> 
      
    } else {
      return null;
    }
  };

  renderValidationMessage = () => {
    if (this.state.errors.length > 0) {
      return <div
      className="alert alert-danger"
      role="alert"
      data-test="validation-message"
      >
        <p>Please fill in all neccessary fields. </p>
      </div>
    }
  }

  isInvalid = (field, type) => {
    if (this.state.errors.includes(field))
    return `is-invalid${type}`
  }

  renderProjectDetails = () => {
    return (
      <div>
        <div className="form-group">
          <label className={`${this.isInvalid('projectName', "")}`} htmlFor="projectName">Enter the name of the project</label>
          <input
            className={`form-control ${this.isInvalid('projectName', "")}`}
            id="projectName"
            value={this.state.name}
            data-test="create-project-name"
            placeholder="Project Name"
            onChange={e => this.onFieldChange(e.target.value, "name")}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectType" className={`${this.isInvalid('projectType', "")}`}>
            Please select the scheme for this project
          </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="ac"
                className={`${this.isInvalid("projectType", "-radio")}`}
                name="projectType"
                checked={this.state.type === "ac"}
                data-test="create-project-ac"
                onChange={e => this.onFieldChange(e.target.value, "type")}
              />
              Accelerated Construction
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="hif"
                name="projectType"
                className={`${this.isInvalid("projectType", "-radio")}`}
                checked={this.state.type === "hif"}
                data-test="create-project-hif"
                onChange={e => this.onFieldChange(e.target.value, "type")}
              />
              Marginal Viability Fund
            </label>
          </div>
          {this.renderFfOption()}
        </div>
        <div className="form-group">
          <label htmlFor="projectBidId" className={`${this.isInvalid('projectBidId', "")}`}>
            Enter BID reference for the project (e.g: HIF/MV/1)
          </label>
          <input
            id="projectBidId"
            value={this.state.bidId}
            className={`form-control ${this.isInvalid('projectBidId', "")}`}
            data-test="create-project-bidId"
            placeholder="BID reference"
            onChange={e => this.onFieldChange(e.target.value, "bidId")}
          />
        </div>
      </div>
    );
  };

  renderFfOption = () => {
    if (this.env.REACT_APP_FF_OPTION_ENABLED === 'yes') {
      return (
        <div className="radio">
          <label>
            <input
              type="radio"
              value="ff"
              className="is-invalid-radio"
              name="projectType"
              className={`${this.isInvalid("projectType", "-radio")}`}
              data-test="create-project-ff"
              onChange={e => this.onFieldChange(e.target.value, "type")}
            />
            Forward Funding
          </label>
        </div>
      );
    } else {
      return null
    }
  };

  renderUserDetails = () => {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="userEmail" className={`${this.isInvalid('userEmail', "")}`}>
            Enter the user's email here.
          </label>
          <input
            className="form-control"
            data-test="user-email"
            className={`form-control ${this.isInvalid('userEmail', "")}`}
            id="userEmail"
            value={this.state.email}
            placeholder="User Email"
            onChange={e => this.onFieldChange(e.target.value, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userRole" className={`${this.isInvalid('userRole', "")}`}>
            {" "}
            Please select the user's role privileges.
          </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Local Authority"
                className={`${this.isInvalid('userRole', "-radio")}`}
                name="userRole"
                checked={this.state.role === "Local Authority"}
                data-test="user-role-la"
                onChange={e => this.onFieldChange(e.target.value, "role")}
              />
              Local Authority
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Homes England"
                className={`${this.isInvalid('userRole', "-radio")}`}
                name="userRole"
                data-test="user-role-he"
                checked={this.state.role === "Homes England"}
                onChange={e => this.onFieldChange(e.target.value, "role")}
              />
              Homes England
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                data-test="user-role-su"
                className={`${this.isInvalid('userRole', "-radio")}`}
                checked={this.state.role === "Superuser"}
                value="Superuser"
                name="userRole"
                onChange={e => this.onFieldChange(e.target.value, "role")}
              />
              Superuser
            </label>
          </div>
        </div>
      </div>
    );
  };

  renderAddUsers = () => {
    return (
      <div>
        <h3>Add a user to a project</h3>
        <p>
          You can only add users to a project here if the project has already
          been created.
        </p>
        {this.renderAddUsersForm()}
      </div>
    );
  };

  renderAddUsersForm = () => {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="projectId" className={`${this.isInvalid('projectId', "")}`}>Enter the project ID</label>
          <input
            className={`form-control ${this.isInvalid('projectId', "")}`}
            id="projectId"
            value={this.state.id}
            data-test="project-id"
            placeholder="Project ID"
            onChange={e => this.onFieldChange(e.target.value, "id")}
          />
        </div>
        {this.renderUserDetails()}
        <button
          className="btn btn-primary"
          data-test="add-user-submit"
          onClick={() => this.addUser()}
        >
          Add User
        </button>
      </div>
    );
  };

  renderProjectForm = () => {
    return (
      <div>
        {this.renderProjectDetails()}
        <button
          className="btn btn-primary"
          data-test="create-project-submit"
          onClick={() => this.onProjectCreate()}
        >
          Create this project
        </button>
      </div>
    );
  };

  renderAdminUtils = () => {
    if (this.props.getRole.execute().role === "Superuser") {
      return (
        <div data-test="admin">
          <div className="row">{this.renderMessage()}</div>
          <div className="row">
            <div className="col-sm-6">{this.renderCreateProject()}</div>
            <div className="col-sm-6">{this.renderAddUsers()}</div>
          </div>
        </div>
      );
    }

    return null;
  }

  render = () =>
    <div>
      {
        this.props.children &&
        this.props.children({lastProjectUserAddedTo: this.state.lastProjectUserAddedTo})
      }
      {this.renderAdminUtils()}
    </div>
}
