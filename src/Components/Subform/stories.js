import React from "react";
import Subform from ".";

import {storiesOf} from "@storybook/react";

storiesOf("Subform", module)
  .add("Default", () => {
    let schema = {
      title: 'Infrastructures',
      type: 'array',
      items: {
        type: 'object',
        title: 'Infrastructure',
        properties: {
          details: {
            type: 'object',
            title: 'Details',
            properties: {
              infraType: {type: 'string'},
              description: {type: 'string'}
            },
          },
          otherStuff: {
            type: 'object',
            title: 'Other Stuff',
            properties: {
              cars: {type: 'string'},
              cats: {type: 'string'}
            }
          }
        }
      }
    }
    return <Subform schema={schema} handleChange={(data) => {
      console.log("Subform updated with: \n" + JSON.stringify(data))
    }}/>
  })
  .add("object", () => {
    let schema = {
      title: 'Infrastructure',
      type: 'object',
      properties: {
        details: {
          type: 'object',
          title: 'Details',
          properties: {
            infraType: {type: 'string'},
            description: {type: 'string'}
          },
        },
        otherStuff: {
          type: 'object',
          title: 'Other Stuff',
          properties: {
            cars: {type: 'string'},
            cats: {type: 'string'}
          }
        }
      }
    }
    return <Subform schema={schema} handleChange={(data) => {
      console.log("Subform updated with: \n" + JSON.stringify(data))
    }}/>
  });
