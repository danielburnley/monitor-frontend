import React from "react";
import ReturnForm from "../ReturnForm";

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, valid: true, invalid_paths: [], lastAction: "Create" };
  }

  projectId = () => {
    return this.props.match.params.projectId;
  };

  returnId = () => {
    return this.props.match.params.returnId;
  };

  submissionSuccessful = () => {
    let uiSchema = this.props.generateSubmittedSchema.execute(
      this.state.formSchema
    );
    this.setState({ status: "Submitted", formUISchema: uiSchema });
  };

  onFormSubmit = async formData => {
    this.setState({status: "Updating", valid: true, invalid_paths: [], lastAction: "Submit"});

    await this.props.validateReturn.execute(this, this.props.match.params.projectId, formData);

    await this.props.updateReturn.execute(this, {
      returnId: this.returnId(),
      data: formData
    });

    if (this.state.valid)
    {
      await this.props.submitReturn.execute(this, {
        returnId: this.returnId(),
        data: formData
      });
    }
    this.setState({status: "Editing"});
  };

  onFormCreate = async formData => {
    this.props.createReturn.execute(this, {
      projectId: this.projectId(),
      data: formData
    });
  };

  onFormSave = async formData => {
    this.setState({status: "Updating", valid: true, invalid_paths: [], lastAction: "Save"});
    this.props.updateReturn.execute(this, {
      returnId: this.returnId(),
      data: formData
    });

    await this.props.validateReturn.execute(this, this.props.match.params.projectId, formData);
    this.setState({status: "Editing"});
  };

  invalidateFields = async (pathList) => {
    this.setState({valid: false, invalid_paths: pathList});
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

  updateSuccessful = async () => {};
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
    this.setState({lastAction: "Change"});
  }

  renderForm() {
    if (this.state.loading) {
      return <div />;
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

  decamelize = (string) => {
    let all_camelcase_word_boundaries = /(^.|[A-Z])/g;
    return string.replace(all_camelcase_word_boundaries, (character) => " "+character.toUpperCase());
  }

  renderInvalidPaths = () => {
    return this.state.invalid_paths.map(path => {
      return (<span key={path}>
        {path.map(this.decamelize).join(' → ')}<br/>
      </span>)
    })
  };

  renderSuccessAlerts() {
    if (this.state.lastAction === "Save")
    {
      return (
        <div data-test="saveSuccess" role="alert" className="alert alert-success">
          Draft saved!
        </div>
      )
    } else if (this.state.lastAction === "Submit") {
      return (
        <div data-test="submitSuccess" role="alert" className="alert alert-success">
          Return submitted!
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
        <div className="row"> {
          !this.state.valid ?
            <div className="alert alert-danger" role="alert" data-test="validationError">
              This return cannot be submitted until the following fields are filled: <br/>
              {this.renderInvalidPaths()}
            </div> : this.renderSuccessAlerts()
          }
          <div data-test="return" className="return col-md-12">
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}
