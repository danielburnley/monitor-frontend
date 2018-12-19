import React from "react";
import {mount} from "enzyme";
import ValidatedField from ".";
import FieldFake from "../../../test/FieldFake";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Validated Field", () => {
  describe("Renders inner fields", () => {
    it("Example 1", async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {someData: "Hello"} }
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {someData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(1);
      expect(wrapper.find("input#root_someData").length).toEqual(1);
      expect(wrapper.find("input#root_someData").props().value).toEqual("Hello");
    });

    it("Example 2", async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {allData: "Cat"} }
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {allData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(1);
      expect(wrapper.find("input#root_allData").length).toEqual(1);
      expect(wrapper.find("input#root_allData").props().value).toEqual("Cat");
    });

    it("No data", async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {someData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(1);
      expect(wrapper.find("input#root_someData").length).toEqual(1);
      expect(wrapper.find("input#root_someData").props().value).toEqual("");
    });
  });

  describe("Calls onChange", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<ValidatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {someData: "data to calculate"} }
        onChange={onChangeSpy}
        schema={
          {
            type: "object",
            properties:
            {
              someData: {type: "string"}
            }
          }
        }
      />);

      await wrapper.update();
      wrapper.find("input#root_someData").simulate("change", {target: {value: "New value"}});
      await wrapper.update();
      expect(onChangeSpy).toHaveBeenCalledWith({someData: "New value"});
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<ValidatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {moreData: "data"} }
        onChange={onChangeSpy}
        schema={ {
          type: "object",
          properties:
          {
            moreData: {type: "string"}
          }
        } }
      />);

      await wrapper.update();
      wrapper.find("input#root_moreData").simulate("change", {target: {value: "Another value"}});
      await wrapper.update();
      expect(onChangeSpy).toHaveBeenCalledWith({moreData: "Another value"});
    });
  });

  describe("SchemaField receives registry", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<ValidatedField
        registry={ {fields: {SchemaField: FieldFake, extraField: FieldFake} } }
        formData={ {someData: "data to calculate"} }
        onChange={onChangeSpy}
        uiSchema={{}}
        schema={
          {
            type: "object",
            properties:
            {
              someData: {type: "string"},
              fieldToCalculate: {type: "string"}
            }
          }
        }
      />);

      await wrapper.update();
      expect(wrapper.find("FieldFake").props().registry).toEqual({fields: {SchemaField: FieldFake, extraField: FieldFake} })
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<ValidatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {someData: "data to calculate"} }
        onChange={onChangeSpy}
        uiSchema={{"ui:field": "horizontal"}}
        schema={
          {
            type: "object",
            properties:
            {
              someData: {type: "string"},
              fieldToCalculate: {type: "string"}
            }
          }
        }
      />);

      await wrapper.update();
      expect(wrapper.find("FieldFake").props().registry).toEqual({fields: {SchemaField: FieldFake}})
    });
  });

  describe("Valid", () => {
    it('Example 1', async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {allData: "Cat", _valid: true} }
        onChange = {() => {}}
        schema={ {type: "object", invalidText: "Big mistake", properties: {allData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find(".has-error").length).toEqual(0);
      expect(wrapper.find("Big mistake").length).toEqual(0);
    });

    it('Example 2', async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {allData: "Cat", _valid: true} }
        onChange = {() => {}}
        schema={ {type: "object", invalidText: "Small mistake", properties: {allData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find(".has-error").length).toEqual(0);
      expect(wrapper.find("Small mistake").length).toEqual(0);
    });
  });

  describe("Invalid", () => {
    it('Example 1', async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {allData: "Cat", _valid: false} }
        onChange = {() => {}}
        schema={ {type: "object", invalidText: "Big mistake", properties: {allData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find(".has-error").length).toEqual(1);
      expect(wrapper.find(".help-block").props().children).toEqual("Big mistake");
    });

    it('Example 2', async () => {
      let wrapper = mount(<ValidatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {allData: "Cat", _valid: false} }
        onChange = {() => {}}
        schema={ {type: "object", invalidText: "Small mistake", properties: {allData: {type: "string"}}} }
      />);
      await wrapper.update();
      expect(wrapper.find(".has-error").length).toEqual(1);
      expect(wrapper.find(".help-block").props().children).toEqual("Small mistake");
    });
  });
});
