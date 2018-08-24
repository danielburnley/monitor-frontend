import React from "react";
import { storiesOf } from "@storybook/react";
import HorizontalFields from ".";

storiesOf("HorizontalFields", module).add("Default", () => {
  let schema = {
    type: "object",
    title: "Summary",
    properties: {
      firstName: { type: "string", title: "First Name" },
      surname: { type: "string", title: "Surname" },
      foo: { type: "string", title: "Foo" },
      meow: { type: "string", title: "Meow" },
      woof: { type: "string", title: "woof" },
      bar: { type: "string", title: "Bar" }
    }
  };
  let formData = {
    firstName: "First name",
    surname: "Surname",
    foo: "foo",
    meow: "meow",
    woof: "woof",
    bar: "bar"
  };

  return (
    <HorizontalFields
      schema={schema}
      formData={formData}
      onChange={formData => {
        console.log(formData);
      }}
    />
  );
});
