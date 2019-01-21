import RiskField from ".";
import React from "react";
import { mount } from "enzyme";
import WidgetFake from "../../../test/WidgetFake";
import FieldFake from "../../../test/FieldFake";


class BritishDateFake extends WidgetFake {
  datatest="britishDate-fake"
}

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

class RiskComponent {
  constructor(formData, onChange, schema, disabled = false) {
    let uiSchema = {};
    if (disabled) {
      uiSchema = {
        riskBaselineRisk: {"ui:disabled": true},
        riskBaselineImpact: {"ui:disabled": true},
        riskBaselineLikelihood: {"ui:disabled": true},
        riskBaselineMitigationsInPlace: {"ui:disabled": true},
        riskCurrentReturnLikelihood: {"ui:disabled": true},
        riskCompletionDate: {"ui:disabled": true},
        riskAnyChange: {"ui:disabled": true},
        riskMet: {"ui:disabled": true},
        riskCurrentReturnMitigationsInPlace: {"ui:disabled": true}
      };
    }
    this.risk = mount(
      <RiskField
        schema={schema}
        formData={formData}
        uiSchema={uiSchema}
        onChange={onChange}
        registry={
          {
            widgets: {
              britishDate: BritishDateFake
            },
            fields: {
              SchemaField: FieldFake
            }
          }
        }
      />
    );
  }
  description = (title) => this.risk.find(`[data-test='risk-description${title}']`).text();

  impact = (title) => this.risk.find(`[data-test='risk-impact${title}']`).text();

  likelihood = (title) => this.risk.find(`[data-test='risk-likelihood${title}']`).text();

  title = () => this.risk.find("[data-test='schema-title']").text();

  mitigationsInPlace = (title) =>
    this.risk.find(`[data-test='risk-mitigation-in-place${title}']`).text();

  simulateChangeRiskMet = (inputValue) => {
    this.risk
      .find("#root_risk-met")
      .simulate("change", { target: { value: inputValue }})
  }

  simulateChangeCompletedDate = (inputValue) => {
    this.risk
      .find(`[data-test='britishDate-fake']`)
      .simulate("change", { target: { value: inputValue }})
  }

  simulateCurrentLikelihood = inputValue =>
    this.risk
      .find("#root_current-return-likelihood")
      .simulate("change", { target: { value: inputValue } });

  simulateChangeInRisk = inputValue =>
    this.risk
      .find("#root_change-in-risk")
      .simulate("change", { target: { value: inputValue } });

  simulateCurrentMitigationInPlace = inputValue =>
    this.risk
      .find("[data-test='risk-current-mitigations-in-place']")
      .simulate("change", { target: { value: inputValue } });

  findReturnLikelihoodValue = () =>
    this.risk.find("#root_current-return-likelihood").props().value;

  findChangeInRiskValue = () =>
    this.risk.find("#root_change-in-risk").props().value;

  findCurrentMitigationsInPlaceValue = () =>
    this.risk.find("[data-test='risk-current-mitigations-in-place']").props()
      .value;

  riskMet = () => this.risk.find("#root_risk-met").props().value;

  riskCompletedDate = () => this.risk.find(`[data-test='risk-completed-date']`).props().value;

  riskCompletedDateIsDisabled = () => {
    let uiSchema = this.risk
      .find("[data-test='risk-completed-date']")
      .props()
      .uiSchema;
    return uiSchema && uiSchema["ui:disabled"];
  }

  currentReturnLikelihoodIsDisabled = () => {
    let uiSchema = this.risk
      .find("[data-test='current-return-likelihood']")
      .props()
      .uiSchema;
    return uiSchema && uiSchema["ui:disabled"];
  }

  isCurentMitigationsInPlacePresent = () =>
    this.risk.find(`[data-test='risk-current-mitigations-in-place']`).length;

  isCurentReturnLikelihoodPresent = () =>
    this.risk.find("#root_current-return-likelihood").length;

  isAnyChangePresent = () =>
    this.risk.find("#root_change-in-risk").length;

  changeInRiskIsDisabled = () => {
    let uiSchema = this.risk
      .find("[data-test='change-in-risk']")
      .props()
      .uiSchema;
    return uiSchema && uiSchema["ui:disabled"];
  }

  riskCurrentReturnMitigationsInPlaceIsDisabled = () =>
    this.risk
      .find("[data-test='risk-current-mitigations-in-place']")
      .props()
      .disabled;

  isCompletedDatePresent = () =>
    this.risk.find(`[data-test='risk-completed-date']`).length;
}

