import React from 'react'
import ProjectForm from '../ProjectForm'
import ProjectSummary from './ProjectSummary'

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  presentProject = async projectData => {
    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
    });
  };

  presentProjectNotFound = async () => {

  };

  fetchData = async () => {
    await this.props.getProject.execute(this, {id: this.props.match.params.id});
  };

  async componentDidMount() {
    await this.fetchData();
  }

  createReturn = async e => {
    this.props.history.push(`/project/${this.props.match.params.id}/return`);
    e.preventDefault();
  };

  renderForm() {
    if (this.state.loading) {
      return <div />;
    }

    return (
      <div>
        <ProjectSummary
          data={this.state.formData}
          schema={this.state.formSchema}
        />
        <button data-test="new-return-button" className="btn btn-primary" onClick={this.createReturn}>
          Create a new return
        </button>
      </div>
    );
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
      </div>
    );
  }
}
