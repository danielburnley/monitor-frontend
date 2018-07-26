import React from 'react';
import Form from 'react-jsonschema-form';

export default class ProjectForm extends React.Component {
  render() {
    const schema = {
      title: 'HIF Review',
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
                  type: 'string',
                  format: 'date',
                  title: 'Estimated date of submission',
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
            },
          },
        },
      },
    };

    const uiSchema = {
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

    return (
      <Form schema={schema} uiSchema={uiSchema} formData={this.props.data}>
        <div />
      </Form>
    );
  }
}
