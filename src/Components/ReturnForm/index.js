import './style.css';
import React from 'react';
import Form from 'react-jsonschema-form';

export default class ReturnForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {formData: props.data};
  }

  renderSubmit = () => {
    if (this.props.readOnly) {
      return <div />;
    } else {
      return;
    }
  };

  getUiSchema = () => {
    let uiSchema = {
      summary: {
        name: {'ui:readonly': true},
        description: {'ui:readonly': true},
        leadAuthority: {'ui:readonly': true},
      },
      infrastructure: {
        infraType: {'ui:readonly': true},
        description: {'ui:readonly': true},
        completionDate: {'ui:readonly': true},
        planning: {
          estimatedSubmission: {'ui:readonly': true},
        },
      },
      financial: {
        estimatedTotalAmount: {'ui:readonly': true},
      },
    };

    if (this.props.readOnly) {
      uiSchema.infrastructure.planning.actualSubmission = {'ui:readonly': true};
      uiSchema.infrastructure.planning.submissionDelayReason = {
        'ui:readonly': true,
      };
      uiSchema.financial.actualTotalAmount = {'ui:readonly': true};
      uiSchema.financial.totalAmountChangeReason = {'ui:readonly': true};
    }

    return uiSchema;
  };

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
          onChange={({formData}) => this.setState({formData})}
          uiSchema={this.getUiSchema()}
          formData={this.state.formData}>
          <div />
        </Form>
        {this.renderActions()}
      </div>
    );
  }
}
