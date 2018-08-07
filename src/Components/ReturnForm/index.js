import './style.css';
import React from 'react';
import Form from 'react-jsonschema-form';

export default class ReturnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formData: props.data};
  }

  renderActions = () => {
    if (this.props.status === 'Submitted') {
      return <div />;
    }

    if (this.props.status === 'New') {
      return (
        <div className="col-md-offset-9 col-md-3 return-actions">
          <button
            className="btn btn-secondary return-btn"
            data-test="create-return-button"
            onClick={() => this.props.onCreate(this.state.formData)}>
            Create Draft Return
          </button>
        </div>
      );
    }

    return (
      <div className="col-md-offset-9 col-md-3 return-actions">
        <button
          className="btn btn-secondary return-btn"
          data-test="save-return-button"
          onClick={() => this.props.onSave(this.state.formData)}>
          Save Draft
        </button>
        <button
          className="btn btn-primary return-btn"
          data-test="submit-return-button"
          onClick={() => this.props.onSubmit(this.state.formData)}>
          Submit Return
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="container">
        <Form
          schema={this.props.schema}
          uiSchema={this.props.uiSchema}
          onChange={({formData}) => this.setState({formData})}
          formData={this.state.formData}>
          <div />
        </Form>
        {this.renderActions()}
      </div>
    );
  }
}
