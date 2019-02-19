import React from "react";
import PropTypes from "prop-types";
import ParentForm from "../ParentForm";
import ErrorMessage from "../ErrorMessage";
import { CopyToClipboard } from "react-copy-to-clipboard";
import "./style.css";

export default class NewProjectPage extends React.Component {
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

  creationFailure() {}

  projectUpdated(errors, timestamp) {
    if(timestamp) {
      this.setState({
        timestamp: timestamp
      })
    }

    if(errors && errors.length > 0) {
      this.setState({
        errors: errors,
        status: "ready"
      })
    } else if(this.state.status === "updating") {
      this.setState({
        status: "saved"
      });
    }
  }

  projectNotUpdated() {}

  validateProject = async () => {
    await this.props.validateProject.execute(
      this,
      this.props.match.params.id,
      this.props.projectType,
      this.state.formData
    );
  };

  submitProject = async e => {
    this.setState({
      status: "submitting",
      action: "Submit",
      valid: true,
      prettyInvalidPaths: [[]]
    });

    await this.props.updateProject.execute(
      this,
      this.props.match.params.id,
      this.state.formData,
      this.state.timestamp
    );

    await this.validateProject();

    if (this.state.valid) {
      await this.props.submitProject.execute(this, this.props.match.params.id);
    } else {
      this.setState({ status: "ready" });
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

    await this.props.updateProject.execute(
      this,
      this.props.match.params.id,
      this.state.formData,
      this.state.timestamp
    );
    e.preventDefault();
  };

  invalidateFields = async prettyInvalidPaths => {
    await this.setState({
      prettyInvalidPaths: prettyInvalidPaths,
      valid: false
    });
  };

  isLoading() {
    return this.state.status === "updating" || this.state.status === "submitting"
  }

  renderForm() {
    return (
      <div>
        <ParentForm
          data-test="project-form"
          formContext = {{projectId: this.props.match.params.id}}
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
    if (this.state.userRole === "Homes England" || this.state.userRole === "Superuser") {
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

  renderSubmitButton() {
    if (this.state.userRole === "Homes England" || this.state.userRole === "Superuser") {
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

  renderSuccessOrForm() {
    if (this.state.status === "submitted") {
      return this.renderSubmitSuccess();
    } else if (this.isLoading()) {
      return (
        <div>
          { this.renderDisabledSubmitButton() }
          <button
            data-test="disabled-update-project-button"
            className="btn form-button disabled"
          >
            Save draft
          </button>
          <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        </div>
      );
    } else {
      return (
        <div>
          <ErrorMessage
            valid={this.state.valid}
            type={this.state.action}
            invalidPaths={this.state.prettyInvalidPaths}
            errors={this.state.errors}
          />
          { this.renderSaveSuccess() }
          <div className="row">
            { this.renderSubmitButton() }
            <button
              data-test="update-project-button"
              className="btn form-button btn-primary"
              onClick={this.updateProject}
            >
              Save draft
            </button>
          </div>
          <div className="row no-edge">{this.renderForm()}</div>
        </div>
      );
    }
  }

  renderSaveSuccess() {
    if (this.state.status === "saved") {
      return <div data-test="project-update-success">Project updated!</div>;
    }
  }

  getProjectLink() {
    return <a href={this.getProjectURL()}>{this.getProjectURL()}</a>;
  }

  getProjectURL() {
    let path = window.location.href;
    let endChar = path.includes("?") ? path.indexOf("?") : path.length;
    return path.substr(0, endChar);
  }

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
        <p>
          View your project or submit a return here {this.getProjectLink()}
        </p>
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
        <div className="title-container">
          <div className="row">
            <h2>Baseline Editor</h2>
          </div>
        </div>
        {this.renderMandatoryWarning()}
        {this.renderSuccessOrForm()}
      </div>
    );
  }
}

NewProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  submitProject: PropTypes.object.isRequired,
  updateProject: PropTypes.object.isRequired
};
