import React from "react";
import PropTypes from "prop-types";

export default class EditBaselinePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  presentProject = async projectData => {
    await this.setState({
      formSchema: projectData.schema,
      projectType: projectData.type
    });
  };

  presentBaselines = async allBaselineData => {
    let baselineData = allBaselineData.slice(-1)[0]

    let uiSchema
    if (baselineData.status === "Submitted") {
      uiSchema = this.props.generateSubmittedUiSchema.execute(this.state.formSchema)
    } else {
      uiSchema = this.props.generateUISchema.execute(this.state.formSchema, baselineData.status)
    }

    await this.setState({
      loading: false,
      formData: baselineData.data,
      formUiSchema: uiSchema,
      timestamp: baselineData.timestamp,
      status: baselineData.status
    })
  }

  presentProjectNotFound = async () => {};

  presentBaselinesNotFound = async () => {};

  fetchData = async () => {
    await this.props.getProject.execute(this, {
      id: this.props.match.params.projectId
    });

    await this.props.getBaselines.execute(this, {
      id: this.props.match.params.projectId
    });
  };

  componentDidMount() {
    document.title = "Project - Homes England Monitor";
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.location != prevProps.location) {
      this.fetchData();
    }
  }

  renderForm() {
    return (
      <div>
        {this.props.children({
          baselineStatus: this.state.status,
          formData: this.state.formData,
          formSchema: this.state.formSchema,
          projectType: this.state.projectType,
          formUiSchema: this.state.formUiSchema,
          timestamp: this.state.timestamp
        })}
      </div>
    );
  }

  render() {
    if (this.state.loading) {
      return <div data-test="loading">Loading project homepage...</div>;
    } else {
      return (
        <div>
          {this.renderForm()}
        </div>
      );
    }
  }
}

EditBaselinePage.propTypes = {
  getProject: PropTypes.object.isRequired,
  children: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      projectId: PropTypes.string.isRequired
    })
  })
};
