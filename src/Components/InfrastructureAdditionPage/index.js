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

  presentProject = async ({schema, data, timestamp}) => {
    await this.setState({schema, data, loading: false, timestamp})
  }

  projectUpdated = async () => {
    this.props.history.push(`/project/${this.getProjectId()}`)
  }

  getProjectId = () => this.props.match.params.projectId

  submitInfrastructures = async ({formData}) => {
    await this.props.updateProject.execute(
      this, this.getProjectId(),
      {...this.state.data, infrastructures: formData},
      this.state.timestamp
    )
  }

  render() {
    if (!this.state.loading) {
      return <Form
        onSubmit = {this.submitInfrastructures}
        uiSchema = {this.props.generateInfrastructureUISchema.execute()}
        schema={this.state.schema.properties.infrastructures}
        formData = {this.state.data.infrastructures}
      />;
    }
    return null;
  }
}
