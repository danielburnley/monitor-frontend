import React from "react";
import {mount} from "enzyme";
import NumberedArrayField from ".";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

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
        addable={true}
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
    wrapper.find('[data-test="add-button"]').simulate('click');
    expect(wrapper.find("input#root_otherData").length).toEqual(3);
  });

  describe("Removes items", async () => {
    it("Example 1", async () => {
      let wrapper = mount(<NumberedArrayField
          addable={true}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
        />
      );
      await wrapper.update();
      expect(wrapper.find('[data-test="remove-button"]').length).toEqual(2);
      wrapper.find('[data-test="remove-button"]').at(1).simulate('click');
      expect(wrapper.find("input#root_otherData").length).toEqual(1);
      expect(wrapper.find("input#root_otherData").props().value).toEqual("Hello")
    });

    it("Example 2", async () => {
      let wrapper = mount(<NumberedArrayField
          addable={true}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
        />
      );
      await wrapper.update();
      expect(wrapper.find('[data-test="remove-button"]').length).toEqual(2);
      wrapper.find('[data-test="remove-button"]').at(0).simulate('click');
      expect(wrapper.find("input#root_otherData").length).toEqual(1);
      expect(wrapper.find("input#root_otherData").props().value).toEqual("There")
    });
  });

  it("Displays no buttons if not addable", async () => {
    let wrapper = mount(<NumberedArrayField
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
        addable={false}
      />
    );
    await wrapper.update();
    expect(wrapper.find('[data-test="add-button"]').length).toEqual(0);
    expect(wrapper.find('[data-test="remove-button"]').length).toEqual(0);
  });

  describe("It calls onChange", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();

      let wrapper = mount(<NumberedArrayField
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {items: {type: "object", properties: {otherData: {type: "string"}}} }}
          addable={false}
          onChange={onChangeSpy}
        />
      );
      await wrapper.update();
      wrapper.find("input#root_otherData").at(0).simulate('change', {target: {value: "New text"}});
      await wait();

      expect(onChangeSpy).toHaveBeenCalledWith([{otherData: "New text"},{otherData: "There"}]);
    });

    it("Example 2", async () => {
      let onChangeSpy = jest.fn();

      let wrapper = mount(<NumberedArrayField
          formData={ [{someData: "General"}, {someData: "Specific"}] }
          schema={ {items: {type: "object", properties: {someData: {type: "string"}}} }}
          addable={false}
          onChange={onChangeSpy}
        />
      );
      await wrapper.update();
      wrapper.find("input#root_someData").at(1).simulate('change', {target: {value: "Generalised"}});
      await wait();
      
      expect(onChangeSpy).toHaveBeenCalledWith([{someData: "General"},{someData: "Generalised"}]);
    });
  });
});
