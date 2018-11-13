import React from "react";
import { storiesOf } from "@storybook/react";
import PeriodsField from ".";

storiesOf("Periods Field", module)
  .add("default", () => {
    let periodData = [
      { period: "18/19", baselineAmounts: "100" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" },
      { period: "19/20", baselineAmounts: "50" }
    ];

    let schema = {
      type: "array",
      items: {
        properties: {
          period: {
            type: "string",
            title: "Period",
            readonly: true
          },
          baselineAmounts: {
            type: "string",
            title: "Baseline Amounts",
            readonly: true
          }
        }
      }
    };
    return <PeriodsField schema={schema} formData={periodData} />;
  })
  .add("With input fields", () => {
    let periodData = [
      { period: "18/19" },
      { period: "19/20" },
      { period: "20/21" },
      { period: "21/22" },
      { period: "23/24" },
      { period: "24/25" }
    ];

    let schema = {
      type: "array",
      addable: true,
      items: {
        properties: {
          period: {
            type: "string",
            title: "Period"
          },
          currentReturnForecast: {
            type: "string",
            title: "Current Return Forecast"
          }
        }
      }
    };
    return (
      <PeriodsField
        schema={schema}
        formData={periodData}
        onChange={formData => {
          console.log(formData);
        }}
      />
    );
  })
  .add("Too many periods", () => {
    let periodData = [
        { period: "18/19", baselineAmounts: "100" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "18/19", baselineAmounts: "100" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" },
        { period: "19/20", baselineAmounts: "50" }
      ]
    let schema = {
      type: "array",
      items : {
        type: "object",
        properties: {
          period: {
            type: "string",
            title: "Period",
            readonly: true
          },
          baselineAmounts: {
            type: "string",
            title: "Baseline Amounts",
            readonly: true
          }
        }
      }
    };
    return (
        <PeriodsField
          schema={schema}
          formData={periodData}
          onChange={formData => {
            console.log(formData);
          }}
        />
    );
  });
