import GenerateReadOnlySchema from '../../UseCase/GenerateReadOnlySchema';
import GenerateUISchema from '../../UseCase/GenerateUISchema';
import React from 'react';
import ReturnPage from '.';

import { storiesOf } from '@storybook/react';

storiesOf('ReturnPage', module)
  .add('Submitted Return', () => {
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

    let getReturnUseCase = {
      execute: (presenter, _) => { presenter.presentReturn({ data, schema }) }
    }

    return (
      <ReturnPage
        match={{ params: { projectId: 1, returnId: 1 } }}
        generateUISchema={new GenerateUISchema()}
        generateSubmittedSchema={new GenerateReadOnlySchema()}
        history={[]}
        createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
        submitReturn={{execute: (presenter, request) => {presenter.submissionSuccessful(1);}}}
        updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
        getReturn={{execute: (presenter, request) => {presenter.presentReturn({
          status: 'Submitted',
          data: {cathouse: {cathouse: 'cat'}},
          schema: {
            type: 'object',
            properties: {
              cathouse: {
                type: 'object',
                title: 'cathouse',
                properties: {
                  cathouse: {
                    type: 'string',
                    readonly: true
                  }
                }
              }
            }
          }
        });
      }}}
        getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
          status: 'Draft',
          data: {},
          schema: {
            type: 'object',
            properties: {
              cathouse: {
                type: 'object',
                title: 'cathouse',
                properties: {
                  cathouse: {
                    type: 'string',
                    readonly: true
                  }
                }
              }
            }
          }
        });}}}
      />
    )
  })
  .add('Submitting a valid return', () => {
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

    let getReturnUseCase = {
      execute: (presenter, _) => { presenter.presentReturn({ data, schema }) }
    }

    return (
      <ReturnPage
        match={{ params: { projectId: 1, returnId: 1 } }}
        generateUISchema={new GenerateUISchema()}
        generateSubmittedSchema={new GenerateReadOnlySchema()}
        history={[]}
        createReturn={{execute: async (presenter, request) => {presenter.creationSuccessful(1);}}}
        submitReturn={{execute: async (presenter, request) => {presenter.submissionSuccessful(1);}}}
        updateReturn={{execute: async (presenter, request) => {presenter.updateSuccessful(1);}}}
        validateReturn={{execute: async (presenter, project_id, data) => {await new Promise(resolve => setTimeout(resolve, 300));}}}
        getReturn={{execute: (presenter, request) => {presenter.presentReturn({
          status: 'Draft',
          data: {cathouse: {cathouse: 'cat'}},
          schema: {
            type: 'object',
            properties: {
              cathouse: {
                type: 'object',
                title: 'cathouse',
                properties: {
                  cathouse: {
                    type: 'string',
                  }
                }
              }
            }
          }
        });
      }}}
        getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
          status: 'Draft',
          data: {},
          schema: {
            type: 'object',
            properties: {
              cathouse: {
                type: 'object',
                title: 'cathouse',
                properties: {
                  cathouse: {
                    type: 'string',
                  }
                }
              }
            }
          }
        });}}}
      />
    )
  })

  storiesOf('ReturnPage', module)
    .add('Unsubmitted return', () => {
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

      let getReturnUseCase = {
        execute: (presenter, _) => { presenter.presentReturn({ data, schema }) }
      }

      return (
        <ReturnPage
          match={{ params: { projectId: 1, returnId: 1 } }}
          generateUISchema={new GenerateUISchema()}
          generateSubmittedSchema={new GenerateReadOnlySchema()}
          history={[]}
          validateReturn={{execute: (presenter, formData) => {presenter.invalidateFields([['cat','catHouse'],['dog','dogHouse']])}}}
          createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
          submitReturn={{execute: (presenter, request) => {presenter.submissionSuccessful(1);}}}
          updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
          getReturn={{execute: (presenter, request) => {presenter.presentReturn({
            status: 'Draft',
            data: {cathouse: {cathouse: 'cat'}},
            schema: {
              type: 'object',
              properties: {
                cathouse: {
                  type: 'object',
                  title: 'cathouse',
                  properties: {
                    cathouse: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          });
        }}}
          getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
            status: 'Draft',
            data: {},
            schema: {
              type: 'object',
              properties: {
                cathouse: {
                  type: 'object',
                  title: 'cathouse',
                  properties: {
                    cathouse: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          });}}}
        />
      )
    })
