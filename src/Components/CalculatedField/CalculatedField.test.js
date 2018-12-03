import React from "react";
import {mount} from "enzyme";
import CalculatedField from ".";
import FieldFake from "../../../test/FieldFake";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Calculated Field", () => {
  describe("Renders the data", async () => {
    it("Example 1", async () => {
      let wrapper = mount(<CalculatedField
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
      let wrapper = mount(<CalculatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {information: "Some information", otherInformation: "More information"} }
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {information: {type: "string"}, otherInformation: {type: "string"}}} }
      />);

      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(1);
      expect(wrapper.find("input#root_information").length).toEqual(1);
      expect(wrapper.find("input#root_information").props().value).toEqual("Some information");
      expect(wrapper.find("input#root_otherInformation").length).toEqual(1);
      expect(wrapper.find("input#root_otherInformation").props().value).toEqual("More information");
    });
  });

  describe("Can be modified", () => {
    it("Example 1", async () => {
      let wrapper = mount(<CalculatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {someData: "Hello"} }
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {someData: {type: "string"}}} }
      />);

      await wrapper.update();
      wrapper.find("input#root_someData").simulate("change", {target: {value: "Changed"}})
      await wrapper.update();
      expect(wrapper.find("input#root_someData").props().value).toEqual("Changed");
    });

    it("Example 2", async () => {
      let wrapper = mount(<CalculatedField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ {otherData: "Hello"} }
        onChange = {() => {}}
        schema={ {type: "object", calculation: "", properties: {otherData: {type: "string"}}} }
      />);

      await wrapper.update();
      wrapper.find("input#root_otherData").simulate("change", {target: {value: "Another value"}});
      await wrapper.update();
      expect(wrapper.find("input#root_otherData").props().value).toEqual("Another value");
    });
  });

  describe("Executes calculation", () => {
    describe("on creation", () => {
      it("Example 1", async () => {
        let wrapper = mount(<CalculatedField
          registry={ {fields: {SchemaField: FieldFake}} }
          formData={ {someData: "data to calculate"} }
          onChange = {() => {}}
          schema={ {
            type: "object",
            calculation: "formData.fieldToCalculate = 13;",
            properties:
            {
              someData: {type: "string"},
              fieldToCalculate: {type: "string"}
            }
          } }
        />);

        await wrapper.update();
        expect(wrapper.find("input#root_fieldToCalculate").props().value).toEqual(13);
      });

      it("Example 2", async () => {
        let wrapper = mount(<CalculatedField
          registry={ {fields: {SchemaField: FieldFake}} }
          formData={ {result: "some other data"} }
          onChange = {() => {}}
          schema={ {
            type: "object",
            calculation: "formData.result = 14;",
            properties:
            {
              moreData: {type: "string"},
              result: {type: "string"}
            }
          } }
        />);

        await wrapper.update();
        expect(wrapper.find("input#root_result").props().value).toEqual(14);
      });
    });
  });

  describe("on change", () => {
    it("Example 1", async () => {
      let wrapper = mount(<CalculatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {someData: "data to calculate"} }
        onChange = {() => {}}
        schema={
          {
            type: "object",
            calculation: "formData.fieldToCalculate = formData.someData;",
            properties:
            {
              someData: {type: "string"},
              fieldToCalculate: {type: "string"}
            }
          }
        }
      />);

      await wrapper.update();
      wrapper.find("input#root_someData").simulate("change", {target: {value: "New value"}});
      await wrapper.update();
      expect(wrapper.find("input#root_fieldToCalculate").props().value).toEqual("New value");
    });

    it("Example 2", async () => {
      let wrapper = mount(<CalculatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {moreData: "data to calculate"} }
        onChange = {() => {}}
        schema={ {
          type: "object",
          calculation: "formData.result = formData.moreData;",
          properties:
          {
            moreData: {type: "string"},
            result: {type: "string"}
          }
        } }
      />);

      await wrapper.update();
      wrapper.find("input#root_moreData").simulate("change", {target: {value: "Another value"}});
      await wrapper.update();
      expect(wrapper.find("input#root_result").props().value).toEqual("Another value");
    });
  });

  describe("Calls onChange", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<CalculatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {someData: "data to calculate"} }
        onChange={onChangeSpy}
        schema={
          {
            type: "object",
            calculation: "formData.fieldToCalculate = formData.someData;",
            properties:
            {
              someData: {type: "string"},
              fieldToCalculate: {type: "string"}
            }
          }
        }
      />);

      await wrapper.update();
      wrapper.find("input#root_someData").simulate("change", {target: {value: "New value"}});
      await wrapper.update();
      expect(onChangeSpy).toHaveBeenCalledWith({someData: "New value", fieldToCalculate: "New value"});
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();
      let wrapper = mount(<CalculatedField
        registry={ {fields: {SchemaField: FieldFake}} }
        formData={ {moreData: "data"} }
        onChange={onChangeSpy}
        schema={ {
          type: "object",
          calculation: "formData.result = formData.moreData;",
          properties:
          {
            moreData: {type: "string"},
            result: {type: "string"}
          }
        } }
      />);

      await wrapper.update();
      wrapper.find("input#root_moreData").simulate("change", {target: {value: "Another value"}});
      await wrapper.update();
      expect(onChangeSpy).toHaveBeenCalledWith({moreData: "Another value", result: "Another value"});
    });
  })
});