describe("<RiskField>", () => {
  let onChangeSpy, schema;
  beforeEach(()=> {
    onChangeSpy = jest.fn();
    schema = {
      title: "blah",
      properties: {
        riskAnyChange: {
          type: 'string',
          title: 'Any Change?',
          enum: ["Yes", "No"]
        },
        riskCurrentReturnLikelihood: {
          type: "string",
          title: "Current Return Liklihood",
          enum: ["1", "2", "3", "4", "5"]
        },
        riskMet: {
          type: "string",
          title: "Risk Met?",
          enum: ["Yes", "No"]
        }
      }
    }
  })
  describe("Readonly fields", () => {
    describe("Example 1", () => {
      let formData = {
        riskBaselineRisk: "This is a very risky risk.",
        riskBaselineImpact: "1",
        riskBaselineLikelihood: "2",
        riskBaselineMitigationsInPlace: "This cat is mitigating the risk"
      };
      schema = {
        title: "Risk Fields",
        properties: {
          riskBaselineRisk: { title: "baseline"},
          riskBaselineImpact: { title: "impact"},
          riskBaselineLikelihood: { title: "likelihood"},
          riskBaselineMitigationsInPlace: { title: "mitigation"},
          riskAnyChange: {
            type: 'string',
            title: 'Any Change?',
            enum: ["Yes", "No"]
          },
          riskCurrentReturnLikelihood: {
            type: "string",
            title: "Current Return Liklihood",
            enum: ["1", "2", "3", "4", "5"]
          },
          riskMet: {
            type: "string",
            title: "Risk Met?",
            enum: ["Yes", "No"]
          }
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
      schema = {
        title: "More Risky Field Data",
        properties: {
          riskBaselineRisk: { title: "basedown"},
          riskBaselineImpact: { title: "impale"},
          riskBaselineLikelihood: { title: "likeymelikey"},
          riskBaselineMitigationsInPlace: { title: "mightdo"},
          riskAnyChange: {
            type: 'string',
            title: 'Any Change?',
            enum: ["Yes", "No"]
          },
          riskCurrentReturnLikelihood: {
            type: "string",
            title: "Current Return Liklihood",
            enum: ["1", "2", "3", "4", "5"]
          },
          riskMet: {
            type: "string",
            title: "Risk Met?",
            enum: ["Yes", "No"]
          }
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
        riskBaselineMitigationsInPlace: "Cut down the tree",
        riskMet: "No"
      };
      risk = new RiskComponent(formData, onChangeSpy, schema);
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
            riskAnyChange: undefined,
            riskMet: "No",
            riskCompletionDate: undefined,
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
            riskAnyChange: undefined,
            riskMet: "No",
            riskCompletionDate: undefined,
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
            riskMet: "No",
            riskCompletionDate: undefined,
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeInRisk("Yes");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "Yes",
            riskMet: "No",
            riskCompletionDate: undefined,
            riskCurrentReturnMitigationsInPlace: undefined
          });
        });
      });
    });

    describe("When selecting a change in current mitigations in place", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", async () => {
          risk.simulateChangeInRisk("Yes");
          risk.simulateCurrentMitigationInPlace(
            "We haven't done anything yet, stop nagging!"
          );

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: "Yes",
            riskMet: "No",
            riskCompletionDate: undefined,
            riskCurrentReturnMitigationsInPlace:
              "We haven't done anything yet, stop nagging!"
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeInRisk("Yes");
          risk.simulateCurrentMitigationInPlace("Please, give us more time!");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskMet: "No",
            riskCompletionDate: undefined,
            riskAnyChange: "Yes",
            riskCurrentReturnMitigationsInPlace: "Please, give us more time!"
          });
        });
      });
    });
    describe("When selecting whether the risk is met", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeRiskMet("No");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: undefined,
            riskCurrentReturnMitigationsInPlace: undefined,
            riskMet: "No",
            riskCompletionDate: undefined
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeRiskMet("Yes");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: undefined,
            riskCurrentReturnMitigationsInPlace: undefined,
            riskMet: "Yes",
            riskCompletionDate: undefined
          });
        });
      });
    });

    describe("When entering a the complete date", () => {
      describe("Example 1", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeRiskMet("Yes");
          risk.simulateChangeCompletedDate("01-01-01")

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: undefined,
            riskCurrentReturnMitigationsInPlace: undefined,
            riskMet: "Yes",
            riskCompletionDate: "01-01-01"
          });
        });
      });

      describe("Example 2", () => {
        it("Updates the value of the field", () => {
          risk.simulateChangeRiskMet("Yes");

          risk.simulateChangeCompletedDate("02-02-02");

          expect(onChangeSpy).toHaveBeenCalledWith({
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "1",
            riskAnyChange: undefined,
            riskCurrentReturnMitigationsInPlace: undefined,
            riskMet: "Yes",
            riskCompletionDate: "02-02-02"
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
          riskMet: "No",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema);
      });

      it("Displays the Current Return Likelihood", () => {
        expect(risk.findReturnLikelihoodValue()).toEqual("5");
      });

      it("Displays the Change in Risk", () => {
        expect(risk.findChangeInRiskValue()).toEqual("Yes");
      });

      it("Displays the risk met", () => {
        expect(risk.riskMet()).toEqual("No")
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
          riskMet: "No",
          riskCompletionDate: "01-02-03",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "More cat teamwork!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema);
      });

      it("Displays the Current Return Likelihood", () => {
        expect(risk.findReturnLikelihoodValue()).toEqual("3");
        expect(risk.currentReturnLikelihoodIsDisabled()).toBeFalsy();
      });

      it("Displays the Change in Risk", () => {
        expect(risk.findChangeInRiskValue()).toEqual("Yes");
        expect(risk.changeInRiskIsDisabled()).toBeFalsy();
      });

      it("Displays whether the risk has been met", () => {
        expect(risk.riskMet()).toEqual("No")
      });

      it("Displays the completed date", () => {
        risk.simulateChangeRiskMet("Yes")
        expect(risk.riskCompletedDate()).toEqual("01-02-03")
        expect(risk.riskCompletedDateIsDisabled()).toBeFalsy();
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
          riskMet: "No",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema);
      });

      it("Updates the value of current return likelihood", () => {
        risk.simulateCurrentLikelihood("2");
        expect(risk.findReturnLikelihoodValue()).toEqual("2");
      });

      it("Updates the value of change in risk", () => {
        risk.simulateChangeInRisk("Yes");
        expect(risk.findChangeInRiskValue()).toEqual("Yes");
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
          riskAnyChange: "Yes",
          riskMet: "No",
          riskCurrentReturnMitigationsInPlace: "Nothing yet!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema);
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
  describe("dependency", () => {
    describe("On any change in risk", () => {
      describe("Example 1", () => {
        let risk;
        beforeEach(() => {
          let formData = {
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskCurrentReturnLikelihood: "5",
            riskAnyChange: "No"
          };
          risk = new RiskComponent(formData, onChangeSpy, schema);
        });

        it("Hides current return mitigation if any change is no", () => {
          expect(risk.isCurentMitigationsInPlacePresent()).toEqual(0)
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
            riskMet: "No",
            riskAnyChange: "Yes"
          };
          risk = new RiskComponent(formData, onChangeSpy, schema);
        });

        it("Shows current return mitigation if any change is Yes" , () => {
          expect(risk.isCurentMitigationsInPlacePresent()).toEqual(1);
          expect(risk.riskCurrentReturnMitigationsInPlaceIsDisabled()).toBeFalsy();
        });
      });
    });

    describe("On risk Met", () => {
      describe("Example 1 - risk is complete", () => {
        let risk;
        beforeEach(() => {
          let formData = {
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskMet: "Yes"
          };
          risk = new RiskComponent(formData, onChangeSpy, schema);
        });

        it("Hides current return mitigation", () => {
          expect(risk.isCurentMitigationsInPlacePresent()).toEqual(0)
        });

        it("Hides current return likelihood", () => {
          expect(risk.isCurentReturnLikelihoodPresent()).toEqual(0)
        });

        it("Hides any change", () => {
          expect(risk.isAnyChangePresent()).toEqual(0)
        });

        it("Shows Completed date", () => {
          expect(risk.isCompletedDatePresent()).toEqual(1)
        })
      });

      describe("Example 2 - risk is not complete", () => {
        let risk;
        beforeEach(() => {
          let formData = {
            riskBaselineRisk: "Cat gets stuck in the tree",
            riskBaselineImpact: "3",
            riskBaselineLikelihood: "4",
            riskBaselineMitigationsInPlace: "Cut down the tree",
            riskMet: "No",
            riskAnyChange: "Yes"
          };
          risk = new RiskComponent(formData, onChangeSpy, schema);
        });

        it("Shows current return mitigation", () => {
          expect(risk.isCurentMitigationsInPlacePresent()).toEqual(1)
        });

        it("Shows current return likelihood", () => {
          expect(risk.isCurentReturnLikelihoodPresent()).toEqual(1)
        });

        it("Shows any change", () => {
          expect(risk.isAnyChangePresent()).toEqual(1)
        });

        it("Hides Completed date", () => {
          expect(risk.isCompletedDatePresent()).toEqual(0)
        })
      });
    });
  });
  describe("Disabled", () => {
    describe("Risk met", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "3",
          riskMet: "Yes",
          riskCompletionDate: "01-02-03",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "More cat teamwork!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema, true);
      });

      it("The completed date", () => {
        expect(risk.riskCompletedDateIsDisabled()).toBeTruthy();
      });
    });

    describe("Risk not met", () => {
      let risk;
      beforeEach(() => {
        let formData = {
          riskBaselineRisk: "Cat gets stuck in the tree",
          riskBaselineImpact: "3",
          riskBaselineLikelihood: "4",
          riskBaselineMitigationsInPlace: "Cut down the tree",
          riskCurrentReturnLikelihood: "3",
          riskMet: "No",
          riskCompletionDate: "01-02-03",
          riskAnyChange: "Yes",
          riskCurrentReturnMitigationsInPlace: "More cat teamwork!"
        };
        risk = new RiskComponent(formData, onChangeSpy, schema, true);
      });

      it("Current return likelihood", () => {
        expect(risk.currentReturnLikelihoodIsDisabled()).toBeTruthy();
      });

      it("Change in risk", () => {
        expect(risk.changeInRiskIsDisabled()).toBeTruthy();
      });

      it("Current mitigations in place", () => {
        expect(risk.riskCurrentReturnMitigationsInPlaceIsDisabled()).toBeTruthy();
      });
    });
  });
});
