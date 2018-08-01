import React from 'react';
import Form from 'react-jsonschema-form';

export default class ProjectForm extends React.Component {
  render() {
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
      <Form schema={this.props.schema} uiSchema={uiSchema} formData={this.props.data}>
        <div />
      </Form>
    );
  }
}
