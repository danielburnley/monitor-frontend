import VarianceField from ".";
import React from "react";
import { shallow } from "enzyme";

describe("VarianceField", () => {
  let field;

  describe("Given only baseline data", () => {
    describe("Example one", () => {
      beforeEach(() => {
        let schema = { title: "Variance One" };
        let formData = { baseline: "2019-01-01" };
        field = shallow(
          <VarianceField
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
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
        let percentComplete = field
          .find("[data-test='variance-percentage']")
          .props().value;
        expect(percentComplete).toEqual(0);
      });

      it("Does not show the updated value field", () => {
        let updatedValue = field.find("[data-test='variance-current']");
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
          let updatedValue = field.find("[data-test='variance-current']");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          expect(reason.length).toEqual(1);
        });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        let schema = { title: "Meow Meow Fuzzyface" };
        let formData = { baseline: "2020-12-31" };
        field = shallow(
          <VarianceField
            schema={schema}
            formData={formData}
            onChange={jest.fn()}
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
        let percentComplete = field
          .find("[data-test='variance-percentage']")
          .props().value;
        expect(percentComplete).toEqual(0);
      });

      it("Does not show the updated value field", () => {
        let updatedValue = field.find("[data-test='variance-current']");
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
          let updatedValue = field.find("[data-test='variance-current']");
          expect(updatedValue.length).toEqual(1);
        });

        it("Shows the reason for variance field", () => {
          let reason = field.find("[data-test='variance-reason']");
          expect(reason.length).toEqual(1);
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
          let field = shallow(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
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
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 10,
            current: "2022-12-31",
            reason: "There were delays"
          };
          field = shallow(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
            />
          );
        });

        it("Renders the status as delayed", () => {
          let status = field.find("[data-test='variance-status']").props()
            .value;
          expect(status).toEqual("Delayed");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='variance-current']")
            .props().value;
          expect(updatedValue).toEqual("2022-12-31");
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
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 10,
            current: "2050-01-01",
            reason: "Super delays"
          };
          field = shallow(
            <VarianceField
              schema={schema}
              formData={formData}
              onChange={jest.fn()}
            />
          );
        });

        it("Renders the status as delayed", () => {
          let status = field.find("[data-test='variance-status']").props()
            .value;
          expect(status).toEqual("Delayed");
        });

        it("Fills in the updated value", () => {
          let updatedValue = field
            .find("[data-test='variance-current']")
            .props().value;
          expect(updatedValue).toEqual("2050-01-01");
        });

        it("Fills in the reason for variance", () => {
          let reason = field.find("[data-test='variance-reason']").props()
            .value;
          expect(reason).toEqual("Super delays");
        });
      });
    });
  });

  describe("When updating fields", () => {
    let onChangeSpy;
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
      field = shallow(
        <VarianceField
          schema={schema}
          formData={formData}
          onChange={onChangeSpy}
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
          reason: "Super delays"
        });
      });
    });

    describe("When changing the percent complete", () => {
      describe("Example one", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-percentage']")
            .simulate("change", { target: { value: 15 } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 15,
            current: "2050-01-01",
            reason: "Super delays"
          });
        });
      });

      describe("Example two", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-percentage']")
            .simulate("change", { target: { value: 90 } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 90,
            current: "2050-01-01",
            reason: "Super delays"
          });
        });
      });
    });

    describe("When changing the current value", () => {
      describe("Example one", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-current']")
            .simulate("change", { target: { value: "2040-01-01" } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 10,
            current: "2040-01-01",
            reason: "Super delays"
          });
        });
      });

      describe("Example two", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-current']")
            .simulate("change", { target: { value: "2020-05-01" } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 10,
            current: "2020-05-01",
            reason: "Super delays"
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
            reason: "Mega delays"
          });
        });
      });

      describe("Example two", () => {
        it("Calls the onChange prop with the updated form data", () => {
          field
            .find("[data-test='variance-reason']")
            .simulate("change", { target: { value: "Just the worst delays" } });

          expect(onChangeSpy).toHaveBeenCalledWith({
            baseline: "2020-12-31",
            status: "Delayed",
            percentComplete: 10,
            current: "2050-01-01",
            reason: "Just the worst delays"
          });
        });
      });
    });
  });
});
