import React from "react";
import { storiesOf } from "@storybook/react";
import ArraySubform from ".";

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

storiesOf("ArraySubform", module)
  .add("Default", () => (
    <ArraySubform
      data={[infraData]}
      schema={schema}
      selectedIndex={0}
      selectedFormSection={"details"}
      uiSchema={{}}
    />
  ))
  .add("With the second section selected", () => (
    <ArraySubform
      data={[infraData]}
      schema={schema}
      selectedIndex={0}
      selectedFormSection={"otherStuff"}
      uiSchema={{}}
    />
  ));
