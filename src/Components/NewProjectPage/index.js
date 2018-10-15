//There's going to be the same race condition that we had with the return form here,
// we need a mutex on the buttons later
import React from 'react';
import ParentForm from '../ParentForm';

export default class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, formData: {}, submitted: false};
  }

  presentProject = async projectData => {
    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
      saved: false
    });
  };

  presentProjectNotFound = async () => {

  };

  fetchData = async () => {
    await this.props.getProject.execute(this, {id: this.props.match.params.id});
  };

  async componentDidMount() {
    document.title = "Project - Homes England Monitor"
    await this.fetchData();
  }

  creationSuccess() {
    this.setState({submitted: true});
  }

  creationFailure() {
  }

  projectUpdated() {
    this.setState({saved: true});
  }

  projectNotUpdated() {

  }

  submitProject = async e => {
    await this.props.submitProject.execute(this, this.props.match.params.id);

    e.preventDefault();
  };

  updateProject = async e => {
    await this.props.updateProject.execute(this, this.props.match.params.id, this.state.formData);

    e.preventDefault();
  };

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <div>
        <ParentForm
          formData={this.state.formData}
          schema={this.state.formSchema}
          onChange={e => {this.setState({formData: e.formData, saved: false})}}
        />
      </div>
    );
  }

  renderSuccessOrForm() {
    if (this.state.submitted) {
      return <div data-test="project-create-success">Project created!</div>;
    } else {
      return <div>
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        <button data-test="submit-project-button" className="btn btn-primary" onClick={this.submitProject}>
          Create this project
        </button>
        <button data-test="update-project-button" className="btn btn-primary" onClick={this.updateProject}>
          Save draft
        </button>
        { this.renderSaveSuccess() }
    </div>;
    }
  }

  renderSaveSuccess() {
    if (this.state.saved) {
      return <div data-test="project-update-success">Project updated!</div>;
    }
  }

  render() {
    return (
      <div className="container-fluid">
        { this.renderSuccessOrForm() }
      </div>
    );
  }
}
