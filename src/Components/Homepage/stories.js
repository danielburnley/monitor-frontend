import React from 'react';
import Homepage from '.';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Home', module)
  .add('Default', () => {
    return (
      <Homepage/>
    )
  })
