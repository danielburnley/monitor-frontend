import React from 'react';
import ParentForm from '.';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

storiesOf('Parent Form', module)
  .add('Default', () => {
    let schema = {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",

      properties: {
        details: {
          type: "object",
          title: "Details",
          properties: {
            name: {
              type: 'object',
              title: 'Name',
              properties: {
                firstName: {
                  type: "string",
                  title: "First name"
                },
                lastName: {
                  type: "string",
                  title: "Last name"
                }
              }
            }
          }
        }
      }
    };

    return (
      <ParentForm schema={schema}/>
    )
  }).add('Meow', () => {
  let schema = {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    properties: {
      infrastructures: {
        type: "array",
        title: "Infrastructures",
        items: {
          infrastructure: {
            type: 'object',
            title: 'Infrastructure',
            properties: {
              firstName: {
                type: "string",
                title: "First name"
              },
              lastName: {
                type: "string",
                title: "Last name"
              }
            }
          }
        }
      }
    }
  };

  return (
    <ParentForm schema={schema}/>
  )
});
