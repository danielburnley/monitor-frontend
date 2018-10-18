import React from 'react';
import ProjectPage from '.';

import { storiesOf } from '@storybook/react';

storiesOf('NewProjectPage', module)
  .add('Immediate resolution', () => {
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

    let submitProjectUseCase = {
      execute: (presenter, id) => { presenter.creationSuccess(id) }
    }

    let updateProjectUseCase = {
      execute: (presenter, id) => { presenter.projectUpdated(id) }
    }

    let validateProjectUseCase = {
      execute: (presenter) => { }
    }

    return (
      <ProjectPage
        schema={schema}
        data={data}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        validateProject = {validateProjectUseCase}
        match={{ params: { projectId: 1, type: 'hif' } }}
      />
    )
  })
  .add('Non-resolving', () => {
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

    let submitProjectUseCase = {
      execute: (presenter, id) => { }
    }

    let updateProjectUseCase = {
      execute: (presenter, id) => { }
    }

    let validateProjectUseCase = {
      execute: (presenter) => { }
    }


    return (
      <ProjectPage
        schema={schema}
        data={data}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        validateProject = {validateProjectUseCase}
        match={{ params: { projectId: 1, type: 'ac' } }}
      />
    )
  })
  .add('Validation message', () => {
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

    let submitProjectUseCase = {
      execute: (presenter, id) => { presenter.creationSuccess(id) }
    }

    let updateProjectUseCase = {
      execute: (presenter, id) => { presenter.projectUpdated(id) }
    }

    let validateProjectUseCase = {
      execute: (presenter) => {
        presenter.invalidateFields([['no', 'more', 'cat'], ['less', 'cats']])
      }
    }

    return (
      <ProjectPage
        schema={schema}
        data={data}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        validateProject = {validateProjectUseCase}
        match={{ params: { projectId: 1, type: 'hif' } }}
      />
    )
  })
