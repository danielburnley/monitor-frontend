import React from 'react';
import Form from 'react-jsonschema-form';

export default class ReturnForm extends React.Component {
  renderSubmit = () => {
    if(this.props.readOnly) {
      return(<div />)
    } else {
      return
    }
  }
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

  render() {
    return (
      <Form
        schema={this.props.schema}
        onSubmit={({formData}) => this.props.onSubmit(formData)}
        uiSchema={this.getUiSchema()}
        formData={this.props.data}>
        {this.renderSubmit()}
      </Form>
    );
  }
}
