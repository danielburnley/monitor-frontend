import React from 'react';
import Form from 'react-jsonschema-form';

export default class ReturnForm extends React.Component {
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
    const schema = {
      title: 'HIF Return',
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          title: 'Project Summary',
          properties: {
            name: {type: 'string', title: 'Name'},
            description: {type: 'string', title: 'Description'},
            leadAuthority: {type: 'string', title: 'Lead Authority'},
          },
        },
        infrastructure: {
          type: 'object',
          title: 'Infrastructure',
          properties: {
            infraType: {type: 'string', title: 'Type'},
            description: {type: 'string', title: 'Description'},
            completionDate: {
              type: 'string',
              format: 'date',
              title: 'Completion Date',
            },
            planning: {
              type: 'object',
              title: 'Planning permission',
              properties: {
                estimatedSubmission: {
                  title: 'Estimated Submission Date',
                  type: 'string',
                  format: 'date',
                  description:
                    'You told us planning submission will be submitted at:',
                },
                actualSubmission: {
                  title: 'Actual Submission Date',
                  type: 'string',
                  format: 'date',
                  description:
                    'When do you think the planning permission will be submitted:',
                },
                submissionDelayReason: {
                  title: 'Comments',
                  type: 'string',
                  description: 'If not met, what is the reason?',
                },
              },
            },
          },
        },
        financial: {
          type: 'object',
          title: 'Financial information',
          properties: {
            estimatedTotalAmount: {
              type: 'string',
              title: 'Estimated total amount required',
              description:
                'We agreed on the following amount to deliver this infrastructure:',
            },
            actualTotalAmount: {
              type: 'string',
              title: 'Actual amount required',
              description: 'How much do you now think you need?',
            },
            totalAmountChangeReason: {
              type: 'string',
              title: 'Comments',
              description: 'If it has changed, what is the reason?',
            },
          },
        },
      },
    };

    return (
      <Form
        schema={schema}
        onSubmit={({formData}) => this.props.onSubmit(formData)}
        uiSchema={this.getUiSchema()}
        formData={this.props.data}
      />
    );
  }
}
