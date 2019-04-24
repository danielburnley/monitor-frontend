import React from "react";
import EnumCheckboxWidget from ".";
import { mount } from "enzyme";

describe("<EnumCheckboxWidget>", () => {
  describe("Based on the enum and value given", () => {
    describe("Displays correctly", () => {
      describe("Checked option", () => {
        it("Example 1", () => {
          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Yes", "No"]
              }}
              value={"Yes"}
              onChange={() => {}}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().checked).toEqual(true);
        });

        it("Example 2", () => {
          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Oui", "Non"]
              }}
              value={"Oui"}
              onChange={() => {}}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().checked).toEqual(true);
        });
      });

      describe("Unchecked option", () => {
        it("Example 1", () => {
          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Yes", "No"]
              }}
              value={"No"}
              onChange={() => {}}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().checked).toEqual(false);
        });

        it("Example 2", () => {
          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Oui", "Non"]
              }}
              value={"Non"}
              onChange={() => {}}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().checked).toEqual(false);
        });
      });

      describe("With the disabled prop", () => {
        it("Disables checkbox if disabled flag is set", () => {
          let onChangeSpy = jest.fn();

          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Oui", "Non"]
              }}
              value={"Non"}
              onChange={onChangeSpy}
              disabled={true}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().disabled).toEqual(true);
        });

        it("Doesn't disable the checkbox if disabled flag is not set", () => {
          let onChangeSpy = jest.fn();

          let wrap = mount(
            <EnumCheckboxWidget
              schema={{
                enum: ["Yes", "No"]
              }}
              value={"No"}
              onChange={onChangeSpy}
              disabled={false}
            />
          );

          expect(wrap.find("[data-test='checkbox']").props().disabled).toEqual(false);
        });
      });
    });
  });

  describe("When attempting to change the value", () => {
    it("Example 1", () => {
      let onChangeSpy = jest.fn();

      let wrap = mount(
        <EnumCheckboxWidget
          schema={{
            enum: ["Yes", "No"]
          }}
          value={"Yes"}
          onChange={onChangeSpy}
        />
      );

      wrap.find("[data-test='checkbox']").simulate("change");

      expect(onChangeSpy).toHaveBeenCalledWith("No");
    });

    it("Example 2", () => {
      let onChangeSpy = jest.fn();

      let wrap = mount(
        <EnumCheckboxWidget
          schema={{
            enum: ["Oui", "Non"]
          }}
          value={"Non"}
          onChange={onChangeSpy}
        />
      );

      wrap.find("[data-test='checkbox']").simulate("change");

      expect(onChangeSpy).toHaveBeenCalledWith("Oui");
    });
  });
});
