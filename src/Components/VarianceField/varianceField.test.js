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
      beforeEach(() => {
        let schema = { title: "Variance One" };
        let formData = { baseline: "2019-01-01" };
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

      it("Renders the target date", () => {
        let targetDate = field.find("[data-test='target-date']").text();
        expect(targetDate).toEqual("2019-01-01");
      });

      it("Renders the status selector defaulting to on schedule", () => {
        let status = field.find("[data-test='variance-status']").props().value;
        expect(status).toEqual("On schedule");
      });

      it("Renders the percentage complete field", () => {
        let percentComplete = field.find("[data-test='variance-percentage']");
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
        let updatedValue = field.find("[data-test='britishDate-fake']");
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
          let updatedValue = field.find("[data-test='britishDate-fake']");

          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
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
          expect(completedDate.length).toEqual(1);
        });

        it("Does not show the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.length).toEqual(0);
        });

      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        let schema = { title: "Meow Meow Fuzzyface" };
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
        let targetDate = field.find("[data-test='target-date']").text();
        expect(targetDate).toEqual("2020-12-31");
      });

      it("Renders the status selector defaulting to on schedule", () => {
        let status = field.find("[data-test='variance-status']").props().value;
        expect(status).toEqual("On schedule");
      });

      it("Renders the percentage complete field", () => {
        let percentComplete = field.find("[data-test='variance-percentage']");
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
        let updatedValue = field.find("[data-test='britishDate-fake']");
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
          let updatedValue = field.find("[data-test='britishDate-fake']");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
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
          let schema = { title: "Meow Meow Fuzzyface" };
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
          let schema = { title: "Meow Meow Fuzzyface" };
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
          let schema = { title: "Meow Meow Fuzzyface" };
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
          expect(baselineVariance.length).toEqual(1);
        });

        it("Calculates the baseline variance correctly field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          expect(baselineVariance.text()).toEqual("3");
        });

        it("Renders the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.length).toEqual(1);
        });

        it("Calculates the return variance correctly field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.text()).toEqual("2");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='britishDate-fake']")
            .props().value;
          expect(updatedValue).toEqual("02/25/2020");
        });

        it("Fills in the reason for variance", () => {
          let reason = field.find("[data-test='variance-reason']").props()
            .value;
          expect(reason).toEqual("There were delays");
        });
      });

      describe("Example two", () => {
        beforeEach(() => {
          let schema = { title: "Meow Meow Fuzzyface" };
          let formData = {
            baseline: "02/02/2020",
            status: "Delayed",
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
          expect(status).toEqual("Delayed");
        });

        it("Renders the baseline variance field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          expect(baselineVariance.length).toEqual(1);
        });

        it("Calculates the baseline variance correctly field", () => {
          let baselineVariance = field.find("[data-test='baseline-variance']");
          expect(baselineVariance.text()).toEqual("3");
        });

        it("Renders the return variance field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.length).toEqual(1);
        });

        it("Calculates the return variance correctly field", () => {
          let returnVariance = field.find("[data-test='return-variance']");
          expect(returnVariance.text()).toEqual("1");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='britishDate-fake']")
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
        let schema = { title: "Meow Meow Fuzzyface" };
        let name = "planningSubmitted";
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100,
          completedDate: "2021-01-01"
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
          expect(reference.length).toEqual(1);
        });
      });

      describe("Example two", () => {
        let schema = { title: "Meow Meow Fuzzyface" };
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
        let schema = { title: "Meow Meow Fuzzyface" };
        let name = "procurementStatusAgainstLastReturn";
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

        it("Does render the contractor name field", () => {
          let name = field.find("[data-test='variance-name']");
          expect(name.length).toEqual(1);
        });
      });
    });
  });

  describe("When updating fields", () => {
    let onChangeSpy;

    describe("When delayed", () => {
      beforeEach(() => {
        onChangeSpy = jest.fn();
        let schema = { title: "Meow Meow Fuzzyface" };
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
              .find("[data-test='britishDate-fake']")
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
              .find("[data-test='britishDate-fake']")
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
      beforeEach(() => {
        onChangeSpy = jest.fn();
        let schema = { title: "Meow Meow Fuzzyface" };
        let formData = {
          baseline: "2020-12-31",
          status: "Completed",
          percentComplete: 100
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

      describe("When changing the completed date", () => {
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

        describe("Example one", () => {
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
    });
  });
});
