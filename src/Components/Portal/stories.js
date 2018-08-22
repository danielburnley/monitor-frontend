import React from "react";
import Portal from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Portal", module).add("Without project access", () => {
  let schema = {
    title: "A registration form",
    description: "A simple form example.",
    type: "object",
    required: ["firstName", "lastName"],
    properties: {
      firstName: {
        type: "string",
        title: "First name"
      },
      lastName: {
        type: "string",
        title: "Last name"
      },
      age: {
        type: "integer",
        title: "Age"
      },
      bio: {
        type: "string",
        title: "Bio"
      },
      password: {
        type: "string",
        title: "Password",
        minLength: 3
      },
      telephone: {
        type: "string",
        title: "Telephone",
        minLength: 10
      }
    }
  };

  let canAccessProject = {
    execute: async () => {
      return { valid: false };
    }
  };

  return <Portal schema={schema} canAccessProject={canAccessProject} />;
});
