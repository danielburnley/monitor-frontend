import React from "react";
import AmendBaselineButton from ".";
import { mount } from "enzyme";
import { isIterable } from "core-js";

describe("<AmendBaselineButton>", () => {
  describe("Example 1", () => {
    it("Clicking should push to the history prop", async () => {
      let history = [];
      let wrap = mount(<AmendBaselineButton match={{params: {projectId: 1}}} history={history}/>);
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(history).toEqual([`/project/1/baseline/amend`])
    });
  });

  describe("Example 2", () => {
    it("Clicking should push to the history prop", async () => {
      let history = [];
      let wrap = mount(<AmendBaselineButton match={{params: {projectId: 3}}} history={history}/>);
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(history).toEqual([`/project/3/baseline/amend`])
    });
  });
});
