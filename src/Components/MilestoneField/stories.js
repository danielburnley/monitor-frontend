import React from "react";
import MilestoneField from ".";
import { storiesOf } from "@storybook/react";
import WidgetFake from "../../../test/WidgetFake";

storiesOf("Milestone Form", module).add("Simple form", () => {
  return (
    <MilestoneField
      schema={{ title: "Milestone Storyboard" }}
      formData={{
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!"
      }}
      onChange={formData => {
        console.log(formData);
      }}
      registry={
        {
          widgets: {
            percentage: PercentageFake,
            britishDate: BritishDateFake
          }
        }
      }
    />
  );
});

storiesOf("Milestone Form", module).add("Prepopulated Data", () => {
  return (
    <MilestoneField
      schema={{ title: "Milestone Storyboard" }}
      formData={{
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!",
        statusAgainstLastReturn: "Completed",
        currentReturn: "21/09/2019",
        reasonForVariance: "A variance has occured, causing variance",
        milestonePercentCompleted: "65"
      }}
      onChange={formData => {
        console.log(formData);
      }}
      registry={
        {
          widgets: {
            percentage: PercentageFake,
            britishDate: BritishDateFake
          }
        }
      }
    />
  );
});
