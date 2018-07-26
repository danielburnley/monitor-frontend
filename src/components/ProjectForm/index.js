import React from 'react';
import Form from 'react-jsonschema-form';

export default class ProjectForm extends React.Component {
  submitFormData = async formData => {
    let reviewData = {
      id: this.props.reviewId,
      project: {
        type: 'hif',
        baselineData: {
          summary: {
            description: formData.summary.description,
            projectName: formData.summary.name,
            leadAuthority: formData.summary.leadAuthority,
          },
          infrastructure: {
            completionDate: formData.infrastructure.completionDate,
            description: formData.infrastructure.description,
            type: formData.infrastructure.infraType,
          },
          financial: {
            date: formData.financial.dateReceived,
            fundedThroughHIF: formData.financial.fundedThroughHIF,
          },
        },
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}project/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(reviewData),
      },
    );

    if (response.ok) {
      alert('Review submitted successfully!');
    } else {
      alert('Review submission unsuccessful');
    }
  };

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
            leadAuthority: {type: 'string', title: 'Lead Authority'}
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
          },
        },
        financial: {
          type: 'object',
          title: 'Financial information',
          properties: {
            dateReceived: {
              type: 'string',
              format: 'date',
              title: 'Date received',
            },
            fundedThroughHIF: {type: 'boolean', title: 'Funded through HIF?'},
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
      },
      financial: {
        dateReceived: {'ui:readonly': true},
        fundedThroughHIF: {'ui:readonly': true}
      }
    };

    return (
      <Form schema={schema} uiSchema={uiSchema} formData={this.props.data}>
        <div />
      </Form>
    );
  }
}
