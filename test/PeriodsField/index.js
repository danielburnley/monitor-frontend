import React from "react";
import PeriodsField from "../../src/Components/PeriodsField";
import FieldFake from "../FieldFake";
import { mount } from "enzyme";

export default class Periods {
  constructor(data, schema, uiSchema) {
    this.onChangeSpy = jest.fn();
    this.page = mount(
      <PeriodsField
      formData={data}
      schema={schema}
      onChange={this.onChangeSpy}
      uiSchema={uiSchema}
      registry={{fields: {SchemaField: FieldFake, anotherField: FieldFake}}}
      />
    );
  }

  lineTitle(index) {
    return this.page
      .find('[data-test="line-title"]')
      .at(index)
      .text();
  }

  lineData(index, title) {
    return this.page
      .find(`#root_${title}-line-data`)
      .at(index)
      .text();
  }

  inputFieldCount(title) {
    return this.page.find(`#root_${title}-input`).length;
  }

  changeInputField(index, title, data) {
    return this.page
      .find(`#root_${title}-input`)
      .at(index)
      .simulate("change", { target: { value: data } });
  }

  inputFieldValue(index, title) {
    return this.page
      .find(`#root_${title}-input`)
      .at(index)
      .props().value;
  }

  schemaField() {
    return this.page.find("FieldFake")
  }

  schemaFieldProperty(index = 0, property) {
    return this.schemaField().at(index).props()[property]
  }

  addButton() {
    return this.page.find('[data-test="add-button"]').length;
  }

  pressAdd() {
    this.page.find('[data-test="add-button"]').simulate('click');
  }

  removeButton() {
    return this.page.find('[data-test="remove-button-0"]').length;
  }

  pressRemove(index) {
    this.page.find(`[data-test="remove-button-${index}"]`).simulate('click');
  }
}
