import React from 'react';
import ReturnForm from '.';

import {storiesOf} from '@storybook/react';
import {action} from '@storybook/addon-actions';
import {linkTo} from '@storybook/addon-links';

storiesOf('Return Form', module).add('Simple form', () => {
  let schema = {
    title: 'A form about cats',
    description: 'A simple cat form',
    type: 'object',
    properties: {
      firstName: {
        type: 'string',
        title: 'First name',
      },
      lastName: {
        type: 'string',
        title: 'Last name',
      },
      fluffiness: {
        type: 'string',
        title: 'Fluffiness',
        enum: ['Slightly fluffy', 'Very fluffy', 'Too fluffy'],
        enumName: ['slightly', 'very', 'too']
      }
    },
  };

  return <ReturnForm schema={schema} onSubmit={(formData) => {console.log(formData)}} />;
});
