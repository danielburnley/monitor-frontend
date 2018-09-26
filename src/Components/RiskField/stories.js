import React from "react";
import { storiesOf } from "@storybook/react";
import RiskField from ".";


storiesOf("Risk", module).add("default", () => (
  <RiskField
    schema={{title: "Risk Storyboard"}}
    formData={{
      riskBaselineRisk:
        "This is a much less risky risk. The cat might get stuck up the tree.",
      riskBaselineImpact: "4",
      riskBaselineLikelihood: "5",
      riskBaselineMitigationsInPlace: "This dog is trying to mitigate the risk"
    }}
    onChange={formData => {
      console.log(formData);
    }}
  />
));
storiesOf("Risk", module).add("prepopluated data", () => (
  <RiskField
    schema={{title: "Risk Storyboard"}}
    formData={{
      riskBaselineRisk:
        "This is a much less risky risk. The cat might get stuck up the tree.",
      riskBaselineImpact: "4",
      riskBaselineLikelihood: "5",
      riskBaselineMitigationsInPlace: "This dog is trying to mitigate the risk",
      riskCurrentReturnLikelihood: "5",
      riskChangeRisk: "No",
      riskCurrentMitigationsInPlace: "The dog ran away, no current mitigation"
    }}
    onChange={formData => {
      console.log(formData);
    }}
  />
));
