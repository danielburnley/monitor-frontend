import React from "react";
import Cookies from "js-cookie";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class AdminPortal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      projectCreated: false,
      lastProjectUserAddedTo: null,
      bidId: "",
      name: "",
      id: "",
      email: ""
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

  onProjectCreate = async () => {
    if (this.state.name && this.state.type) {
      await this.props.createProject.execute(
        this,
        this.state.name,
        this.state.type,
        this.state.bidId
      );

      await this.addSelf();
    }
  };

  addSelf = async () => {
    await this.props.addUsersToProject.execute(this, this.state.id);
  }

  addUser = async () => {
    await this.props.addUsersToProject.execute(this, this.state.id, [
      { email: this.state.email, role: this.state.role }
    ]);
  };

  renderCreateProject = () => {
    return (
      <div>
        <h3>Create a new project</h3>
        <p>You will need to login again after creating the project</p>
        {this.renderProjectForm()}
      </div>
    );
  };

  renderSuccessMessage = () => {
    if (this.state.projectCreated) {
      return (
        <p data-test="project-created-message">
          Your new project has been created!
        </p>
      );
    } else if (this.state.userAdded) {
      return <p data-test="user-added">The user has been added!</p>;
    } else {
      return null;
    }
  };

  renderProjectDetails = () => {
    return (
      <div>
        <div className="form-group">
          <label htmlFor="projectName">Enter the name of the project</label>
          <input
            className="form-control"
            id="projectName"
            value={this.state.name}
            data-test="create-project-name"
            placeholder="Project Name"
            onChange={e => this.onFieldChange(e.target.value, "name")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="projectType">
            Please select the scheme for this project
          </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="ac"
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
          <label htmlFor="projectBidId">
            Enter BID reference for the project (e.g: HIF/MV/1)
          </label>
          <input
            className="form-control"
            id="projectBidId"
            value={this.state.bidId}
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
              name="projectType"
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
          <label htmlFor="userEmail">Enter the user's email here.</label>
          <input
            className="form-control"
            data-test="user-email"
            id="userEmail"
            value={this.state.email}
            placeholder="User Email"
            onChange={e => this.onFieldChange(e.target.value, "email")}
          />
        </div>
        <div className="form-group">
          <label htmlFor="userRole">
            {" "}
            Please select the user's role privileges.
          </label>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Local Authority"
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
          <label htmlFor="projectId">Enter the project ID</label>
          <input
            className="form-control"
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
          <div className="row">{this.renderSuccessMessage()}</div>
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
