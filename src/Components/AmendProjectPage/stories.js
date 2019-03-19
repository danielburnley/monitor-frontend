import React from 'react';
import ProjectPage from '.';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
        status={"LA Draft"}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        validateProject = {validateProjectUseCase}
        match={{ params: { projectId: 1, type: 'hif' } }}
      />
    )
  })
  .add('Read only fields', () =>{
    let schema = {
      type: 'object',
      properties: {
        summary: {
          title: 'Project Summary',
          type: 'object',
          properties: {
            name: { type: 'string', title: 'Project Name', laReadOnly: true},
            owner: { type: 'string', title: 'Project Owner' },
            ocupation: { type: 'string', title: 'Occupation', laReadOnly : true}
          },
        },
      },
    };

    let data = {
      summary: {
        name: 'A HIF Project',
        owner: 'Dave',
        ocupation: 'Doctor',
      },
    };

    let uiSchema = {
      summary: {name:{'ui:disabled': true}, ocupation: {'ui:disabled': true}}
    }

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
        status={"LA Draft"}
        uiSchema={uiSchema}
        updateProject = {updateProjectUseCase}
        submitProject = {submitProjectUseCase}
        validateProject = {validateProjectUseCase}
        match={{ params: { projectId: 1, type: 'hif' } }}
      />
    )
  })
  .add('Email Button', () => {
    return(
      <div data-test="project-initial-create-success">
        Draft Project Created! 
        <p>Here is a link to the project <a>http://thisismyproject.com</a>.</p>
      <CopyToClipboard text="http://thisismyproject.com" >
          <button className="btn-primary btn"> Copy to Clipboard <span class="glyphicon glyphicon-copy" aria-hidden="true"></span></button>
        </CopyToClipboard>
        <a className="btn-primary btn" href={`mailto:.com?body=http://thisismyproject.com&subject=subject`}>Email this Project <span class="glyphicon glyphicon-envelope" aria-hidden="true"></span></a>
      </div>
    )
  })
