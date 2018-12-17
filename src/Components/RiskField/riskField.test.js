import RiskField from ".";
import React from "react";
import { shallow } from "enzyme";

class RiskComponent {
  constructor(formData, onChange, schema = {title: null, properties: {}}) {
    this.risk = shallow(
      <RiskField
        schema={schema}
        formData={formData}
        onChange={onChange}
      />
    );
  }
  description = (title) => this.risk.find(`[data-test='risk-description${title}']`).text();

  impact = (title) => this.risk.find(`[data-test='risk-impact${title}']`).text();

  likelihood = (title) => this.risk.find(`[data-test='risk-likelihood${title}']`).text();

  title = () => this.risk.find("[data-test='schema-title']").text();

  mitigationsInPlace = (title) =>
    this.risk.find(`[data-test='risk-mitigation-in-place${title}']`).text();

  simulateCurrentLikelihood = inputValue =>
    this.risk
      .find("[data-test='risk-current-likelihood']")
      .simulate("change", { target: { value: inputValue } });

  simulateChangeInRisk = inputValue =>
    this.risk
      .find("[data-test='risk-change-in-risk']")
      .simulate("change", { target: { value: inputValue } });

  simulateCurrentMitigationInPlace = inputValue =>
    this.risk
      .find("[data-test='risk-current-mitigations-in-place']")
      .simulate("change", { target: { value: inputValue } });

  findReturnLikelihoodValue = () =>
    this.risk.find("[data-test='risk-current-likelihood']").props().value;

  findChangeInRiskValue = () =>
    this.risk.find("[data-test='risk-change-in-risk']").props().value;

  findCurrentMitigationsInPlaceValue = () =>
    this.risk.find("[data-test='risk-current-mitigations-in-place']").props()
      .value;
}

