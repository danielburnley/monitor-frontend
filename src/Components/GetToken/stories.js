import React from 'react';
import Footer from '.';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('GetToken', module)
  .add('Default', () => {
    return (
      <GetToken/>
    )
  })
