import React from "react";
import PropTypes from "prop-types";
import ParentForm from "../ParentForm";
import ValidationMessage from "../ValidationMessage";

export default class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.data,
      formSchema: this.props.schema,
      valid: true,
      status: "ready",
      prettyInvalidPaths: [[]],
      action: ""
    };
  }

  async componentDidMount() {
    document.title = "Project - Homes England Monitor";
  }

  creationSuccess() {
    this.setState({ status: "submitted" });
  }

  creationFailure() {
  }

  projectUpdated() {
    this.setState({ status: "saved" });
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
      status: "updating",
      action: "Submit",
      valid: true,
      prettyInvalidPaths: [[]],
    });

    if (this.props.status==="LA Draft") {
      await this.validateProject();
    }
    
    if (this.state.valid) {
      await this.props.submitProject.execute(this, this.props.match.params.id);
    } else {
      this.setState({ status: "ready" });
    }
    e.preventDefault();
  };

  updateProject = async e => {
    this.setState({
      status: "updating",
      valid: true,
      action: "Update",
      prettyInvalidPaths: [[]]
    });

    if (this.props.status==="LA Draft") {
      await this.validateProject();
    }

    await this.props.updateProject.execute(
      this,
      this.props.match.params.id,
      this.state.formData
    );
    e.preventDefault();
  };

  invalidateFields = async prettyInvalidPaths => {
    await this.setState({
      prettyInvalidPaths: prettyInvalidPaths,
      valid: false
    });
  };

  renderForm() {
    return (
      <div>
        <ParentForm
          data-test="project-form"
          documentGateway={this.props.documentGateway}
          formData={this.state.formData}
          schema={this.state.formSchema}
          uiSchema={this.props.uiSchema}
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

  renderSuccessOrForm() {
    if (this.state.status==="submitted") {
      return(this.renderSubmitSuccess())
    } else if (this.state.status==="updating") {
      return (
        <div>
          <button
            data-test="disabled-submit-project-button"
            className="btn form-button disabled"
            onClick={this.submitProject}
          >
            Create this project
          </button>
          <button
            data-test="disabled-update-project-button"
            className="btn form-button disabled"
            onClick={this.updateProject}
          >
            Save draft
          </button>
          <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        </div>
      );
    } else {
      return (                
        <div>
          <ValidationMessage
            valid={this.state.valid}
            type={this.state.action}
            invalidPaths={this.state.prettyInvalidPaths}
          />
          {this.renderSaveSuccess()}
          <button
            data-test="submit-project-button"
            className="btn form-button btn-primary"
            onClick={this.submitProject}
          >
            Create this project
          </button>
          <button
            data-test="update-project-button"
            className="btn form-button btn-primary"
            onClick={this.updateProject}
          >
            Save draft
          </button>
          <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        </div>
      );
    }
  }

  renderSaveSuccess() {
    if (this.state.status==="saved") {
      return <div data-test="project-update-success">Project updated!</div>;
    }
  }
  renderSubmitSuccess() {
    if(this.props.status==="LA Draft") {
      return <div data-test="project-create-success">Project created!</div>;
    } else {
      return <div data-test="project-initial-create-success">Draft Project Created!</div>
    }
  }


  render() {
    return <div className="container-fluid">{this.renderSuccessOrForm()}</div>;
  }
}

NewProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  submitProject: PropTypes.object.isRequired,
  updateProject: PropTypes.object.isRequired
};
