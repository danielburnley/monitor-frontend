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
            status: formData.summary.status,
            statusCommentary: formData.summary.comments,
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
            leadAuthority: {type: 'string', title: 'Lead Authority'},
            status: {
              type: 'string',
              title: 'Status',
              enum: ['Completed', 'On Schedule', 'Delayed'],
            },
            comments: {
              type: 'string',
              title: 'Comments',
            },
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

    return (
      <Form
        schema={schema}
        formData={this.props.data}
        onSubmit={({formData}) => this.submitFormData(formData)}
      />
    );
  }
}
