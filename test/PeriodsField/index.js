import React from "react";
import PeriodsField from "../../src/Components/PeriodsField";
import { mount } from "enzyme";

export default class Periods {
  constructor(data, schema) {
    this.onChangeSpy = jest.fn();
    this.page = mount(
      <PeriodsField
        formData={data}
        schema={schema}
        onChange={this.onChangeSpy}
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
      .find(`[data-test="${title}-line-data"]`)
      .at(index)
      .text();
  }

  inputFieldCount(title) {
    return this.page.find(`[data-test="${title}-input"]`).length;
  }
  changeInputField(index, title, data) {
    return this.page
      .find(`[data-test="${title}-input"]`)
      .at(index)
      .simulate("change", { target: { value: data } });
  }

  inputFieldValue(index, title) {
    return this.page
      .find(`[data-test="${title}-input"]`)
      .at(index)
      .props().value;
  }

  addButton() {
    return this.page.find('[data-test="add-button"]').length;
  }

  pressAdd() {
    this.page.find('[data-test="add-button"]').simulate('click');
  }

  numberOfRemoveButton() {
    return this.page.find('[data-test="remove-button"]').length;
  }

  pressRemove() {
    this.page.find('[data-test="remove-button"]').simulate('click');
  }
}
