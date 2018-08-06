import React from 'react';
import Footer from '.';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Footer', module)
  .add('Default', () => {
    return (
      <Footer/>
    )
  })
