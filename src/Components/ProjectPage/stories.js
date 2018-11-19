import React from 'react';
import ProjectPage from '.';
import BaselineData from '../BaselineData'

import { storiesOf } from '@storybook/react';

storiesOf('ProjectPage', module)
  .add('Default', () => {
    let schema = {
      type: 'object',
      properties: {
        summary: {
          title: 'Project Summary',
          type: 'object',
          properties: {
            projectName: { type: 'string', title: 'Project Name' },
            projectDescription: { type: 'string', title: 'Project Description'},
            owner: { type: 'string', title: 'Project Owner' },
          },
        },
      },
    };

    let data = {
      summary: {
        projectName: 'A HIF Project',
        projectDescription: 'Descriptive',
        owner: 'Dave'
      },
    };

    let getProjectUseCase = {
      execute: (presenter, _) => { presenter.presentProject({ data, schema }) }
    }

    return (
      <ProjectPage
        getProject={getProjectUseCase}
        match={{ params: { projectId: 1 } }}
      >
      {({ formData, formSchema }) => (
        <div className="col-md-10 col-md-offset-1">
          <BaselineData formData={formData} schema={formSchema} />
        </div>
      )}
    </ProjectPage>
    )
  })
