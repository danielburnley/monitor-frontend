import React from 'react'
import ProjectForm from '../ProjectForm'

export default class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = {loading: true};
  }

  presentProject = async projectData => {
    let uiSchema = this.props.generateUISchema.execute(projectData.schema)
    await this.setState({
      loading: false,
      formData: projectData.data,
      formSchema: projectData.schema,
      formUISchema: uiSchema
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
        <ProjectForm
          reviewId={this.props.match.params.id}
          data={this.state.formData}
          schema={this.state.formSchema}
          uiSchema={this.state.formUISchema}
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
