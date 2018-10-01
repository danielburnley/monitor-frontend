import React from "react";
import ReturnForm from "../ReturnForm";
import ValidationMessage from "../ValidationMessage";
import "./style.css";

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, valid: true, invalidPaths: [], lastAction: "Create" };
  }

  projectId = () => {
    return this.props.match.params.projectId;
  };

  returnId = () => {
    return this.props.match.params.returnId;
  };

  submissionSuccessful = async () => {
    let uiSchema = await this.props.generateSubmittedSchema.execute(
      this.state.formSchema
    );
    this.setState({ status: "Submitted", formUISchema: uiSchema });
  };

  onFormSubmit = async formData => {
    this.setState({status: "Updating", valid: true, invalidPaths: [], lastAction: "Submit"});

    await this.props.validateReturn.execute(this, this.props.match.params.projectId, formData);

    await this.props.updateReturn.execute(this, {
      projectId: this.projectId(),
      returnId: this.returnId(),
      data: formData
    });

    if (this.state.valid) {
      await this.props.submitReturn.execute(this, {
        projectId: this.projectId(),
        returnId: this.returnId(),
        data: formData
      });
    }
  };

  onFormCreate = async formData => {
    this.props.createReturn.execute(this, {
      projectId: this.projectId(),
      data: formData
    });
  };

  onFormSave = async formData => {
    this.setState({status: "Updating", valid: true, invalidPaths: [], lastAction: "Save"});
    this.props.updateReturn.execute(this, {
      projectId: this.projectId(),
      returnId: this.returnId(),
      data: formData
    });

    await this.props.validateReturn.execute(this, this.props.match.params.projectId, formData);
    this.setState({status: "Updated"});
  };

  invalidateFields = async (pathList) => {
    this.setState({valid: false, invalidPaths: pathList});
  };

  presentReturnNotFound = async () => {};

  presentReturn = async returnData => {
    let uiSchema = {};
    if (returnData.status === "Submitted") {
      uiSchema = this.props.generateSubmittedSchema.execute(returnData.schema);
    } else {
      uiSchema = this.props.generateUISchema.execute(returnData.schema);
    }

    await this.setState({
      loading: false,
      formData: returnData.data,
      formSchema: returnData.schema,
      formUISchema: uiSchema,
      status: returnData.status || "New"
    });
  };

  creationSuccessful = async returnId => {
    this.props.history.push(`/project/${this.projectId()}/return/${returnId}`);
  };

  updateSuccessful = async () => {
    this.setState({status: "Updated"});
  };

  updateUnsuccessful = async () => {};

  fetchData = async () => {
    if (this.returnId()) {
      await this.props.getReturn.execute(this, {
        id: this.returnId()
      });
    } else {
      await this.props.getBaseReturn.execute(this, {
        projectId: this.projectId()
      });
    }
  };

  async componentDidMount() {
    document.title = "Return - Homes England Monitor";
    await this.fetchData();
  }

  onFormChange = (e) => {
    this.setState({status: "Editing", lastAction: "Change"});
  }

  renderForm() {
    if (this.state.loading) {
      return <div/>;
    }

    return (
      <ReturnForm
        onSave={this.onFormSave}
        onSubmit={this.onFormSubmit}
        onCreate={this.onFormCreate}
        onChange={this.onFormChange}
        data={this.state.formData}
        schema={this.state.formSchema}
        uiSchema={this.state.formUISchema}
        status={this.state.status}
      />
    );
  }

  backToProject = e => {
    this.props.history.push(`/project/${this.projectId()}`);
    e.preventDefault();
  };


  renderSaveSuccessAlert() {
    if (this.state.status === "Updated") {
      return (
        <div data-test="saveSuccess" role="alert" className="alert alert-success">
          Draft saved!
        </div>
      )
    }
    if (this.state.status === "Submitted" && this.state.lastAction === "Submit") {
      return (
        <div data-test="submitSuccess" role="alert" className="submit-success">
          <h3 className="checkmark">✔</h3>
          <h3>Return submitted!</h3>
          <h4 className="subheading">All members of this project have been sent an email with a link to view this return</h4>
        </div>
      )
    }
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <div className="col-md-2 back-to-project">
            <button
              className="btn btn-link btn-lg btn-block"
              onClick={this.backToProject}
            >
              Back to project overview
            </button>
          </div>
        </div>
        <div className="row">
          <ValidationMessage valid={this.state.valid} invalidPaths={this.state.invalidPaths} type={this.state.lastAction}/>
          {
            this.renderSaveSuccessAlert()
          }
          <div className="row">
            {(this.state.status !== "Submitted" || this.state.lastAction !== "Submit") &&
              <div data-test="return" className="return col-md-12">
                {this.renderForm()}
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
