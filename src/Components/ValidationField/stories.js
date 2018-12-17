import React from "react";
import { storiesOf } from "@storybook/react";
import ValidationField from ".";
import FieldFake from "../../../test/FieldFake";

storiesOf("ValidationField", module)
  .add("Valid", () => (
    <ValidationField
      registry={{fields: {SchemaField: FieldFake}}}
      formData={ {multiplier: "2", multiplicand: "4", _valid: true} }
      onChange={() => {}}
      schema={
        {
          type: "object",
          properties: {
            multiplier: {type: "string"},
            multiplicand: {type: "string"}
          }
        }
      }
    />
))
  .add("Invalid", () => (
    <ValidationField
      registry={{fields: {SchemaField: FieldFake}}}
      formData={ {multiplier: "2", multiplicand: "4", _valid: false} }
      onChange={() => {}}
      schema={
        {
          type: "object",
          properties: {
            multiplier: {type: "string"},
            multiplicand: {type: "string"}
          }
        }
      }
    />
));
