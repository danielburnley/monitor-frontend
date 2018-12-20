import React from 'react';
import FileUpload from '.';

import { storiesOf } from '@storybook/react';

storiesOf('FileUpload', module)
  .add('Default', () => {
    return (
      <FileUpload 
        onChange = {data => console.log(data)}
        schema = { {} }
        
      />
    )
  });