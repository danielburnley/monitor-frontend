import React from "react";
import {mount} from "enzyme";
import NumberedArrayField from ".";
import FieldFake from "../../../test/FieldFake";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Numbered Array Field", () => {
  it("Doesn't render the submit button", async () => {
    let wrapper = mount(<NumberedArrayField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ [{otherData: "Hello"}] }
        schema={ {items: {type: "object", properties: {otherData: {type: "string"}} } } }
      />);
    await wrapper.update();
    expect(wrapper.find("button[type='submit']").length).toEqual(0);
  });

  describe("renders all data", () => {
    it("Example 1", async () => {
      let wrapper = mount(<NumberedArrayField
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{someData: "Hello"}] }
          schema={ {items: {type: "object", properties: {someData: {type: "string"}}}} }
        />
      );
      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(1);
      expect(wrapper.find("input#root_someData").length).toEqual(1)
      expect(wrapper.find("input#root_someData").props().value).toEqual("Hello")
    });

    it("Example 2", async () => {
      let wrapper = mount(<NumberedArrayField
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {items: {type: "object", properties: {otherData: {type: "string"}, moreData: {type: "string"}}} } }
        />
      );
      await wrapper.update();
      expect(wrapper.find("FieldFake").length).toEqual(2);
      expect(wrapper.find("input#root_otherData").length).toEqual(2);
      expect(wrapper.find("input#root_moreData").length).toEqual(2);
      expect(wrapper.find("input#root_otherData").at(0).props().value).toEqual("Hello");
      expect(wrapper.find("input#root_otherData").at(1).props().value).toEqual("There");
    });
  });

  it("Adds items", async () => {
    let wrapper = mount(<NumberedArrayField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {addable: true, items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
    wrapper.find('[data-test="add-button"]').simulate('click');
    expect(wrapper.find("input#root_otherData").length).toEqual(3);
  });

  it("Adds items to an empty array", async () => {
    let wrapper = mount(<NumberedArrayField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={undefined}
        schema={ {addable: true, items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
    wrapper.find('[data-test="add-button"]').simulate('click');
    expect(wrapper.find("input#root_otherData").length).toEqual(1);
  });

  describe("Removes items", async () => {
    it("Example 1", async () => {
      let wrapper = mount(<NumberedArrayField
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {addable: true, items: {type: "object", properties: {otherData: {type: "string"}}} }}
        />
      );
      await wrapper.update();
      expect(wrapper.find('[data-test="remove-button-0"]').length).toEqual(1);
      expect(wrapper.find('[data-test="remove-button-1"]').length).toEqual(1);
      wrapper.find('[data-test="remove-button-1"]').simulate('click');
      expect(wrapper.find("input#root_otherData").length).toEqual(1);
      expect(wrapper.find("input#root_otherData").props().value).toEqual("Hello");
    });

    it("Example 2", async () => {
      let wrapper = mount(<NumberedArrayField
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {addable: true, items: {type: "object", properties: {otherData: {type: "string"}}} }}
        />
      );
      await wrapper.update();
      expect(wrapper.find('[data-test="remove-button-0"]').length).toEqual(1);
      expect(wrapper.find('[data-test="remove-button-1"]').length).toEqual(1);
      wrapper.find('[data-test="remove-button-0"]').simulate('click');
      expect(wrapper.find("input#root_otherData").length).toEqual(1);
      expect(wrapper.find("input#root_otherData").props().value).toEqual("There");
    });
  });

  it("Displays no buttons if not addable", async () => {
    let wrapper = mount(<NumberedArrayField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {addable: false, items: {type: "object", properties: {otherData: {type: "string"}}} }}
      />
    );
    await wrapper.update();
    expect(wrapper.find('[data-test="add-button"]').length).toEqual(0);
    expect(wrapper.find('[data-test="remove-button-0"]').length).toEqual(0);
  });

  describe("It calls onChange", () => {
    it("Example 1", async () => {
      let onChangeSpy = jest.fn();

      let wrapper = mount(<NumberedArrayField
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{otherData: "Hello"}, {otherData: "There"}] }
          schema={ {addable: false, items: {type: "object", properties: {otherData: {type: "string"}}} }}
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
          registry={{fields: {SchemaField: FieldFake}}}
          formData={ [{someData: "General"}, {someData: "Specific"}] }
          schema={ {addable: false, items: {type: "object", properties: {someData: {type: "string"}}} }}
          onChange={onChangeSpy}
        />
      );
      await wrapper.update();
      wrapper.find("input#root_someData").at(1).simulate('change', {target: {value: "Generalised"}});
      await wait();

      expect(onChangeSpy).toHaveBeenCalledWith([{someData: "General"},{someData: "Generalised"}]);
    });
  });

  describe("Items with a ui schema", () => {
    let onChangeSpy, wrapper 

    beforeEach(()=> {
      onChangeSpy = jest.fn();
      wrapper = mount(<NumberedArrayField
        registry={{fields: {SchemaField: FieldFake}}}
        formData={ [{otherData: "Hello"}, {otherData: "There"}] }
        schema={ {addable: false, items: {type: "object", properties: {otherData: {type: "string"}}} }}
        uiSchema={{items: {"some ui things": "lots of them"}}}
        onChange={onChangeSpy}
      />
      );

      it("PAsses it onto the schema field", () => {
        expect(wrapper.find("FieldFake").props().uiSchema).toEqual({"some ui things": "lots of them"})
      })
    })
    
  });
});
