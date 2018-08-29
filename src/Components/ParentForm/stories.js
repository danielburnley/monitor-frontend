import React from "react";
import ParentForm from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Parent Form", module)
  .add("Default", () => {
    let schema = {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",

      properties: {
        details: {
          type: "object",
          title: "Details",
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
        }
      }
    };

    return <ParentForm schema={schema} />;
  })
  .add("With array as child", () => {
    let schema = {
      title: "A registration form",
      description: "A simple form example.",
      type: "object",
      properties: {
        people: {
          type: "array",
          title: "People",
          items: {
            title: "Person",
            type: "object",
            properties: {
              details: {
                title: "Details",
                type: "object",
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
              }
            }
          }
        }
      }
    };

    return <ParentForm schema={schema} formData={{ people: [{}, {}, {}, {}] }} />;
  });
