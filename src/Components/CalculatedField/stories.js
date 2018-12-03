import React from "react";
import { storiesOf } from "@storybook/react";
import CalculatedField from ".";
import FieldFake from "../../../test/FieldFake";

storiesOf("CalculatedField", module)
  .add("default", () => (
    <CalculatedField
      registry={{fields: {SchemaField: FieldFake}}}
      formData={ {multiplier: "2", multiplicand: "4"} }
      onChange={() => {}}
      schema={
        {
          type: "object",
          calculation: "formData.result = formData.multiplier*formData.multiplicand;",
          properties: {
            multiplier: {type: "string"},
            multiplicand: {type: "string"},
            result: {type: "string"}
          }
        }
      }
    />
));
