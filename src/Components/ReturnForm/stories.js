import React from "react";
import ReturnForm from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Return Form", module).add("Simple form", () => {
  let schema = {
    type: "object",
    properties: {
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
