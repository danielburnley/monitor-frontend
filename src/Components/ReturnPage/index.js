import React from 'react';
import ReturnForm from '../ReturnForm';

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  projectId = () => {
    return this.props.match.params.projectId;
  };

  returnId = () => {
    return this.props.match.params.returnId;
  };

  submissionSuccessful = () => {
    this.setState({status: 'Submitted'})
  };

  onFormSubmit = async formData => {
    this.props.submitReturn.execute(this, {
      returnId: this.returnId(),
      data: formData,
    });
  };

  onFormCreate = async formData => {
    this.props.createReturn.execute(this, {
      projectId: this.projectId(),
      data: formData,
    });
  };

  onFormSave = async formData => {
    this.props.updateReturn.execute(this, {
      returnId: this.returnId(),
      data: formData,
    });
  };

  presentReturn = async returnData => {
    await this.setState({
      loading: false,
      formData: returnData.data,
      formSchema: returnData.schema,
      status: returnData.status || 'New',
    });
  };

  creationSuccessful = async returnId => {
    this.props.history.push(`/project/${this.projectId()}/return/${returnId}`);
  };

  updateSuccessful = async () => {};

  fetchData = async () => {
    if (this.returnId()) {
      await this.props.getReturn.execute(this, {
        id: this.returnId(),
      });
    } else {
      await this.props.getBaseReturn.execute(this, {
        projectId: this.projectId(),
      });
    }
  };

  async componentDidMount() {
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
      <div className="container-fluid">
        <div className="col-md-2 back-to-project">
          <button
            className="btn btn-link btn-lg btn-block"
            onClick={this.backToProject}>
            Back to project overview
          </button>
        </div>
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
      </div>
    );
  }
}
