import React from 'react';
import ReturnForm from '../ReturnForm';

export default class ReturnPage extends React.Component {
  constructor() {
    super();
    this.state = {loading: true};
  }

  submissionSuccessful = returnId => {
    this.props.history.push(`return/${returnId}`);
  };

  onFormSubmit = async formData => {
    this.props.submitReturn.execute(this, {
      projectId: this.props.match.params.projectId,
      data: formData,
    });
  };

  presentReturn = async returnData => {
    await this.setState({
      loading: false,
      formData: returnData.data,
      formSchema: returnData.schema,
    });
  };

  presentProject = async projectData => {
    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
    });
  };

  fetchData = () => {
    if (this.props.match.params.returnId) {
      this.props.getReturn.execute(this, {
        id: this.props.match.params.returnId,
      });
    } else {
      this.props.getBaseReturn.execute(this, {
        projectId: this.props.match.params.projectId,
      });
    }
  };

  isReadOnly = () => {
    return !(this.props.match.params.returnId === undefined);
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
        onSubmit={this.onFormSubmit}
        data={this.state.formData}
        schema={this.state.formSchema}
        readOnly={this.isReadOnly()}
      />
    );
  }

  backToProject = e => {
    this.props.history.push(`/project/${this.props.match.params.projectId}`);
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
