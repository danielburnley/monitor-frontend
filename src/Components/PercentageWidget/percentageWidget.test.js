import PercentageWidget from ".";
import React from "react";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("PercentageWidget", () => {
  it("Renders a percentage symbol",  async () => {
    let onChangeSpy = jest.fn();
    let field = mount(<PercentageWidget value="0" onChange={onChangeSpy}/>)
    expect(field.text()).toMatch(/%/);
  });

  describe("Takes value", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="67" onChange={onChangeSpy}/>);
      expect(field.find("input").props().value).toEqual("67");
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="42" onChange={onChangeSpy}/>);
      expect(field.find("input").props().value).toEqual("42");
    });
  });

  describe("Calls onChange", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "14159");
      await field.update();

      expect(onChangeSpy).toHaveBeenCalledWith("14159");
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "25565");
      await field.update();

      expect(onChangeSpy).toHaveBeenCalledWith("25565");
    });
  });

  describe("Clamps input to 100", () => {
    it("Example 1",  async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "25565");
      await field.update();

      expect(field.find("input").props().value).toEqual("100");
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "118999");

      expect(field.find("input").props().value).toEqual("100");
    });
  });

  describe("Cleans non-numeric characters", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "2,7");
      await field.update();

      expect(field.find("input").props().value).toEqual("27");
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "0x40");

      expect(field.find("input").props().value).toEqual("40");
    });
  });

  describe("Removes leading 0s", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "0000000");
      await field.update();

      expect(field.find("input").props().value).toEqual("0");
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      await updateFormField(field.find("input"), "040");

      expect(field.find("input").props().value).toEqual("40");
    });
  });

  describe("Clamps input to 0", () => {
    it("Example 1",  async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />);
      let input = field.find("input");
      await updateFormField(field.find("input"), "-7");

      expect(field.find("input").props().value).toEqual("0");
    });

    it("Example 2",  async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />)
      let input = field.find("input")
      await updateFormField(field.find("input"), "-63");

      expect(field.find("input").props().value).toEqual("0");
    });
  });

  describe("Input that does not need to be clamped is left alone", () => {
    it("Example 1",  async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />)
      let input = field.find("input")
      await updateFormField(field.find("input"), "32");

      expect(field.find("input").props().value).toEqual("32");
    });

    it("Example 2",  async () => {
      let onChangeSpy = jest.fn();
      let field = mount(<PercentageWidget value="0" onChange={onChangeSpy} />)
      let input = field.find("input")
      await updateFormField(field.find("input"), "64");

      expect(field.find("input").props().value).toEqual("64");
    });
  });

  describe("Marks fields as readonly", () => {
    let schema, uiSchema, field;
    let onChangeSpy = jest.fn();
    beforeEach(() => {
      schema = {
        title: "Rabbits",
        type: "sting",
        readonly: true
      };

      uiSchema = { "ui:disabled": true };

      field = mount(<PercentageWidget value={"0"} onChange={onChangeSpy} schema={schema} uiSchema={uiSchema} />);
    });

    it("disable the input box", () => {
      expect(field.find("[disabled=true]").length).toEqual(1);
    });
  });
});
