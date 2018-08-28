import React from "react";
import { storiesOf } from "@storybook/react";
import HorizontalFields from ".";

storiesOf("HorizontalFields", module)
  .add("Default", () => {
    let schema = {
      type: "object",
      title: "Summary",
      properties: {
        firstName: { type: "string", title: "First Name", readonly: true },
        surname: { type: "string", title: "Surname" },
        foo: { type: "string", title: "Foo", readonly: true },
        meow: { type: "string", title: "Meow", readonly: true },
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
  })
  .add("Two next to each other", () => {
    let schema = {
      type: "object",
      title: "Summary",
      properties: {
        firstName: { type: "string", title: "First Name", readonly: true },
        surname: { type: "string", title: "Surname" },
        foo: { type: "string", title: "Foo", readonly: true },
        meow: { type: "string", title: "Meow", readonly: true },
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
      <div>
        <HorizontalFields
          schema={schema}
          formData={formData}
          onChange={formData => {
            console.log(formData);
          }}
        />
        <HorizontalFields
          schema={schema}
          formData={formData}
          onChange={formData => {
            console.log(formData);
          }}
        />
      </div>
    );
  });
