import React from 'react';
import ProjectPage from '.';

import { storiesOf } from '@storybook/react';

storiesOf('NewProjectPage', module)
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
      execute: (presenter, id) => { presenter.presentProject({ data, schema }) }
    }

    let submitProjectUseCase = {
      execute: (presenter, id) => { presenter.creationSuccess(id) }
    }

    let updateProjectUseCase = {
      execute: (presenter, id) => { presenter.projectUpdated(id) }
    }

    return (
      <ProjectPage
        getProject={getProjectUseCase}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        match={{ params: { projectId: 1 } }}
      />
    )
  })
