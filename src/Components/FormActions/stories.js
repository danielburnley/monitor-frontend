import React from "react";
import ReturnForm from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Return Form", module).add("Simple form", () => {
  let schema = {
    type: "object",
    properties: {
      dogs: {
        type: "object",
        title: "Dogs",
        properties: {
          catDetails: {
            title: 'Details',
            type: 'object',
            properties: {
              name: {
                type: "string",
                title: "Name"
              }
            }
          }
        }
      },
      cats: {
        type: "object",
        title: "Cats",
        properties: {
          catDetails: {
            title: 'Details',
            type: 'object',
            properties: {
              firstName: {
                type: "string",
                title: "First name"
              },
              lastName: {
                type: "string",
                title: "Last name"
              },
              fluffiness: {
                type: "string",
                title: "Fluffiness",
                enum: ["Slightly fluffy", "Very fluffy", "Too fluffy"],
                enumName: ["slightly", "very", "too"]
              },
              ancestors: {
                type: "array",
                title: "Ancestry",
                items: {
                  type: "object",
                  properties: {
                    name: {
                      title: "Name",
                      type: "string"
                    },
                    breed: {
                      title: "Breed",
                      type: "string"
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  };

  return (
    <ReturnForm
      schema={schema}
      onSubmit={formData => {
        console.log(formData);
      }}
    />
  );
});
