import React from "react";
import CurrencyWidget from ".";
import { shallow } from "enzyme";

describe("CurrencyWidget", () => {
  describe("Formatting of data entry", () => {
    describe("Example 1", () => {
      let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
      beforeEach(() => {
        schema = {
          title: "Cats",
          type: "string",
          currency: true,
          maximum: "8388608999999999"
        };

        onChangeSpy = jest.fn();
        value = "8000000";
        currencySymbol = "btc";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            onChange={onChangeSpy}
            currency={currencySymbol}
          />
        );
      });

      it("Changes the value and inserts commas", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "19216401" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "19,216,401"
        );
      });

      it("Cleans invalid characters", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "*19$216,401" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "19,216,401"
        );
      });

      it("Inserts commas for preset value", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "8,000,000"
        );
      });
    });

    describe("Example 2", () => {
      let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
      beforeEach(() => {
        schema = {
          title: "Cats",
          type: "string",
          currency: true,
          maximum: "3573599357999999"
        };

        onChangeSpy = jest.fn();
        value = "322222222";
        currencySymbol = "sat";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            onChange={onChangeSpy}
            currency={currencySymbol}
          />
        );
      });

      it("Cleans invalid characters", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "25WU255U255L255U" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "25,255,255,255"
        );
      });

      it("Changes the value and inserts commas", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "14159265358" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "14,159,265,358"
        );
      });

      it("Inserts commas for preset value", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "322,222,222"
        );
      });
    });
  });

  describe("Value clamping on initialization", () => {
    describe("Example 1", () => {
      let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
      beforeEach(() => {
        schema = {
          title: "Cats",
          type: "string",
          currency: true,
          maximum: "32"
        };

        onChangeSpy = jest.fn();
        value = "64";
        currencySymbol = "xmr";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            onChange={onChangeSpy}
            currency={currencySymbol}
          />
        );
      });

      it("clamps the value on initialization", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "32"
        );
      });
    });

    describe("Example 2", () => {
      let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
      beforeEach(() => {
        schema = {
          title: "Cats",
          type: "string",
          currency: true,
          maximum: "25565"
        };

        onChangeSpy = jest.fn();
        value = "141592";
        currencySymbol = "xmr";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            onChange={onChangeSpy}
            currency={currencySymbol}
          />
        );
      });

      it("clamps the value on initialization", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "25,565"
        );
      });
    });
  });

  describe("Without a schema", () => {
    let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
    beforeEach(() => {
      schema = {
        title: "Cats",
        type: "string",
        currency: true,
        maximum: "128"
      };

      onChangeSpy = jest.fn();
      value = "56";
      currencySymbol = "btc";

      field = shallow(
        <CurrencyWidget
          value={value}
          onChange={onChangeSpy}
          currency={currencySymbol}
        />
      );
    });

    it("Renders an input field", () => {
      expect(field.find("[data-test='currency-input']").length).toEqual(1);
    });

    it("Prepopulates the input field with form data", () => {
      expect(field.find("[data-test='currency-input']").props().value).toEqual(
        "56"
      );
    });
  });

  describe("Data entry with small numbers", () => {
    describe("Example 1", () => {
      let schema, value, uiSchema, field, currencySymbol, onChangeSpy;
      beforeEach(() => {
        schema = {
          title: "Cats",
          type: "string",
          currency: true,
          maximum: "128"
        };

        onChangeSpy = jest.fn();
        value = "56";
        currencySymbol = "th";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            onChange={onChangeSpy}
            currency={currencySymbol}
          />
        );
      });

      it("Renders an input field", () => {
        expect(field.find("[data-test='currency-input']").length).toEqual(1);
      });

      it("Prepopulates the input field with form data", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "56"
        );
      });

      it("Limits the value to the maximum", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "129" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "128"
        );
      });

      it("Renders a currency symbol", () => {
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
          maximum: "64",
          currency: true
        };

        onChangeSpy = jest.fn();
        value = "12.45";
        currencySymbol = "yen";

        field = shallow(
          <CurrencyWidget
            value={value}
            schema={schema}
            currency={currencySymbol}
            onChange={onChangeSpy}
          />
        );
      });

      it("Renders an input field", () => {
        expect(field.find("[data-test='currency-input']").length).toEqual(1);
      });

      it("Prepopulates the input field with form data", () => {
        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "12.45"
        );
      });

      it("Limits the value to the maximum", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "255" } });

        expect(field.find("[data-test='currency-input']").props().value).toEqual(
          "64"
        );
      });

      it("Renders a currency sumbol", () => {
        expect(field.find("[data-test='currency-symbol']").length).toEqual(1);
        expect(field.find("[data-test='currency-symbol']").text()).toEqual("yen");
      });

      it("Defaults to GBP if no currency given", () => {
        let GBPField = shallow(<CurrencyWidget schema={{}} value={{}} />);
        expect(GBPField.find("[data-test='currency-symbol']").text()).toEqual(
          "£"
        );
      });

      it("Calls on the OnChange method with the new data", () => {
        field
          .find("[data-test='currency-input']")
          .simulate("change", { target: { value: "5.890" } });
        expect(onChangeSpy).toHaveBeenCalledWith( "5.890");
      });
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

      field = shallow(<CurrencyWidget schema={schema} uiSchema={uiSchema} />);
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

      field = shallow(<CurrencyWidget schema={schema} uiSchema={uiSchema} />);
    });

    it("disable the input box", () => {
      expect(field.find("[hidden=true]").length).toEqual(1);
    });
  });
});