describe("<RiskField>", () => {
  let onChangeSpy = jest.fn();
  describe("Given baseline data", () => {
    describe("Example 1", () => {
      let formData = {
        riskBaselineRisk: "This is a very risky risk.",
        riskBaselineImpact: "1",
        riskBaselineLikelihood: "2",
        riskBaselineMitigationsInPlace: "This cat is mitigating the risk"
      };
      let schema = {title: "Risk Fields", properties: {
        riskBaselineRisk: { title: "baseline"},
        riskBaselineImpact: { title: "impact"},
        riskBaselineLikelihood: { title: "likelihood"},
        riskBaselineMitigationsInPlace: { title: "mitigation"}
        }
      }
      let risk = new RiskComponent(formData, onChangeSpy, schema);
      
      it("displays the schema title", () => {
        expect(risk.title()).toEqual("Risk Fields");
      });

      it("displays the risk title", () => {
        expect(risk.description("-title")).toEqual("baseline");
      });

      it("displays the risk description", () => {
        expect(risk.description("")).toEqual("This is a very risky risk.");
      });

      it("displays the impact title", () => {
        expect(risk.impact("-title")).toEqual("impact:");
      });

      it("displays the impact", () => {
        expect(risk.impact("")).toEqual("1");
      });

      it("displays the likelihood title", () => {
        expect(risk.likelihood("-title")).toEqual("likelihood:");
      });

      it("displays the likelihood", () => {
        expect(risk.likelihood("")).toEqual("2");
      });

      it("displays the mitigiation in place title", () => {
        expect(risk.mitigationsInPlace("-title")).toEqual(
          "mitigation"
        );
      });

      it("displays the mitigiation in place", () => {
        expect(risk.mitigationsInPlace("")).toEqual(
          "This cat is mitigating the risk"
        );
      });
    });
    describe("Example 2", () => {
      let formData = {
        riskBaselineRisk:
          "This is a much less risky risk. The cat might get stuck up the tree.",
        riskBaselineImpact: "4",
        riskBaselineLikelihood: "5",
        riskBaselineMitigationsInPlace:
          "This dog is trying to mitigate the risk"
      };
      let schema = {title: "More Risky Field Data", properties: {
        riskBaselineRisk: { title: "basedown"},
        riskBaselineImpact: { title: "impale"},
        riskBaselineLikelihood: { title: "likeymelikey"},
        riskBaselineMitigationsInPlace: { title: "mightdo"}
        }
      }
      let risk = new RiskComponent(formData, onChangeSpy, schema);

      it("displays the schema title", () => {
        expect(risk.title()).toEqual("More Risky Field Data");
      });

      it("displays the risk description title", () => {
        expect(risk.description("-title")).toEqual("basedown");
      });

      it("displays the risk description", () => {
        expect(risk.description("")).toEqual(
          "This is a much less risky risk. The cat might get stuck up the tree."
        );
      });

      it("displays the impact title", () => {
        expect(risk.impact("-title")).toEqual("impale:");
      });

      it("displays the impact", () => {
        expect(risk.impact("")).toEqual("4");
      });

      it("displays the likelihood title", () => {
        expect(risk.likelihood("-title")).toEqual("likeymelikey:");
      });

      it("displays the likelihood", () => {
        expect(risk.likelihood("")).toEqual("5");
      });

      it("displays the mitigiation in place title", () => {
        expect(risk.mitigationsInPlace("-title")).toEqual(
          "mightdo"
        );
      });

      it("displays the mitigiation in place", () => {
        expect(risk.mitigationsInPlace("")).toEqual(
          "This dog is trying to mitigate the risk"
        );
      });
    });
  });
  describe("When updating fields", () => {
    let risk;
    beforeEach(() => {
      let formData = {
        riskBaselineRisk: "Cat gets stuck in the tree",
        riskBaselineImpact: "3",
        riskBaselineLikelihood: "4",
        riskBaselineMitigationsInPlace: "Cut down the tree"
      };
      risk = new RiskComponent(formData, onChangeSpy);
    });

    describe("When selecting a current return likelihood", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", () => {
          risk.simulateCurrentLikelihood("2");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "2",
            riskAnyChange: "No",
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateCurrentLikelihood("5");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "5",
            riskAnyChange: "No",
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });
    });
    describe("When selecting a change in risk", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeInRisk("Yes");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "Yes",
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeInRisk("No");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "No",
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });
    });
    describe("When selecting a change in current mitigations in place", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", () => {
          risk.simulateCurrentMitigationInPlace(
            "We haven't done anything yet, stop nagging!"
          );

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "No",
            riskCurrentReturnMitigationsInPlace:
              "We haven't done anything yet, stop nagging!"
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateCurrentMitigationInPlace("Please, give us more time!");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "No",
            riskCurrentReturnMitigationsInPlace: "Please, give us more time!"
          });
        });
      });
    });
  });
  describe("Given pre-populated form data", () => {
    describe("Example 1", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "5",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy);
      });

      it("Displays the Current Return Likelihood", () => {
        expect(risk.findReturnLikelihoodValue()).toEqual("5");
      });

      it("Displays the Change in Risk", () => {
        expect(risk.findChangeInRiskValue()).toEqual("Yes");
      });

      it("Displays the Current Mitigation in Place", () => {
        expect(risk.findCurrentMitigationsInPlaceValue()).toEqual(
          "Nothing yet!"
        );
      });
    });

    describe("Example 2", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "3",
          riskAnyChange: "No",
          riskCurrentReturnMitigationsInPlace: "More cat teamwork!"
        };
        risk = new RiskComponent(formData, onChangeSpy);
      });

      it("Displays the Current Return Likelihood", () => {
        expect(risk.findReturnLikelihoodValue()).toEqual("3");
      });

      it("Displays the Change in Risk", () => {
        expect(risk.findChangeInRiskValue()).toEqual("No");
      });

      it("Displays the Current Mitigation in Place", () => {
        expect(risk.findCurrentMitigationsInPlaceValue()).toEqual(
          "More cat teamwork!"
        );
      });
    });
  });
  describe("Changing pre-populated form data", () => {
    describe("Example 1", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "5",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy);
      });

      it("Updates the value of current return likelihood", () => {
        risk.simulateCurrentLikelihood("2");
        expect(risk.findReturnLikelihoodValue()).toEqual("2");
      });

      it("Updates the value of change in risk", () => {
        risk.simulateChangeInRisk("No");
        expect(risk.findChangeInRiskValue()).toEqual("No");
      });

      it("Updates the value of current mitigations in place", () => {
        risk.simulateCurrentMitigationInPlace("We've done something now.");
        expect(risk.findCurrentMitigationsInPlaceValue()).toEqual(
          "We've done something now."
        );
      });
    });

    describe("Example 2", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "5",
          riskAnyChange: "No",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy);
      });

      it("Updates the value of current return likelihood", () => {
        risk.simulateCurrentLikelihood("3");
        expect(risk.findReturnLikelihoodValue()).toEqual("3");
      });

      it("Updates the value of change in risk", () => {
        risk.simulateChangeInRisk("Yes");
        expect(risk.findChangeInRiskValue()).toEqual("Yes");
      });

      it("Updates the value of current mitigations in place", () => {
        risk.simulateCurrentMitigationInPlace("Mitigations forever.");
        expect(risk.findCurrentMitigationsInPlaceValue()).toEqual(
          "Mitigations forever."
        );
      });
    });
  });
});
