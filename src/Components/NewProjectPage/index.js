import React from 'react';
import PropTypes from "prop-types";
import ParentForm from '../ParentForm';

export default class NewProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {formData: this.props.data, formSchema: this.props.schema, updating: false, submitted: false};
  }

  async componentDidMount() {
    document.title = "Project - Homes England Monitor"
  }

  creationSuccess() {
    this.setState({submitted: true, updating: false});
  }

  creationFailure() {
  }

  projectUpdated() {
    this.setState({saved: true, updating: false});
  }

  projectNotUpdated() {

  }

  submitProject = async e => {
    this.setState({updating: true});
    await this.props.submitProject.execute(this, this.props.match.params.id);

    e.preventDefault();
  };

  updateProject = async e => {
    this.setState({updating: true});
    await this.props.updateProject.execute(this, this.props.match.params.id, this.state.formData);

    e.preventDefault();
  };

  renderForm() {
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
    } else if (this.state.updating) {
      return (<div>
          <button data-test="disabled-submit-project-button" className="btn form-button disabled" onClick={this.submitProject}>
            Create this project
          </button>
          <button data-test="disabled-update-project-button" className="btn form-button disabled" onClick={this.updateProject}>
            Save draft
          </button>
          <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
        </div>);
    } else {
      return <div>
        { this.renderSaveSuccess() }
        <button data-test="submit-project-button" className="btn form-button btn-primary" onClick={this.submitProject}>
          Create this project
        </button>
        <button data-test="update-project-button" className="btn form-button btn-primary" onClick={this.updateProject}>
          Save draft
        </button>
        <div className="col-md-10 col-md-offset-1">{this.renderForm()}</div>
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
        <h2>Baseline editor</h2>
        { this.renderSuccessOrForm() }
      </div>
    );
  }
}

NewProjectPage.propTypes = {
  data: PropTypes.object.isRequired,
  schema: PropTypes.object.isRequired,
  submitProject: PropTypes.object.isRequired,
  updateProject: PropTypes.object.isRequired
};
