import HorizontalFields from ".";
import React from "react";
import FieldFake from "../../../test/FieldFake";
import { mount } from "enzyme";

describe("<HorizontalFields>", () => {
  let schema, fields, formData, onChangeSpy, registrySpy, uiSchema;

  describe("Given empty data", () => {
    beforeEach(() => {
      schema = {properties: {input: { type: "string" }}};
      uiSchema = undefined;
      formData = undefined;
      onChangeSpy = jest.fn();
      fields = mount(
        <HorizontalFields
          registry={registrySpy}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          registry={{
            fields: { SchemaField: FieldFake, extraField: FieldFake }
          }}
          onChange={onChangeSpy}
        />
      );
    });

    it("Can call onchange", () => {
      fields
        .find("input")
        .simulate("change", { target: { value: "New Meow" } });

      expect(onChangeSpy).toHaveBeenCalledWith({ input: "New Meow" });
    });
  });

  describe("Given a SchemaField", () => {
    describe("Example 1", () => {
      beforeEach(() => {
        registrySpy = {
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        };
        schema = {
          title: "Cats",
          properties: {
            nyan: { currency: true, type: "text", title: "Nyan" }
          }
        };
        uiSchema = {
          nyan: { testing: "1234" }
        };
        formData = { nyan: "Other cat noises" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            registry={registrySpy}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            registry={{
              fields: { SchemaField: FieldFake, extraField: FieldFake }
            }}
            onChange={onChangeSpy}
          />
        );
      });

      it("Renders a schema field for each data point", () => {
        expect(fields.find("FieldFake").length).toEqual(1);
      });

      it("passes the registry to schema field", () => {
        expect(
          fields
            .find("FieldFake")
            .at(0)
            .props()
            .registry
        ).toEqual({
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        });
      });

      it("passes the uischema", () => {
        expect(
          fields
            .find("FieldFake")
            .at(0)
            .props()
            .uiSchema
        ).toEqual({ testing: "1234" });
      });

      it("Renders the data as the value", () => {
        expect(fields.find("#root_nyan-input").length).toEqual(1);
        expect(fields.find("#root_nyan-input").props().value).toEqual(
          "Other cat noises"
        );
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("#root_nyan-input")
          .simulate("change", { target: { value: "New Meow" } });

        expect(onChangeSpy).toHaveBeenCalledWith({ nyan: "New Meow" });
      });
    });

    describe("Example 2", () => {
      beforeEach(() => {
        registrySpy = {
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        };
        schema = {
          title: "Cats",
          properties: {
            meow: { currency: true, type: "text", title: "Many meows" }
          }
        };
        uiSchema = {
          meow: { testing: "1234" }
        };
        formData = { meow: "Additional cat noises" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            registry={registrySpy}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            registry={{
              fields: { SchemaField: FieldFake, extraField: FieldFake }
            }}
            onChange={onChangeSpy}
          />
        );
      });

      it("Renders a schema field for each data point", () => {
        expect(fields.find("FieldFake").length).toEqual(1);
      });

      it("passes the registry to schema field", () => {
        expect(
          fields
            .find("FieldFake")
            .at(0)
            .props()
            .registry
        ).toEqual({
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        });
      });

      it("passes the uischema", () => {
        expect(
          fields
            .find("FieldFake")
            .at(0)
            .props()
            .uiSchema
        ).toEqual({ testing: "1234" });
      });

      it("Renders the data as the value", () => {
        expect(fields.find("#root_meow-input").length).toEqual(1);
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("#root_meow-input")
          .simulate("change", { target: { value: "Another Meow" } });

        expect(onChangeSpy).toHaveBeenCalledWith({ meow: "Another Meow" });
      });
    });
  });

  describe("Given a single field", () => {
    describe("Example one", () => {
      beforeEach(() => {
        schema = {
          title: "Cats",
          properties: { meow: { type: "text", title: "Meow" } }
        };
        registrySpy = {
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        };
        uiSchema = {
          meow: { testing: "1234" }
        };
        formData = { meow: "Cat noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            registry={registrySpy}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays a single field", () => {
        expect(fields.find("#root_meow-input").length).toEqual(1);
      });

      it("Sets the value of the input field to the provided form data", () => {
        expect(fields.find("#root_meow-input").props().value).toEqual(
          "Cat noise"
        );
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("#root_meow-input")
          .simulate("change", { target: { value: "New Meow" } });

        expect(onChangeSpy).toHaveBeenCalledWith({ meow: "New Meow" });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        schema = {
          title: "Dogs",
          properties: { woof: { type: "text", title: "Woof" } }
        };
        registrySpy = {
          fields: { SchemaField: FieldFake, extraField: FieldFake }
        };
        uiSchema = {
          woof: { testing: "1234" }
        };
        formData = { woof: "Dog Noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            registry={registrySpy}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays a single field", () => {
        expect(fields.find("#root_woof-input").length).toEqual(1);
      });

      it("Displays an input field", () => {
        expect(fields.find("#root_woof-input").length).toEqual(1);
      });

      it("Sets the value of the input field to the provided form data", () => {
        expect(fields.find("#root_woof-input").props().value).toEqual(
          "Dog Noise"
        );
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("#root_woof-input")
          .simulate("change", { target: { value: "Bark" } });

        expect(onChangeSpy).toHaveBeenCalledWith({ woof: "Bark" });
      });
    });
  });

  describe("Given multiple fields", () => {
    beforeEach(() => {
      schema = {
        properties: {
          quack: { type: "text", title: "Quack" },
          moo: { type: "text", title: "Moo" }
        }
      };
      registrySpy = {
        fields: { SchemaField: FieldFake, extraField: FieldFake }
      };
      uiSchema = {
        quack: { testing: "1234" },
        moo: { tester: "5678" }
      };
      formData = { quack: "Duck noise", moo: "Cow noise" };
      onChangeSpy = jest.fn();
      fields = mount(
        <HorizontalFields
          registry={registrySpy}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={onChangeSpy}
        />
      );
    });

    it("Displays both fields", () => {
      expect(fields.find("[data-test='form-field']").length).toEqual(2);
    });

    it("Displays an input field", () => {
      expect(fields.find("#root_quack-input").length).toEqual(1);
      expect(fields.find("#root_moo-input").length).toEqual(1);
    });

    it("Sets the value of the input field to the provided form data", () => {
      expect(fields.find("#root_quack-input").props().value).toEqual(
        "Duck noise"
      );
      expect(fields.find("#root_moo-input").props().value).toEqual("Cow noise");
    });

    it("Calls the onChange method passed in with the form data", async () => {
      fields
        .find("#root_quack-input")
        .simulate("change", { target: { value: "New Quack" } });

      expect(onChangeSpy).toHaveBeenLastCalledWith({
        quack: "New Quack",
        moo: "Cow noise"
      });

      await fields.setProps({
          formData: {
          quack: "New Quack",
          moo: "New Moo"
        }
      });

      fields
        .find("#root_moo-input")
        .simulate("change", { target: { value: "New Moo" } });

      expect(onChangeSpy).toHaveBeenLastCalledWith({
        quack: "New Quack",
        moo: "New Moo"
      });
    });
  });

  describe("Given a hidden field", () => {
    beforeEach(() => {
      schema = {
        title: "Cats",
        properties: {
          meow: { type: "text", title: "Meow" },
          woof: { type: "text", title: "Woof", hidden: true }
        }
      };
      registrySpy = {
        fields: { SchemaField: FieldFake, extraField: FieldFake }
      };
      uiSchema = {
        meow: { testing: "1234" },
        woof: { tester: "5678" }
      };
      formData = { meow: "Cat noise" };
      onChangeSpy = jest.fn();
      fields = mount(
        <HorizontalFields
          registry={registrySpy}
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={onChangeSpy}
        />
      );
    });

    it("Does not render the hidden field input", () => {
      expect(fields.find("#root_meow-input").length).toEqual(1);
      expect(fields.find("#root_woof-input").length).toEqual(0);
    });
  });
});
