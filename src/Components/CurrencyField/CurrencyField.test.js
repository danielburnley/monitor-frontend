import React from "react";
import CurrencyField from ".";
import { shallow } from "enzyme";

describe("CurrencyField", () => {
  describe("Example 1", () => {
    let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
    beforeEach(() => {
      schema = {
        title: "Cats",
        type: "string",
        currency: true
      };
      onChangeSpy = jest.fn();
      value = "56";
      currencySymbol = "th";

      field = shallow(
        <CurrencyField
          value={value}
          schema={schema}
          onChange={onChangeSpy}
          currency={currencySymbol}
        />
      );
    });
    it("Renders the label", () => {
      expect(field.find("[data-test='currency-label']").text()).toEqual("Cats");
      expect(field.find("[data-test='currency-label']").length).toEqual(1);
    });

    it("Renders an input field", () => {
      expect(field.find("[data-test='currency-input']").length).toEqual(1);
    });

    it("Prepopulates the input field with form data", () => {
      expect(field.find("[data-test='currency-input']").props().value).toEqual(
        "56"
      );
    });

    it("Renders a currency sumbol", () => {
      expect(field.find("[data-test='currency-symbol']").length).toEqual(1);
      expect(field.find("[data-test='currency-symbol']").text()).toEqual("th");
    });

    it("Calls on the OnChange method with the new data", () => {
      field
        .find("[data-test='currency-input']")
        .simulate("change", { target: { value: "12" } });
      expect(onChangeSpy).toHaveBeenCalledWith("12");
    });

    it("Isn't disabled if not marked as read only", () => {
      expect(field.find("[disabled=true]").length).toEqual(0);
    });

    it("Isn't hidden if not marked as hidden", () => {
      expect(field.find("[hidden=true]").length).toEqual(0);
    });
  });

  describe("Example 2", () => {
    let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
    beforeEach(() => {
      schema = {
        title: "Dogs",
        type: "string",
        currency: true
      };
      onChangeSpy = jest.fn();
      value = "12.45";
      currencySymbol = "yen";

      field = shallow(
        <CurrencyField
          value={value}
          schema={schema}
          currency={currencySymbol}
          onChange={onChangeSpy}
        />
      );
    });
    it("Renders the label", () => {
      expect(field.find("[data-test='currency-label']").text()).toEqual("Dogs");
      expect(field.find("[data-test='currency-label']").length).toEqual(1);
    });

    it("Renders an input field", () => {
      expect(field.find("[data-test='currency-input']").length).toEqual(1);
    });

    it("Prepopulates the input field with form data", () => {
      expect(field.find("[data-test='currency-input']").props().value).toEqual(
        "12.45"
      );
    });

    it("Renders a currency sumbol", () => {
      expect(field.find("[data-test='currency-symbol']").length).toEqual(1);
      expect(field.find("[data-test='currency-symbol']").text()).toEqual("yen");
    });

    it("Defaults to GBP if no currency given", () => {
      let GBPField = shallow(<CurrencyField schema={{}} value={{}} />);
      expect(GBPField.find("[data-test='currency-symbol']").text()).toEqual(
        "£"
      );
    });

    it("Calls on the OnChange method with the new data", () => {
      field
        .find("[data-test='currency-input']")
        .simulate("change", { target: { value: "5.890" } });
      expect(onChangeSpy).toHaveBeenCalledWith("5.890");
    });
  });

  describe("Readonly Fields", () => {
    let schema, uiSchema, field;
    beforeEach(() => {
      schema = {
        title: "Rabbits",
        type: "sting",
        readonly: true
      };

      uiSchema = { "ui:disabled": true };

      field = shallow(<CurrencyField schema={schema} uiSchema={uiSchema} />);
    });

    it("disable the input box", () => {
      expect(field.find("[disabled=true]").length).toEqual(1);
    });
  });

  describe("Hidden Fields", () => {
    let schema, uiSchema, field;
    beforeEach(() => {
      schema = {
        title: "Rabbits",
        type: "sting",
        hidden: true
      };

      uiSchema = { "ui:widget": "hidden" };

      field = shallow(<CurrencyField schema={schema} uiSchema={uiSchema} />);
    });

    it("disable the input box", () => {
      expect(field.find("[hidden=true]").length).toEqual(1);
    });
  });
});
