import React from "react";
import { storiesOf } from "@storybook/react";
import PeriodFinancials from ".";
import HorizontalFields from "./../HorizontalFields";

storiesOf("Period Financials", module)
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
      title: "Baseline Amounts",
      type: "array",
      items: {
        type: "object",
        horizontal: true,
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
    return <PeriodFinancials schema={schema} data={periodData} />;
  })
  .add("With input fields", () => {
    let periodData =  [
        { period: "18/19" },
        { period: "19/20" },
        { period: "18/19" },
        { period: "19/20" },
        { period: "18/19" },
        { period: "19/20" },
      ]

    let schema = {
      type: "array",
      title: "Current Return Amounts",
      items: {
        type: "object",
        horizontal: true,
        properties: {
          period: {
            type: "string",
            title: "Period",
            readonly: true
          },
          currentReturnForecast: {
            type: "string",
            title: "Current Return Forecast"
          }
        }
      }
    };
    return (
      <PeriodFinancials
        schema={schema}
        data={periodData}
        onChange={formData => {
          console.log(formData);
        }}
      />
    );
  })
  .add("Too many periods", () => {
    let periodData = {
      baselineAmounts: [
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
    };
    let schema = {
      title: "Baseline Amounts",
      type: "array",
      items: {
        type: "object",
        horizontal: true,
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
      <div className="container">
        {Object.keys(schema.items.properties).map(item => {
          return (
            <div>
              <div className="row">
                <div className="col-sm-2">
                  <p>
                    <strong>{schema.items.properties[item].title}</strong>
                  </p>
                </div>
                {periodData.baselineAmounts.map(year => {
                  return (
                    <div className="col-sm-1">
                      <p>{year[item]}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  });
