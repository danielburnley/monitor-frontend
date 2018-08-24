import React from 'react';
import ReturnPage from '.';

import { storiesOf } from '@storybook/react';

storiesOf('ReturnPage', module)
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

    let getReturnUseCase = {
      execute: (presenter, _) => { presenter.presentReturn({ data, schema }) }
    }

    return (
      <ReturnPage
        getReturn={getReturnUseCase}
        match={{ params: { projectId: 1, returnId: 1 } }}
      />
    )
  })

