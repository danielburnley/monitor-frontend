import React from "react";
import { storiesOf } from "@storybook/react";
import ValidatedField from ".";
import FieldFake from "../../../test/FieldFake";

storiesOf("ValidatedField", module)
  .add("Valid", () => (
    <ValidatedField
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
    <ValidatedField
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
