import React from "react";
import { storiesOf } from "@storybook/react";
import ReturnList from ".";

storiesOf("ReturnList", module)
  .add("default", () => (
    <ReturnList
      schema={{ title: "Cat Housing" }}
      returns={ [
          {
            id: "45",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          }]
      }
    />
  ))
  .add("multiple returns", () => (
    <ReturnList
      schema={{ title: "Kittens Housing Association" }}
      returns={[
          {
            id: "3",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          },
          {
            id: "78",
            project_id: "1",
            status: "Submitted",
            updates: [
              {
                changed: "Some"
              }
            ]
          }
        ]
      }
    />
  ));
