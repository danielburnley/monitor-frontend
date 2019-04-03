import React from 'react';
import ProjectListProvider from '.';

import { storiesOf } from '@storybook/react';

storiesOf('Home', module)
  .add('Default', () => {
    return (
      <ProjectListProvider/>
    )
  })
