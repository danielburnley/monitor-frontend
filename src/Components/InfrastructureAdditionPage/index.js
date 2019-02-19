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
      id: this.props.match.params.id
    });
  };

  presentProject = async ({schema, data}) => {
    await this.setState({schema, data, loading: false})
  }

  render() {
    if (!this.state.loading) {
      return <Form
        schema={this.state.schema.properties.infrastructures}
        formData = {this.state.data.infrastructures}
      />;
    }
    return null;
  }
}
