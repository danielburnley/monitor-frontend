import HorizontalFields from ".";
import React from "react";
import { mount } from "enzyme";

describe("<HorizontalFields>", () => {
  let schema, fields, formData, onChangeSpy;

  describe("Given a single field", () => {
    describe("Example one", () => {
      beforeEach(() => {
        schema = {
          title: "Cats",
          properties: { meow: { type: "text", title: "Meow" } }
        };
        formData = { meow: "Cat noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays the title", () => {
        expect(fields.find("[data-test='form-title']").text()).toEqual("Cats");
      });

      it("Displays a single field", () => {
        expect(fields.find("[data-test='form-field']").length).toEqual(1);
      });

      it("Displays the correct label", () => {
        expect(fields.find("[data-test='meow-label']").text()).toEqual("Meow");
      });

      it("Displays an input field", () => {
        expect(fields.find("input[data-test='meow-input']").length).toEqual(1);
      });

      it("Sets the value of the input field to the provided form data", () => {
        expect(
          fields.find("input[data-test='meow-input']").props().value
        ).toEqual("Cat noise");
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("input[data-test='meow-input']")
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
        formData = { woof: "Dog Noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );
      });

      it("Displays the title", () => {
        expect(fields.find("[data-test='form-title']").text()).toEqual("Dogs");
      });

      it("Displays a single field", () => {
        expect(fields.find("[data-test='form-field']").length).toEqual(1);
      });

      it("Displays the correct label", () => {
        expect(fields.find("[data-test='woof-label']").text()).toEqual("Woof");
      });

      it("Displays an input field", () => {
        expect(fields.find("input[data-test='woof-input']").length).toEqual(1);
      });

      it("Sets the value of the input field to the provided form data", () => {
        expect(
          fields.find("input[data-test='woof-input']").props().value
        ).toEqual("Dog Noise");
      });

      it("Calls the onChange method passed in with the form data", () => {
        fields
          .find("input[data-test='woof-input']")
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
      formData = { quack: "Duck noise", moo: "Cow noise" };
      onChangeSpy = jest.fn();
      fields = mount(
        <HorizontalFields
          schema={schema}
          formData={formData}
          onChange={onChangeSpy}
        />
      );
    });

    it("Displays both fields", () => {
      expect(fields.find("[data-test='form-field']").length).toEqual(2);
    });

    it("Displays the correct labels", () => {
      expect(fields.find("[data-test='quack-label']").text()).toEqual("Quack");
      expect(fields.find("[data-test='moo-label']").text()).toEqual("Moo");
    });

    it("Displays an input field", () => {
      expect(fields.find("input[data-test='quack-input']").length).toEqual(1);
      expect(fields.find("input[data-test='moo-input']").length).toEqual(1);
    });

    it("Sets the value of the input field to the provided form data", () => {
      expect(
        fields.find("input[data-test='quack-input']").props().value
      ).toEqual("Duck noise");
      expect(fields.find("input[data-test='moo-input']").props().value).toEqual(
        "Cow noise"
      );
    });

    it("Calls the onChange method passed in with the form data", () => {
      fields
        .find("input[data-test='quack-input']")
        .simulate("change", { target: { value: "New Quack" } });

      expect(onChangeSpy).toHaveBeenLastCalledWith({
        quack: "New Quack",
        moo: "Cow noise"
      });

      fields
        .find("input[data-test='moo-input']")
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
      formData = { meow: "Cat noise" };
      onChangeSpy = jest.fn();
      fields = mount(
        <HorizontalFields
          schema={schema}
          formData={formData}
          onChange={onChangeSpy}
        />
      );
    });

    it("Does not render the hidden field label", () => {
      expect(fields.find("[data-test='meow-label']").length).toEqual(1);
      expect(fields.find("[data-test='woof-label']").length).toEqual(0);
    });

    it("Does not render the hidden field input", () => {
      expect(fields.find("[data-test='meow-input']").length).toEqual(1);
      expect(fields.find("[data-test='woof-input']").length).toEqual(0);
    });
  });

  describe("Given required fields", () => {
    describe("Example one", () => {
      it("Marks the field as required", () => {
        schema = {
          title: "Cats",
          properties: {
            meow: { type: "text", title: "Meow" },
            woof: { type: "text", title: "Woof" }
          },
          required: ['meow']
        };
        formData = { meow: "Cat noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );

        expect(fields.find("[data-test='meow-label']").text()).toEqual("Meow *")
      });
    });
    
    describe("Example two", () => {
      it("Marks the field as required", () => {
        schema = {
          title: "Cats",
          properties: {
            cow: { type: "text", title: "Cow" },
            chicken: { type: "text", title: "Chicken" }
          },
          required: ['chicken']
        };
        formData = { meow: "Cat noise" };
        onChangeSpy = jest.fn();
        fields = mount(
          <HorizontalFields
            schema={schema}
            formData={formData}
            onChange={onChangeSpy}
          />
        );

        expect(fields.find("[data-test='chicken-label']").text()).toEqual("Chicken *")
      });
    });
  });
});
