import React from "react";
import Subform from ".";

import { storiesOf } from "@storybook/react";

let schema = {
  title: "Infrastructures",
  type: "array",
  items: {
    type: "object",
    title: "Infrastructure",
    properties: {
      details: {
        type: "object",
        title: "Details",
        properties: {
          infraType: { type: "string" },
          description: { type: "string" }
        }
      },
      otherStuff: {
        type: "object",
        title: "Other Stuff",
        properties: {
          cars: { type: "string" },
          cats: { type: "string" }
        }
      }
    }
  }
};

let infraData = {
  details: { infraType: "One", description: "Two" },
  otherStuff: { cars: "Zoom", cats: "Sleep" }
};

storiesOf("Subform", module)
  .add("Array with one item", () => (
    <Subform
      schema={schema}
      data={[infraData]}
      onChange={data => {
        console.log("Subform updated with: \n" + JSON.stringify(data));
      }}
      uiSchema={{}}
    />
  ))
  .add("object", () => {
    let schema = {
      title: "Infrastructure",
      type: "object",
      properties: {
        details: {
          type: "object",
          title: "Details",
          properties: {
            infraType: { type: "string" },
            description: { type: "string" }
          }
        },
        otherStuff: {
          type: "object",
          title: "Other Stuff",
          properties: {
            cars: { type: "string" },
            cats: { type: "string" }
          }
        }
      }
    };
    return (
      <Subform
        schema={schema}
        handleChange={data => {
          console.log("Subform updated with: \n" + JSON.stringify(data));
        }}
      />
    );
  });
