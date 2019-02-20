import React from "react";
import Form from "react-jsonschema-form";

export default class InfrastructureAdditionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    this.props.getProject.execute(this, {
      id: this.getProjectId()
    });
  };

  presentProject = async ({schema, data}) => {
    await this.setState({schema, data, loading: false})
  }

  projectUpdated = async () => {
    this.props.history.push(`/project/${this.getProjectId()}/new`)
  }

  getProjectId = () => this.props.match.params.id

  submitInfrastructures = async ({formData}) => {
    await this.props.updateProject.execute(
      this, this.getProjectId(),
      {...this.state.data, infrastructures: formData},
      0
    )
  }

  render() {
    if (!this.state.loading) {
      return <Form
        onSubmit = {this.submitInfrastructures}
        schema={this.state.schema.properties.infrastructures}
        formData = {this.state.data.infrastructures}
      />;
    }
    return null;
  }
}
