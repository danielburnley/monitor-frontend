import React from 'react';
import ProjectPage from '.';

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
            name: { type: 'string', title: 'Project Name' },
            owner: { type: 'string', title: 'Project Owner' },
          },
        },
      },
    };

    let data = {
      summary: {
        name: 'A HIF Project',
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
      />
    )
  })


