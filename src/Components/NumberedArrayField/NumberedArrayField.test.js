//needs to take items, items is an array of prop objects
// that need to be passed down

import NumberedArrayField from ".";
import React from "react";
import WidgetStub from "../../../test/WidgetStub";
import { mount, shallow } from "enzyme";

describe("<NumberedArrayField>", () => {
  describe("It passes items props to children", () => {
    describe("Single children", () => {
      it("Example 1", () => {
        let wrapper = mount(
          <NumberedArrayField items={[
              {children: <WidgetStub data-test="example-widget1"/>}
            ]}/>
        );
        wrapper.update();
        expect(wrapper.find("[data-test='example-widget1']").length).toEqual(1);
      });

      it("Example 2", () => {
        let wrapper = mount(
          <NumberedArrayField items={[
              {children: <WidgetStub data-test="example-widget2"/>}
            ]}/>
        );
        wrapper.update();
        expect(wrapper.find("[data-test='example-widget2']").length).toEqual(1);
      });
    });

    describe("Multiple children", () => {
      it("Example 1", () => {
        let wrapper = mount(
          <NumberedArrayField items={[
              {children: <WidgetStub data-test="example-widget1"/>},
              {children: <WidgetStub data-test="example-widget2"/>}
            ]}/>
        );
        wrapper.update();
        expect(wrapper.find("[data-test='example-widget1']").length).toEqual(1);
        expect(wrapper.find("[data-test='example-widget2']").length).toEqual(1);
      });

      it("Example 2", () => {
        let wrapper = mount(
          <NumberedArrayField items={[
              {children: <WidgetStub data-test="example-widget2"/>},
              {children: <WidgetStub data-test="example-widget2"/>}
            ]}/>
        );
        wrapper.update();
        expect(wrapper.find("[data-test='example-widget2']").length).toEqual(2);
      });
    });
  });
});
