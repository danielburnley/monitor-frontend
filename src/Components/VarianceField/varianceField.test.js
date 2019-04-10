import React from "react";
import WidgetFake from "../../../test/WidgetFake";
import VarianceField from ".";
import { shallow, mount } from "enzyme";

class PercentageFake extends WidgetFake {
  datatest="percentage-fake"
}
class BritishDateFake extends WidgetFake {
  datatest="britishDate-fake"
}

describe("VarianceField", () => {
  let field;
  let registryStub = {
    widgets: {
      percentage: PercentageFake,
      britishDate: BritishDateFake
    }
  };

  describe("Given only baseline data", () => {
    describe("Example one", () => {
      let schema;

      beforeEach(() => {
        schema = {
          title: "Variance One",
          properties: {
            baseline: {
              title: "Unique Title One"
            },
            percentComplete: {
              title: "Percent Complete"
            },
            status: {
              title: "Status"
            },
            current: {
              title: "Current"
            },
            reason: {
              title: "Reason"
            },
            completedDate: {
              title: "Completed Date"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Baseline Full Planning Permission Submitted"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Last Return Full Planning Permission Submitted"
            },
            previousReturn: {
              title: "Previous Return"
            },
            onCompletedReference: {
              title: "On Completed Reference"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of Contractor"
            }
          }
        };
        let formData = {
          baseline: "2019-01-01"
        };
        field = mount(
          <VarianceField
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );
      });

      it("Renders the title", () => {
        let fieldTitle = field.find("[data-test='field-title']").text();
        expect(fieldTitle).toEqual("Variance One");
      });

      it("Renders the title of the target date", () => {
        let targetDate = field.find("[data-test='target-date-title']").text();
        expect(targetDate).toEqual("Unique Title One");
      });

      it("Renders the target date", () => {
        let targetDate = field
          .find("[data-test='target-date'] [data-test='britishDate-fake']")
          .props()
          .value;
        expect(targetDate).toEqual("2019-01-01");
      });

      it("Can edit the target date", async () => {
        let targetDate = field
          .find("[data-test='target-date'] [data-test='britishDate-fake']")
          .simulate("change", { target: { value: "1970-01-01" } });

        await field.update();

        expect(
          field
            .find("[data-test='target-date'] [data-test='britishDate-fake']")
            .props().value
        ).toEqual("1970-01-01");
      });

      it("Renders the status selector defaulting to on schedule and title", () => {
        let status = field.find("[data-test='variance-status']").props().value;
        let title = field.find("[data-test='variance-status-title']").text();
        expect(status).toEqual("On schedule");
        expect(title).toEqual("Status*");
      });

      it("Renders the percentage complete field", () => {
        let percentComplete = field.find("[data-test='variance-percentage']");
        let title = field.find("[data-test='variance-percentage-title']").text();

        expect(percentComplete.length).toEqual(1);
        expect(title).toEqual("Percent Complete*");
      });

      it("Does not show the baseline variance field", () => {
        let baselineVariance = field.find("[data-test='baseline-variance']");

        expect(baselineVariance.length).toEqual(0);
      });

      it("Does not show the return variance field", () => {
        let returnVariance = field.find("[data-test='return-variance']");

        expect(returnVariance.length).toEqual(0);
      });

      it("Does not show the updated value field", () => {
        let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
        expect(updatedValue.length).toEqual(0);
      });

      it("Does not show the reason for variance field", () => {
        let reason = field.find("[data-test='variance-reason']");
        expect(reason.length).toEqual(0);
      });

      it("Does not show the completed date field", () => {
        let completedDate = field.find("[data-test='variance-completed']");
        expect(completedDate.length).toEqual(0);
      });

      describe("When selecting Delayed", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();

          expect(updatedValue.length).toEqual(1);
          expect(title).toEqual("Current*")
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();

          expect(reason.length).toEqual(1);
          expect(title).toEqual("Reason*")
        });
      });

      describe("When selecting Delayed - minimal impact", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - minimal impact" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();

          expect(updatedValue.length).toEqual(1);
          expect(title).toEqual("Current*")
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();

          expect(reason.length).toEqual(1);
          expect(title).toEqual("Reason*")
        });
      });

      describe("When selecting Delayed - moderate impact", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - moderate impact" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();

          expect(updatedValue.length).toEqual(1);
          expect(title).toEqual("Current*")
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();

          expect(reason.length).toEqual(1);
          expect(title).toEqual("Reason*")
        });
      });

      describe("When selecting Delayed - critical", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - critical" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();

          expect(updatedValue.length).toEqual(1);
          expect(title).toEqual("Current*")
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();

          expect(reason.length).toEqual(1);
          expect(title).toEqual("Reason*")
        });
      });

      describe("When selecting completed", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Completed" } });
        });

        it("Shows the completed date field", () => {
          let completedDate = field.find("[data-test='variance-completed']");
          let title = field.find("[data-test='variance-completed-title']").text();

          expect(completedDate.length).toEqual(1);
          expect(title).toEqual("Completed Date*")
        });

        it("Does not show the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.length).toEqual(0);
        });

        describe("Validation", () => {
          describe("Doesn't show a validation error", () => {
            describe("when completed date is set to before targetDateOfAchievingStart", () => {
              it("Example 1", async () => {
                let formData = {
                  targetDateOfAchievingStart: "2019-01-01",
                  baseline: "2019-01-01"
                };
                field = mount(
                  <VarianceField
                    schema={schema}
                    formData={formData}
                    onChange={jest.fn()}
                    registry={registryStub}
                    />
                );

                field
                .find("[data-test='variance-status']")
                .simulate("change", { target: { value: "Completed" } });

                let completedDate = field
                .find("[data-test='variance-completed']")
                .simulate("change", {target: {value: "2018-02-01"}});

                expect(field.find(".has-error").length).toEqual(0);
                expect(field.find("[data-test='validation-error-msg']").length).toEqual(0);
              });

              it("Example 2", async () => {
                let formData = {
                  targetDateOfAchievingStart: "2019-09-08",
                  baseline: "2019-01-01"
                };
                field = mount(
                  <VarianceField
                    schema={schema}
                    formData={formData}
                    onChange={jest.fn()}
                    registry={registryStub}
                  />
                );

                field
                  .find("[data-test='variance-status']")
                  .simulate("change", { target: { value: "Completed" } });

                let completedDate = field
                  .find("[data-test='variance-completed']")
                  .simulate("change", {target: {value: "2018-11-01"}});

                  expect(field.find(".has-error").length).toEqual(0);
                  expect(field.find("[data-test='validation-error-msg']").length).toEqual(0);
              });
            });
          });

          describe("Shows a validation error when completed date is set to after targetDateOfAchievingStart", () => {
            it("Example 1", async () => {
              let formData = {
                targetDateOfAchievingStart: "2019-01-08",
                baseline: "2019-01-01"
              };
              field = mount(
                <VarianceField
                  schema={schema}
                  formData={formData}
                  onChange={jest.fn()}
                  registry={registryStub}
                />
              );

              field
                .find("[data-test='variance-status']")
                .simulate("change", { target: { value: "Completed" } });

              let completedDate = field
                .find("[data-test='variance-completed']")
                .simulate("change", {target: {value: "2019-10-22"}});

              expect(field.find(".has-error").length).toEqual(1);
              expect(field.find("[data-test='validation-error-msg']").length).toEqual(1);
            });

            it("Example 2", async () => {
              let formData = {
                targetDateOfAchievingStart: "2019-03-03",
                baseline: "2019-01-01"
              };
              field = mount(
                <VarianceField
                  schema={schema}
                  formData={formData}
                  onChange={jest.fn()}
                  registry={registryStub}
                />
              );

              field
                .find("[data-test='variance-status']")
                .simulate("change", { target: { value: "Completed" } });

              let completedDate = field
                .find("[data-test='variance-completed']")
                .simulate("change", {target: {value: "2019-11-01"}});

              expect(field.find("[data-test='validation-error-msg']").length).toEqual(1);
              expect(field.find(".has-error").length).toEqual(1);
            });
          });
        });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Dog annihilation submission"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let formData = { baseline: "2020-12-31" };
        field = mount(
          <VarianceField
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );
      });

      it("Renders the title", () => {
        let fieldTitle = field.find("[data-test='field-title']").text();
        expect(fieldTitle).toEqual("Meow Meow Fuzzyface");
      });

      it("Renders the target date", () => {
        let targetDate = field.find("[data-test='target-date'] [data-test='britishDate-fake']").props().value;
        let title = field.find("[data-test='target-date-title']").text();
        expect(title).toEqual("Unique Title Two");
        expect(targetDate).toEqual("2020-12-31");
      });

      it("Renders the status selector defaulting to on schedule", () => {
        let status = field.find("[data-test='variance-status']").props().value;
        let title = field.find("[data-test='variance-status-title']").text();
        expect(title).toEqual("Status of the Dog*");
        expect(status).toEqual("On schedule");
      });

      it("Renders the percentage complete field", () => {
        let percentComplete = field.find("[data-test='variance-percentage']");
        let title = field.find("[data-test='variance-percentage-title']").text();
        expect(title).toEqual("Percentage of Cats*");
        expect(percentComplete.length).toEqual(1);
      });

      it("Does not show the baseline variance field", () => {
        let baselineVariance = field.find("[data-test='baseline-variance']");
        expect(baselineVariance.length).toEqual(0);
      });

      it("Does not show the return variance field", () => {
        let returnVariance = field.find("[data-test='return-variance']");
        expect(returnVariance.length).toEqual(0);
      });

      it("Does not show the updated value field", () => {
        let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
        expect(updatedValue.length).toEqual(0);
      });

      it("Does not show the reason for variance field", () => {
        let reason = field.find("[data-test='variance-reason']");
        expect(reason.length).toEqual(0);
      });

      describe("When selecting Delayed", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();
          expect(title).toEqual("Current amount of Cats*");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();
          expect(title).toEqual("Reason for Cats Empire*");
          expect(reason.length).toEqual(1);
        });
      });

      describe("When selecting Delayed - minimal impact", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - minimal impact" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();
          expect(title).toEqual("Current amount of Cats*");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();
          expect(title).toEqual("Reason for Cats Empire*");
          expect(reason.length).toEqual(1);
        });
      });

      describe("When selecting Delayed - moderate impact", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - moderate impact" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();
          expect(title).toEqual("Current amount of Cats*");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();
          expect(title).toEqual("Reason for Cats Empire*");
          expect(reason.length).toEqual(1);
        });
      });

      describe("When selecting Delayed - critical", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Delayed - critical" } });
        });

        it("Shows the updated value field", () => {
          let updatedValue = field.find("[data-test='current-date'] [data-test='britishDate-fake']");
          let title = field.find("[data-test='current-date-title']").text();
          expect(title).toEqual("Current amount of Cats*");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          let title = field.find("[data-test='variance-reason-title']").text();
          expect(title).toEqual("Reason for Cats Empire*");
          expect(reason.length).toEqual(1);
        });
      });

      describe("When selecting completed", () => {
        beforeEach(() => {
          let status = field.find("[data-test='variance-status']");
          status.simulate("change", { target: { value: "Completed" } });
        });

        it("Shows the completed date field", () => {
          let completedDate = field.find("[data-test='variance-completed']");
          let title = field.find("[data-test='variance-completed-title']").text();
          expect(title).toEqual("Completed Date of DOg annihilation*");
          expect(completedDate.length).toEqual(1);
        });

        it("Does not show the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.length).toEqual(0);
        });
      });
    });
  });

  describe("Given all the variance data", () => {
    describe("When on schedule", () => {
      describe("Example one", () => {
        it("Fills in the percentage complete correctly", () => {
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title One"
              },
              percentComplete: {
                title: "Percent Complete"
              },
              status: {
                title: "Status"
              },
              current: {
                title: "Current"
              },
              reason: {
                title: "Reason"
              },
              completedDate: {
                title: "Completed Date"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Baseline Full Planning Permission Submitted"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Last Return Full Planning Permission Submitted"
              },
              previousReturn: {
                title: "Previous Return"
              },
              onCompletedReference: {
                title: "On Completed Reference"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of Contractor"
              }
            }
          };
          let formData = {
            baseline: "2020-12-31",
            status: "On schedule",
            percentComplete: 50
          };
          let field = mount(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
              registry={registryStub}
            />
          );

          let percentComplete = field
            .find("[data-test='variance-percentage']")
            .props().value;

          expect(percentComplete).toEqual(50);
        });
      });

      describe("Example two", () => {
        it("Fills in the percentage complete correctly", () => {
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title Two"
              },
              percentComplete: {
                title: "Percentage of Cats"
              },
              status: {
                title: "Status of the Dog"
              },
              current: {
                title: "Current amount of Cats"
              },
              reason: {
                title: "Reason for Cats Empire"
              },
              completedDate: {
                title: "Completed Date of DOg annihilation"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Dog annihilation submission"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Permission for cat amageddon submitted"
              },
              previousReturn: {
                title: "Previous attempt of destruction"
              },
              onCompletedReference: {
                title: "On Completion cat party"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of winner"
              }
            }
          };

          let formData = {
            baseline: "2020-12-31",
            status: "On schedule",
            percentComplete: 90
          };

          let field = shallow(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
              registry={registryStub}
            />
          );

          let percentComplete = field
            .find("[data-test='variance-percentage']")
            .props().value;

          expect(percentComplete).toEqual(90);
        });
      });
    });

    describe("When delayed", () => {
      describe("Example one", () => {
        beforeEach(() => {
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title One"
              },
              percentComplete: {
                title: "Percent Complete"
              },
              status: {
                title: "Status"
              },
              current: {
                title: "Current"
              },
              reason: {
                title: "Reason"
              },
              completedDate: {
                title: "Completed Date"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Baseline Full Planning Permission Submitted"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Last Return Full Planning Permission Submitted"
              },
              previousReturn: {
                title: "Previous Return"
              },
              onCompletedReference: {
                title: "On Completed Reference"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of Contractor"
              }
            }
          };
          let formData = {
            baseline: "02/01/2020",
            status: "Delayed",
            percentComplete: 10,
            current: "02/25/2020",
            previousReturn: "02/08/2020",
            reason: "There were delays"
          };
          field = mount(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
              registry={registryStub}
            />
          );
        });

        it("Renders the status as delayed", () => {
          let status = field.find("[data-test='variance-status']").props()
            .value;
          expect(status).toEqual("Delayed");
        });

        it("Renders the baseline variance field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          let title = field.find("[data-test='baseline-variance-title']").text();
          expect(title).toEqual("Baseline Full Planning Permission Submitted")
          expect(baselineVariance.length).toEqual(1);
        });

        it("Calculates the baseline variance correctly field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          expect(baselineVariance.text()).toEqual("3");
        });

        it("Renders the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          let title = field.find("[data-test='return-variance-title']").text();
          expect(title).toEqual("Last Return Full Planning Permission Submitted")
          expect(returnVariance.length).toEqual(1);
        });

        it("Calculates the return variance correctly field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.text()).toEqual("2");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='current-date'] [data-test='britishDate-fake']")
            .props().value;
          expect(updatedValue).toEqual("02/25/2020");
        });

        it("Enables the reason for variance", () => {
          expect(field.find("[data-test='variance-reason']").props().disabled).toBeFalsy();
        });

        it("Enables the reason for variance", () => {
          expect(
            field.find("[data-test='current-date']").props().disabled
          ).toBeFalsy();
        });

        it("Enables the percentage", () => {
          expect(
            field.find("[data-test='variance-percentage']").props().disabled
          ).toBeFalsy();
        });

        it("Enables the variance status", () => {
          expect(field.find("[data-test='variance-status']").props().disabled).toBeFalsy();
        });

        it("Fills in the reason for variance", () => {
          let reason = field.find("[data-test='variance-reason']").props()
            .value;
          expect(reason).toEqual("There were delays");
        });
      });

      describe("Example two", () => {
        beforeEach(() => {
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title Two"
              },
              percentComplete: {
                title: "Percentage of Cats"
              },
              status: {
                title: "Status of the Dog"
              },
              current: {
                title: "Current amount of Cats"
              },
              reason: {
                title: "Reason for Cats Empire"
              },
              completedDate: {
                title: "Completed Date of DOg annihilation"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Dog annihilation submission"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Permission for cat amageddon submitted"
              },
              previousReturn: {
                title: "Previous attempt of destruction"
              },
              onCompletedReference: {
                title: "On Completion cat party"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of winner"
              }
            }
          };
          let formData = {
            baseline: "02/02/2020",
            status: "Delayed - minimal impact",
            percentComplete: 10,
            current: "02/25/2020",
            reason: "Super delays",
            previousReturn: "02/16/2020"
          };
          field = mount(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
              registry={registryStub}
            />
          );
        });

        it("Renders the status as delayed", () => {
          let status = field.find("[data-test='variance-status']").props()
            .value;
          expect(status).toEqual("Delayed - minimal impact");
        });

        it("Renders the baseline variance field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          let title = field.find("[data-test='baseline-variance-title']").text();
          expect(title).toEqual("Dog annihilation submission")
          expect(baselineVariance.length).toEqual(1);
        });

        it("Calculates the baseline variance correctly field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          expect(baselineVariance.text()).toEqual("3");
        });

        it("Renders the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          let title = field.find("[data-test='return-variance-title']").text();
          expect(title).toEqual("Permission for cat amageddon submitted")
          expect(returnVariance.length).toEqual(1);
        });

        it("Calculates the return variance correctly field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.text()).toEqual("1");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='current-date'] [data-test='britishDate-fake']")
            .props().value;
          expect(updatedValue).toEqual("02/25/2020");
        });

        it("Fills in the reason for variance", () => {
          let reason = field.find("[data-test='variance-reason']").props()
            .value;
          expect(reason).toEqual("Super delays");
        });
      });
    });

    describe("When completed", () => {
      describe("Example one", () => {
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Dog annihilation submission"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let name = "planningSubmitted";
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100,
          completedDate: "2021-01-01",
          onCompletedReference: "The Reference"
        };
        let field = mount(
          <VarianceField
            name={name}
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );

        let completedDate = field
          .find("[data-test='variance-completed']")
          .props().value;
        it("Fills in the completed date correctly", () => {
          expect(completedDate).toEqual("2021-01-01");
        });

        it("Renders the reference field", () => {
          let reference = field.find("[data-test='variance-reference']");
          let title = field.find("[data-test='variance-reference-title']").text();
          expect(reference.length).toEqual(1);
          expect(title).toEqual("On Completion cat party*")
        });

        it("Doesn't render the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          let title = field.find("[data-test='return-variance-title']");
          expect(title.length).toEqual(0);
          expect(returnVariance.length).toEqual(0);
        });

        it("Prepopulates the reference field with the formdata", () => {
          let reference = field.find("[data-test='variance-reference']").props().value;
          expect(reference).toEqual("The Reference");
        });
      });

      describe("Example two", () => {
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Dog annihilation submission"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let name = "granted";
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100,
          completedDate: "2025-01-01"
        };
        let field = mount(
          <VarianceField
            name={name}
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );

        it("Fills in the completed date correctly", () => {
          let completedDate = field
            .find("[data-test='variance-completed']")
            .props().value;

          expect(completedDate).toEqual("2025-01-01");
        });

        it("Does no render the reference field", () => {
          let reference = field.find("[data-test='variance-reference']");
          expect(reference.length).toEqual(0);
        });
      });

      describe("procurementStatusAgainstLastReturn", () => {
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Dog annihilation submission"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let name = "procurementStatusAgainstLastReturn";
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100,
          completedDate: "2025-01-01",
          onCompletedNameOfContractor: "John"
        };
        let field = mount(
          <VarianceField
            name={name}
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );

        it("Fills in the completed date correctly", () => {
          let completedDate = field
            .find("[data-test='variance-completed']")
            .props().value;

          expect(completedDate).toEqual("2025-01-01");
        });

        it("Does render the contractor name field", () => {
          let name = field.find("[data-test='variance-name']");
          expect(name.length).toEqual(1);
        });

        it("Prepopulates the contractor name field with the form data", () => {
          let name = field.find("[data-test='variance-name']").props().value;
          expect(name).toEqual("John");
        });

        it("Enables variance completed", () => {
          expect(
            field.find("[data-test='variance-completed']").props().disabled
          ).toBeFalsy();
        });
      });
    });
  });

  describe("When updating fields", () => {
    let onChangeSpy;

    describe("When delayed", () => {
      beforeEach(() => {
        onChangeSpy = jest.fn();
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionGranted: {
              title: "Dog annihilation submission"
            },
            varianceAgainstLastReturn: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let formData = {
          baseline: "2020-12-31",
          status: "Delayed",
          percentComplete: 10,
          current: "2050-01-01",
          reason: "Super delays"
        };
        field = mount(
          <VarianceField
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
            registry={registryStub}
          />
        );
      });

      describe("When changing the status", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-status']")
            .simulate("change", { target: { value: "On schedule" } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "On schedule",
            percentComplete: 10,
            current: "2050-01-01",
            reason: "Super delays",
            completedDate: undefined
          });
        });
      });

      describe("When changing the percent complete", () => {
        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='percentage-fake']")
              .simulate("change", { target: { value: 15 } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 15,
              current: "2050-01-01",
              reason: "Super delays",
              completedDate: undefined
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='percentage-fake']")
              .simulate("change", { target: { value: 90 } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 90,
              current: "2050-01-01",
              reason: "Super delays",
              completedDate: undefined
            });
          });
        });
      });

      describe("When changing the current value", () => {
        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='current-date'] [data-test='britishDate-fake']")
              .simulate("change", { target: { value: "2040-01-01" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 10,
              current: "2040-01-01",
              reason: "Super delays",
              completedDate: undefined
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='current-date'] [data-test='britishDate-fake']")
              .simulate("change", { target: { value: "2020-05-01" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 10,
              current: "2020-05-01",
              reason: "Super delays",
              completedDate: undefined
            });
          });
        });
      });

      describe("When changing the reason value", () => {
        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-reason']")
              .simulate("change", { target: { value: "Mega delays" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 10,
              current: "2050-01-01",
              reason: "Mega delays",
              completedDate: undefined
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field.find("[data-test='variance-reason']").simulate("change", {
              target: { value: "Just the worst delays" }
            });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Delayed",
              percentComplete: 10,
              current: "2050-01-01",
              reason: "Just the worst delays",
              completedDate: undefined
            });
          });
        });
      });
    });

    describe("When completed", () => {

      describe("When changing onCompletedReference", () => {
        beforeEach(() => {
          onChangeSpy = jest.fn();
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title Two"
              },
              percentComplete: {
                title: "Percentage of Cats"
              },
              status: {
                title: "Status of the Dog"
              },
              current: {
                title: "Current amount of Cats"
              },
              reason: {
                title: "Reason for Cats Empire"
              },
              completedDate: {
                title: "Completed Date of DOg annihilation"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Dog annihilation submission"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Permission for cat amageddon submitted"
              },
              previousReturn: {
                title: "Previous attempt of destruction"
              },
              onCompletedReference: {
                title: "On Completion cat party"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of winner"
              }
            }
          };
          let formData = {
            baseline: "2020-12-31",
            status: "Completed",
            percentComplete: 100
          };
          let name = "planningSubmitted";
          field = mount(
            <VarianceField
              name={name}
              schema={schema}
              formData={formData}
              onChange={onChangeSpy}
              registry={registryStub}
            />
          );
        });

        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-reference']")
              .simulate("change", { target: { value: "HIF" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              completedDate: undefined,
              onCompletedReference: "HIF"
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-reference']")
              .simulate("change", { target: { value: "BIJ" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              completedDate: undefined,
              onCompletedReference: "BIJ"
            });
          });
        });
      });

      describe("When changing the completed date", () => {
        beforeEach(() => {
          onChangeSpy = jest.fn();
          let schema = {
            title: "Meow Meow Fuzzyface",
            properties: {
              baseline: {
                title: "Unique Title Two"
              },
              percentComplete: {
                title: "Percentage of Cats"
              },
              status: {
                title: "Status of the Dog"
              },
              current: {
                title: "Current amount of Cats"
              },
              reason: {
                title: "Reason for Cats Empire"
              },
              completedDate: {
                title: "Completed Date of DOg annihilation"
              },
              varianceBaselineFullPlanningPermissionSubmitted: {
                title: "Dog annihilation submission"
              },
              varianceLastReturnFullPlanningPermissionSubmitted: {
                title: "Permission for cat amageddon submitted"
              },
              previousReturn: {
                title: "Previous attempt of destruction"
              },
              onCompletedReference: {
                title: "On Completion cat party"
              },
              onCompletedNameOfContractor: {
                title: "On Completed Name Of winner"
              }
            }
          };
          let formData = {
            baseline: "2020-12-31",
            status: "Completed",
            percentComplete: 100
          };
          let name = "planningSubmitted";
          field = mount(
            <VarianceField
              name={name}
              schema={schema}
              formData={formData}
              onChange={onChangeSpy}
              registry={registryStub}
            />
          );
        });

        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-completed']")
              .simulate("change", { target: { value: "2020-01-01" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              completedDate: "2020-01-01"
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-completed']")
              .simulate("change", { target: { value: "2025-01-01" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              completedDate: "2025-01-01"
            });
          });
        });
      });

      describe("When changing the contractor name", () => {
        beforeEach(() => {
        onChangeSpy = jest.fn();
        let schema = {
          title: "Meow Meow Fuzzyface",
          properties: {
            baseline: {
              title: "Unique Title Two"
            },
            percentComplete: {
              title: "Percentage of Cats"
            },
            status: {
              title: "Status of the Dog"
            },
            current: {
              title: "Current amount of Cats"
            },
            reason: {
              title: "Reason for Cats Empire"
            },
            completedDate: {
              title: "Completed Date of DOg annihilation"
            },
            varianceBaselineFullPlanningPermissionSubmitted: {
              title: "Dog annihilation submission"
            },
            varianceLastReturnFullPlanningPermissionSubmitted: {
              title: "Permission for cat amageddon submitted"
            },
            previousReturn: {
              title: "Previous attempt of destruction"
            },
            onCompletedReference: {
              title: "On Completion cat party"
            },
            onCompletedNameOfContractor: {
              title: "On Completed Name Of winner"
            }
          }
        };
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100
        };
        let name = "procurementStatusAgainstLastReturn";
        field = mount(
          <VarianceField
            name={name}
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
            registry={registryStub}
          />
        );
      });

        describe("Example one", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-name']")
              .simulate("change", { target: { value: "Bob" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              onCompletedNameOfContractor: "Bob"
            });
          });
        });

        describe("Example two", () => {
          it("Calls the onChange prop with the updated form data", () => {
            field
              .find("[data-test='variance-name']")
              .simulate("change", { target: { value: "Jeremy" } });

            expect(onChangeSpy).toHaveBeenCalledWith({
              baseline: "2020-12-31",
              status: "Completed",
              percentComplete: 100,
              current: undefined,
              reason: undefined,
              onCompletedNameOfContractor: "Jeremy"
            });
          });
        });
      });
    });
  });

  describe("When disabling fields", () => {
    let field, schema, uiSchema;

    beforeEach(() => {
      schema = {
        title: "Meow Meow Fuzzyface",
        properties: {
          baseline: {
            title: "Unique Title One"
          },
          percentComplete: {
            title: "Percent Complete"
          },
          status: {
            title: "Status"
          },
          current: {
            title: "Current"
          },
          reason: {
            title: "Reason"
          },
          completedDate: {
            title: "Completed Date"
          },
          varianceBaselineFullPlanningPermissionSubmitted: {
            title: "Baseline Full Planning Permission Submitted"
          },
          varianceLastReturnFullPlanningPermissionSubmitted: {
            title: "Last Return Full Planning Permission Submitted"
          },
          previousReturn: {
            title: "Previous Return"
          },
          onCompletedReference: {
            title: "On Completed Reference"
          },
          onCompletedNameOfContractor: {
            title: "On Completed Name Of Contractor"
          }
        }
      };

      uiSchema = {
        baseline: {
          "ui:disabled": true
        },
        percentComplete: {
          "ui:disabled": true
        },
        status: {
          "ui:disabled": true
        },
        current: {
          "ui:disabled": true
        },
        reason: {
          "ui:disabled": true
        },
        completedDate: {
          "ui:disabled": true
        },
        varianceBaselineFullPlanningPermissionSubmitted: {
          "ui:disabled": true
        },
        varianceLastReturnFullPlanningPermissionSubmitted: {
          "ui:disabled": true
        },
        previousReturn: {
          "ui:disabled": true
        },
        onCompletedReference: {
          "ui:disabled": true
        },
        onCompletedNameOfContractor: {
          "ui:disabled": true
        }
      }
    });

    describe("Delayed", () => {
      beforeEach(() => {
        let formData = {
          baseline: "2020-12-31",
          status: "Delayed",
          percentComplete: 50
        };
        field = mount(
          <VarianceField
            schema={schema}
            formData={formData}
            uiSchema={uiSchema}
            onChange={jest.fn()}
            registry={registryStub}
          />
        );
      });

      it("Disables variance reason", () => {
        expect(field.find("[data-test='variance-reason']").props().disabled).toBeTruthy();
      });

      it("Disables the variance status", () => {
        expect(field.find("[data-test='variance-status']").props().disabled).toBeTruthy();
      });

      it("Disables current date", () => {
        expect(
          field.find("[data-test='current-date']").props().disabled
        ).toBeTruthy();
      });

      it("Disables percent complete", () => {
        expect(
          field.find("[data-test='variance-percentage']").props().disabled
        ).toBeTruthy();
      });
    });

    describe("Completed", () => {
      describe("name is submitted", () => {
        beforeEach(() => {
          let formData = {
            baseline: "2020-12-31",
            status: "Completed",
            percentComplete: 50
          };
          field = mount(
            <VarianceField
              name="submitted"
              schema={schema}
              formData={formData}
              uiSchema={uiSchema}
              onChange={jest.fn()}
              registry={registryStub}
              />
          );
        });

        it("Disables completed reference", () => {
          expect(field.find("[data-test='variance-reference']").props().disabled).toBeTruthy();
        });

        it("Disables variance completed", () => {
          expect(
            field.find("[data-test='variance-completed']").props().disabled
          ).toBeTruthy();
        });
      });

      describe("name is procurementStatusAgainstLastReturn", () => {
        beforeEach(() => {
          let formData = {
            baseline: "2020-12-31",
            status: "Completed",
            percentComplete: 50
          };
          field = mount(
            <VarianceField
              name="procurementStatusAgainstLastReturn"
              schema={schema}
              formData={formData}
              uiSchema={uiSchema}
              onChange={jest.fn()}
              registry={registryStub}
              />
          );
        });

        it("Disables completed name", () => {
          expect(field.find("[data-test='variance-name']").props().disabled).toBeTruthy();
        });
      });
    });
  });
});
