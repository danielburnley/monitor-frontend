import React from "react";
import { storiesOf } from "@storybook/react";
import InfrastructureAdditionPage from ".";

storiesOf("InfrastructureAdditionPage", module).add("Default", () => (
  <
    InfrastructureAdditionPage
    history={[]}
    match={{ params: { id: 3, type: 'ff' } }}
    updateProject={() => {console.log("Updated!")}}
    getProject={{execute: async (presenter) => {
      presenter.presentProject({
        schema: {
          type: "object",
          properties: {
            infrastructures: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  information: {
                    type: "string"
                  }
                }
              }
            },
            other: {
              type: "object",
              properties: {
                value: {
                  type: "string"
                }
              }
            }
          }
        },
        data: {
          infrastructures: [
            {information: "Value"}
          ],
          other: {
            value: "data"
          }
        }
      })
    }}}
    generateInfrastructureUISchema={{
      execute: () => (
        {
          "ui:options": {
            addable: true,
            removable: true
          }
        }
      )
    }}
  />
));
