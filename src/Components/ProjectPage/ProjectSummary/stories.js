import React from 'react';
import ProjectSummary from '.';

import { storiesOf } from '@storybook/react';

storiesOf('ProjectSummary', module)
  .add('Default', () => {
    let schema = {
      type: 'object',
      properties: {
        summary: {
          title: 'Project Summary',
          type: 'object',
          properties: {
            name: {type: 'string', title: 'Project Name'},
            owner: {type: 'string', title: 'Project Owner'},
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

    return (
      <ProjectSummary schema={schema} data={data}/>
    )
  })


