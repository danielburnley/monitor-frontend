import React from "react";
import PropTypes from "prop-types";
import ParentForm from "../ParentForm";
import ErrorMessage from "../ErrorMessage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./style.css";

export default class BaselinePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.data,
      formSchema: this.props.schema,
      valid: true,
      status: "ready",
      prettyInvalidPaths: [[]],
      action: "",
      userRole: this.props.getRole.execute().role,
      timestamp: this.props.timestamp
    };
  }

  async componentDidMount() {
    document.title = "Project - Homes England Monitor";
  }

  creationSuccess() {
    this.setState({ status: "submitted" });
  }

  creationFailure() {
    this.setState({ status: "SubmissionFailure" });
  }

  projectUpdated = async (errors, timestamp) => {
    if (timestamp) {
      this.setState({
        timestamp: timestamp
      });
    }

    if (errors && errors.length > 0) {
      await this.setState({
        errors: errors,
        status: "ready"
      });
    } else if (this.state.status === "updating") {
      await this.setState({
        status: "saved"
      });
    }
  }

  projectNotUpdated() {
    this.setState({ status: "UpdateFailure" });
  }

  validateProject = async () => {
    await this.props.validateProject.execute(
      this,
      this.props.projectId,
      this.props.projectType,
      this.state.formData
    );
  };

  validationUnsuccessful = async () => {
    await this.setState({validationSuccess: false});
  };

  validationSuccessful = async () => {
    await this.setState({validationSuccess: true})
  };

  submitProject = async e => {
    this.setState({
      status: "submitting",
      action: "Submit",
      valid: true,
      prettyInvalidPaths: [[]]
    });

    await this.props.updateProject.execute(this, {
      projectId: this.props.projectId,
      data: this.state.formData,
      timestamp: this.state.timestamp
    });

    await this.validateProject();

    if (this.state.valid && this.state.validationSuccess) {
      await this.props.submitProject.execute(this, this.props.projectId);
    } else {
      await this.setState({ status: "ready" });
    }
    e.preventDefault();
  };

  updateProject = async e => {
    await this.setState({
      status: "updating",
      valid: true,
      action: "Update",
      prettyInvalidPaths: [[]]
    });

    await this.validateProject();

    await this.props.updateProject.execute(this, {
      projectId: this.props.projectId,
      data: this.state.formData,
      timestamp: this.state.timestamp
    });
    e.preventDefault();
  };

  invalidateFields = async prettyInvalidPaths => {
    await this.setState({
      prettyInvalidPaths,
      valid: false,
      validationSuccess: true
    });
  };

  isLoading() {
    return (
      this.state.status === "updating" || this.state.status === "submitting"
    );
  }

  renderForm() {
    return (
      <div>
        <ParentForm
          data-test="project-form"
          formContext={{
            projectId: this.props.projectId,
            getInfrastructures: this.props.getInfrastructures
          }}
          documentGateway={this.props.documentGateway}
          formData={this.state.formData}
          schema={this.state.formSchema}
          uiSchema={this.props.uiSchema}
          getRole={this.props.getRole}
          onChange={e => {
            this.setState({
              formData: e.formData,
              status: "ready"
            });
          }}
        />
      </div>
    );
  }

  renderDisabledSubmitButton() {
    if (
      this.state.userRole === "Homes England" ||
      this.state.userRole === "Superuser"
    ) {
      return (
        <button
          data-test="disabled-submit-project-button"
          className="btn form-button disabled"
        >
          Create this project
        </button>
      );
    }
    return null;
  }

  renderButtons() {
    if (this.props.status === "Submitted") return null;
    return <div>
      {this.renderSubmitButton()}
      <button
        data-test="update-project-button"
        className="btn form-button btn-primary"
        onClick={this.updateProject}
      >
        Save draft
      </button>
    </div>
  }

  renderSubmitButton() {
    if (
      this.state.userRole === "Homes England" ||
      this.state.userRole === "Superuser"
    ) {
      return (
        <button
          data-test="submit-project-button"
          className="btn form-button btn-primary"
          onClick={this.submitProject}
        >
          Create this project
        </button>
      );
    }
    return null;
  }

  renderDisabledButtons() {
    if (this.props.status === "Submitted") return null;
    return <div>
      {this.renderDisabledSubmitButton()}
      <button
        data-test="disabled-update-project-button"
        className="btn form-button disabled"
      >
        Save draft
      </button>
    </div>
  }

  renderSubmissionFailure = () => {
    if (this.state.status === "SubmissionFailure") {
      return (
        <div
          className="alert alert-danger"
          role="alert"
          data-test="submitted-button-error"
        >
          <strong>Error:</strong> Failed to submit, please ensure that you are
          connected to the internet.
        </div>
      );
    }
  };

  renderSaveFailure = () => {
    if (this.state.status === "UpdateFailure") {
      return (
        <div
          className="alert alert-danger"
          role="alert"
          data-test="save-button-error"
        >
          <strong>Error:</strong> Failed to save, please ensure that you are
          connected to the internet.
        </div>
      );
    }
  };

  renderSuccessOrForm() {
    if (this.state.status === "submitted") {
      return this.renderSubmitSuccess();
    } else if (this.isLoading()) {
      return (
        <div>
          {this.renderDisabledButtons()}
          <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        </div>
      );
    } else {
      return (
        <div>
          <ErrorMessage
            validationSuccess={this.state.validationSuccess}
            valid={this.state.valid}
            type={this.state.action}
            invalidPaths={this.state.prettyInvalidPaths}
            errors={this.state.errors}
          />
          {this.renderSubmissionFailure()}
          {this.renderSaveFailure()}
          {this.renderSaveSuccess()}
          <div className="row">
            {this.renderButtons()}
          </div>
          <div className="row no-edge">{this.renderForm()}</div>
        </div>
      );
    }
  }

  renderSaveSuccess() {
    if (this.state.status === "saved") {
      return <div data-test="project-update-success">Baseline updated!</div>;
    }
  }

  projectLink() {
    return (
      <a href={this.getProjectURL()} data-test="project-url">
        {this.getProjectURL()}
      </a>
    );
  }

  getProjectURL = () => {
    return this.props.projectURL.execute(this.props.projectId);
  };

  getEmailSubject() {
    let type = this.props.projectType ? this.props.projectType : "";
    return `Your ${type.toUpperCase()} Project`;
  }

  getEmailBody() {
    return `Follow this link to view your project: ${this.getProjectURL()}`;
  }

  renderSubmitSucessMessage() {
    return (
      <div data-test="project-create-success">
        Project created!
        <p>View your project or submit a return here {this.projectLink()}</p>
      </div>
    );
  }

  renderSubmitSuccess() {
    return (
      <div data-test="share-project-link">
        {this.renderSubmitSucessMessage()}
        <CopyToClipboard text={this.getProjectURL()}>
          <button className="btn-primary btn">
            {" "}
            Copy to Clipboard{" "}
            <span className="glyphicon glyphicon-copy" aria-hidden="true" />
          </button>
        </CopyToClipboard>
        <a
          className="btn-primary btn margin-left"
          href={`mailto:?body=${this.getEmailBody()}&subject=${this.getEmailSubject()}`}
        >
          Email this Project{" "}
          <span className="glyphicon glyphicon-envelope" aria-hidden="true" />
        </a>
      </div>
    );
  }

  renderMandatoryWarning() {
    if (this.state.status === "submitted" || this.state.status === "updating") {
      return null;
    } else if (this.props.status === "LA Draft") {
      return <p>Fields marked with * are mandatory</p>;
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.renderMandatoryWarning()}
        {this.renderSuccessOrForm()}
      </div>
    );
  }
}

BaselinePage.propTypes = {
  data: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  submitProject: PropTypes.object.isRequired,
  updateProject: PropTypes.object.isRequired
};
