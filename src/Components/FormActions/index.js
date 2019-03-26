import React from 'react';
import ParentForm from '../ParentForm'
import ErrorMessage from '../ErrorMessage'
import './style.css';

export default class FormActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: this.props.data,
      userRole: this.props.getRole.execute().role,
      valid: true,
      invalidPaths: [],
      lastAction: "Create",
      status: this.props.status
    };
  }

  submissionUnsuccessful = async () => {
    this.setState({ status: "SubmissionFailure" });
  };

  submissionSuccessful = async () => {
    this.setState({ status: "Submitted"});
  };

  creationSuccessful = async Id => {
    this.props.history.push(`/project/${this.props.match.params.projectId}/${this.props.formType}/${Id}`);
  };

  updateSuccessful = async () => {
    this.setState({ status: "Updated" });
  };

  updateSubmittedSuccessful = async () => {
    this.setState({ status: "Submitted" });
  };

  updateSubmittedUnsuccessful = async () => {
    this.setState({ status: "SaveSubmittedFailure" });
  };

  updateUnsuccessful = async () => {
    this.setState({ status: "UpdateFailure" });
  };

  invalidateFields = async pathList => {
    this.setState({ valid: false, invalidPaths: pathList });
  };

  validationUnsuccessful = async () => {}

  id = () => {
    return this.props.match.params[`${this.props.formType}Id`]
  }

  onFormSubmit = async formData => {
    this.setState({
      lastAction: "Submit",
      status: "Updating",
      valid: true,
      invalidPaths: [],
      prettyInvalidPaths: []
    });

    await this.props.validate.execute(
      this,
      this.props.match.params.projectId,
      formData,
      this.props.type
    );

    await this.props.update.execute(this, {
      projectId: this.props.match.params.projectId,
      id: this.id(),
      data: formData
    });

    if (this.state.valid) {
      await this.props.submit.execute(this, {
        projectId: this.props.match.params.projectId,
        id: this.id(),
        data: formData
      });
    }
  };

  onFormSaveSubmitted = async formData => {
      this.setState({
        status: "SavingSubmitted",
        valid: true,
        invalidPaths: [],
        lastAction: "SaveSubmitted"
      });

      await this.props.updateSubmitted.execute(this, {
        projectId: this.props.match.params.projectId,
        id: this.id(),
        data: formData
      });

      await this.props.validate.execute(
        this,
        this.props.match.params.projectId,
        formData,
        this.props.type
      );
    };

  onFormSave = async formData => {
    this.setState({
      status: "Updating",
      valid: true,
      invalidPaths: [],
      lastAction: "Save"
    });

    await this.props.update.execute(this, {
      projectId: this.props.match.params.projectId,
      id: this.id(),
      data: formData
    });

    await this.props.validate.execute(
      this,
      this.props.match.params.projectId,
      formData,
      this.props.type
    );
  };

  onFormCreate = async formData => {
    this.props.create.execute(this, {
      projectId: this.props.match.params.projectId,
      data: formData
    });
  };

  renderSuccessAlert() {
    if (this.state.status === "Updated") {
      return (
        <div
          data-test="saveSuccess"
          role="alert"
          className="alert alert-success"
        >
          Draft saved!
        </div>
      );
    }
    if (this.state.status === "Submitted") {
      if (this.state.lastAction === "Submit") {
        return (
          <div data-test="submitSuccess" role="alert" className="submit-success">
            <h3 className="checkmark">✔</h3>
            <h3>{`${this.capitalise(this.props.formType)}`} submitted!</h3>
            <h4 className="subheading">
              All members of this project have been sent an email with a link to
              view this {`${this.props.formType}`}
            </h4>
          </div>
        );
      } else if (this.state.lastAction === "SaveSubmitted") {
        return (
          <div
            data-test="save-submitted-success"
            role="alert"
            className="alert alert-success"
          >
            Changes saved!
          </div>
        );
      }
    }
  }

  capitalise(string) {
    return string.charAt(0).toUpperCase() + string.substring(1)
  }

  renderMandatoryWarning() {
    if (this.state.status === "submitted" || this.state.status === "updating") {
      return null;
    } else {
      return <p className="mandatory">Fields marked with * are mandatory</p>;
    }
  }

  renderSubmitButton = () => {
    if (this.state.userRole === "Local Authority") {
      return null;
    }

    return (<button
      className="btn btn-primary form-button"
      data-test="submit-button"
      onClick={() => this.onFormSubmit(this.state.formData)}>
      Submit
    </button>);
  };

  renderDisabledSubmitButton = () => {
    if (this.state.userRole === "Local Authority") {
      return null;
    }

    return (<button
      className="btn form-button disabled"
      data-test="disabled-submit-button">
      Submit {`${this.capitalise(this.props.formType)}`}
    </button>);
  };

  renderSaveSubmittedButton = () =>
    <button
      className="btn btn-primary form-button"
      data-test="save-submitted-button"
      onClick={() => this.onFormSaveSubmitted(this.state.formData)}>
      Save Changes
    </button>

  renderCreateButton = () =>
    <button
      className="btn btn-primary form-button"
      data-test="create-button"
      onClick={() => this.onFormCreate(this.state.formData)}>
      Create Draft
    </button>

  renderDisabledSaveButton = () =>
    <button
      className="btn form-button disabled"
      data-test="disabled-save-button">
      Save Draft
    </button>

  renderDisabledSaveSubmittedButton = () =>
    <button
      className="btn form-button disabled"
      data-test="disabled-save-submitted-button">
      Save Changes
    </button>

  renderSaveButton = () =>
    <button
      className="btn btn-secondary form-button"
      data-test="save-button"
      onClick={() => this.onFormSave(this.state.formData)}>
      Save Draft
    </button>

  renderActions = () => {
    if (
      this.state.status === "Submitted" ||
      this.state.status === "SaveSubmittedFailure" ||
      this.state.status === "SubmittedEditing"
    ) {
      if (this.state.userRole === "Homes England" && this.props.updateSubmitted) {
        return <div className="col-md-offset-3 col-md-9 return-actions">
          {this.renderSaveSubmittedButton()}
        </div>;
      } else {
        return <div/>;
      }
    }

    if (this.state.status === 'SavingSubmitted') {
      return <div className="col-md-offset-3 col-md-9 return-actions">
        {this.renderDisabledSaveSubmittedButton()}
      </div>;
    }

    if (this.state.status === 'New') {
      return <div className="col-md-offset-3 col-md-9 return-actions">
          {this.renderCreateButton()}
      </div>;
    }
    if (this.state.status === 'Updating') {
      return <div className="col-md-offset-3 col-md-9 return-actions">
          {this.renderDisabledSaveButton()}
          {this.renderDisabledSubmitButton()}
      </div>;
    }


    return <div className="col-md-offset-3 col-md-9 return-actions">
      {this.renderSaveButton()}
      {this.renderSubmitButton()}
    </div>;
  };

  backToProject = e => {
    this.props.history.push(`/project/${this.props.match.params.projectId}`);
    e.preventDefault();
  };


  onFormChange = async ({formData}) => {
    if(this.id()) {
      if (this.state.status === "Submitted") {
        await this.setState({
          status: "SubmittedEditing",
          lastAction: "Change"
        })
      } else {
        await this.setState({
          status: "Editing",
          lastAction: "Change"
        })
      }
    }

    this.setState({formData});
  }

  renderForm = () => (
    <div>
      {this.renderActions()}
      <ParentForm
        data-test="return-form"
        formContext={{projectId: this.props.match.params.projectId, getInfrastructures: this.props.getInfrastructures, returnStatus: this.state.status}}
        schema={this.props.schema}
        uiSchema={this.props.uiSchema}
        formData={this.state.formData}
        onChange={this.onFormChange}
        documentGateway={this.props.documentGateway}
        getRole={this.props.getRole}
        >
      </ParentForm>
    </div>
  )

  renderSubmissionFailure = () => {
    if (this.state.status === "SubmissionFailure") {
      return <div
        className="alert alert-danger"
        role="alert"
        data-test="submitted-button-error">
        <strong>Error:</strong> Failed to submit, please ensure that you are connected to the internet.
      </div>
    }
  }

  renderSaveSubmittedFailure = () => {
    if (this.state.status === "SaveSubmittedFailure") {
      return <div
        className="alert alert-danger"
        role="alert"
        data-test="save-submitted-button-error">
        <strong>Error:</strong> Failed to save, please ensure that you are connected to the internet.
      </div>
    }
  }

  renderSaveFailure = () => {
    if (this.state.status === "UpdateFailure") {
      return <div
        className="alert alert-danger"
        role="alert"
        data-test="save-button-error">
        <strong>Error:</strong> Failed to save, please ensure that you are connected to the internet.
      </div>
    }
  }

  renderFailures = () =>
    <div className="col-md-4">
      { this.renderSaveSubmittedFailure() }
      { this.renderSubmissionFailure() }
      { this.renderSaveFailure() }
      { this.renderMandatoryWarning() }
    </div>

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-2 back-to-project">
            <a
              data-test="back-to-overview"
              className="btn btn-link btn-lg btn-block"
              onClick={this.backToProject}
            >
              Back to project overview
            </a>
          </div>
        </div>
        <div className="row">
          {this.renderFailures()}
        </div>
        <div className="row">
          <ErrorMessage
            valid={this.state.valid}
            invalidPaths={this.state.invalidPaths}
            type={this.state.lastAction}
          />
          {this.renderSuccessAlert()}
        </div>
        <div className="row no-edge">
          {(this.state.status !== "Submitted" ||
            this.state.lastAction !== "Submit") && (
            <div data-test="return" className="return col-md-12">
              {this.renderForm()}
            </div>
          )}
        </div>
      </div>
    );
  }
}
