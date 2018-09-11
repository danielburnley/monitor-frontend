import React from "react";
import ReturnForm from "../ReturnForm";

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, valid: true, invalid_paths: [] };
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
    await this.props.updateReturn.execute(this, {
      returnId: this.returnId(),
      data: formData
    });
    this.props.submitReturn.execute(this, {
      returnId: this.returnId(),
      data: formData
    });
  };

  onFormCreate = async formData => {
    this.props.createReturn.execute(this, {
      projectId: this.projectId(),
      data: formData
    });
  };

  onFormSave = async formData => {
    this.props.updateReturn.execute(this, {
      returnId: this.returnId(),
      data: formData
    });

    this.setState({valid: true, invalid_paths: []});
    this.props.validateReturn.execute(this, this.props.match.params.projectId, formData);
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

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <ReturnForm
        onSave={this.onFormSave}
        onSubmit={this.onFormSubmit}
        onCreate={this.onFormCreate}
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
          { !this.state.valid ?
            <div className="alert alert-danger" role="alert">
              This return is missing a required field
            </div> : <div/>
          }
          <div data-test="return" className="return col-md-12">
            {this.renderForm()}
          </div>
        </div>
      </div>
    );
  }
}
