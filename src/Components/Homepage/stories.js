import React from 'react';
import Homepage from '.';

import { storiesOf } from '@storybook/react';

storiesOf('Home', module)
  .add('Default', () => {
    return (
      <Homepage/>
    )
  })
