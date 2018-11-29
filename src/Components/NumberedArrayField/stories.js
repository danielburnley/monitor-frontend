import React from "react";
import { storiesOf } from "@storybook/react";
import NumberedArrayField from ".";
import FieldFake from "../../../test/FieldFake";

storiesOf("Numbered Array Field", module)
  .add("default", () => (
    <NumberedArrayField
      registry={{fields: {SchemaField: FieldFake}}}
      formData={ [{otherData: "Hello"}, {otherData: "There"}] }
      schema={ {addable: true, items: {type: "object", properties: {otherData: {type: "string"}}} }}
    />
));
