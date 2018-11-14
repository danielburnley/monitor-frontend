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
            projectName: {type: 'string', title: 'Project Name'},
            projectDescription: {type: 'string', title: 'Project Description'},
          },
        },
      },
    };

    let data = {
      summary: {
        projectName: 'An AC Project',
        projectDescription: 'Doing some constructing blah blah blah blah blah, lots more words describing all of my building needs.',
      },
    };

    return (
      <ProjectSummary schema={schema} data={data}/>
    )
  })
