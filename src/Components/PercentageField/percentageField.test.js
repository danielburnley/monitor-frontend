import PercentageField from ".";
import React from "react";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("PercentageField", () => {
  it("Renders a percentage symbol",  async () => {
    let field = mount(<PercentageField value="0" />)
    expect(field.text()).toMatch(/%/);
  });

  describe("Takes value", () => {
    it("Example 1", () => {
      let field = mount(<PercentageField value="67" />);
      expect(field.find("input").props().value).toEqual("67");
    });

    it("Example 2", () => {
      let field = mount(<PercentageField value="42" />);
      expect(field.find("input").props().value).toEqual("42");
    });
  });

  describe("Clamps input to 100", () => {
    it("Example 1",  async () => {
      let field = mount(<PercentageField value="0" />);
      await updateFormField(field.find("input"), 25565);
      await field.update();

      expect(field.find("input").props().value).toEqual("100");
    });

    it("Example 2",  async () => {
      let field = mount(<PercentageField value="0" />);
      await updateFormField(field.find("input"), 118999);

      expect(field.find("input").props().value).toEqual("100");
    });
  });

  describe("Clamps input to 0", () => {
    it("Example 1",  async () => {
      let field = mount(<PercentageField value="0" />);
      let input = field.find("input");
      await updateFormField(field.find("input"), -7);

      expect(field.find("input").props().value).toEqual("0");
    });

    it("Example 2",  async () => {
      let field = mount(<PercentageField value="0" />)
      let input = field.find("input")
      await updateFormField(field.find("input"), -63);

      expect(field.find("input").props().value).toEqual("0");
    });
  });

  describe("Input that does not need to be clamped is left alone", () => {
    it("Example 1",  async () => {
      let field = mount(<PercentageField value="0" />)
      let input = field.find("input")
      await updateFormField(field.find("input"), 32);

      expect(field.find("input").props().value).toEqual("32");
    });

    it("Example 2",  async () => {
      let field = mount(<PercentageField value="0" />)
      let input = field.find("input")
      await updateFormField(field.find("input"), 64);

      expect(field.find("input").props().value).toEqual("64");
    });
  });
});
