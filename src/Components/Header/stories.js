import React from 'react';
import Header from '.';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Header', module)
  .add('Default', () => {
    return (
      <Header/>
    )
  })
