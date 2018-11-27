import React from "react";
import {mount} from "enzyme";
import NumberedArrayField from ".";

describe("Numbered Array Field Financials", () => {
  it("Doesn't render the submit button", async () => {
    let wrapper = mount(<NumberedArrayField
        formData={ [{otherData: "Hello"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}} } } }
      />);
    await wrapper.update();
    expect(wrapper.find("button[type='submit']").length).toEqual(0);
  });

  describe("renders all data", () => {
    it("Example 1", async () => {
      let wrapper = mount(<NumberedArrayField
          formData={ [{someData: "Hello"}] }
          schema={ {items: {type: "object", properties: {someData: {type: "string"}}}} }
        />
      );
      await wrapper.update();
      expect(wrapper.find("Form").length).toEqual(1);
      expect(wrapper.find("input#root_someData").length).toEqual(1)
      expect(wrapper.find("input#root_someData").props().value).toEqual("Hello")
    });

    it("Example 2", async () => {
      let wrapper = mount(<NumberedArrayField
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {items: {type: "object", properties: {otherData: {type: "string"}, moreData: {type: "string"}}} } }
        />
      );
      await wrapper.update();
      expect(wrapper.find("Form").length).toEqual(2);
      expect(wrapper.find("input#root_otherData").length).toEqual(2);
      expect(wrapper.find("input#root_moreData").length).toEqual(2);
      expect(wrapper.find("input#root_otherData").at(0).props().value).toEqual("Hello");
      expect(wrapper.find("input#root_otherData").at(1).props().value).toEqual("There");
    });
  });

  it("Adds items", async () => {
    let wrapper = mount(<NumberedArrayField
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
    wrapper.find('[data-test="add-button"]').simulate('click');
    expect(wrapper.find("input#root_otherData").length).toEqual(3);
  });

  it("Removes items", async () => {
    let wrapper = mount(<NumberedArrayField
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
  });
});
