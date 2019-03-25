import React from "react";
import AmendBaselineButton from ".";
import { mount } from "enzyme";

describe("<AmendBaselineButton>", () => {
  describe("Example 1", () => {
    let history, amendBaselineSpy, wrap;
    beforeEach(() => {
      history = [];
      amendBaselineSpy = {execute: jest.fn((presenter, request) => presenter.amendBaselineSuccess({baselineId: 6}))}
      wrap = mount(
        <AmendBaselineButton
          match={{params: {projectId: 1}}}
          history={history}
          status={"Submitted"}
          amendBaseline={amendBaselineSpy}
        />);
    });

    it("Should call the amend baseline use case", async () => {
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(amendBaselineSpy.execute).toHaveBeenCalledWith(expect.anything(), {projectId: 1})
    });
    
    it("Clicking should push to the history prop", async () => {
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(history).toEqual([`/project/1/baseline/6`])
    });

  });

  describe("Example 2", () => {
    let history, amendBaselineSpy, wrap
    beforeEach(() => {
      history = [];
      amendBaselineSpy = {execute: jest.fn((presenter, request) => presenter.amendBaselineSuccess({baselineId: 14}))}
      wrap = mount(
        <AmendBaselineButton
        match={{params: {projectId: 3}}}
        amendBaseline={amendBaselineSpy}
        history={history}
        status={"Submitted"}
      />);
    });

    it("Should call the amend baseline use case", async () => {
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(amendBaselineSpy.execute).toHaveBeenCalledWith(expect.anything(),{projectId: 3})
    });
    
    it("Clicking should push to the history prop", async () => {
      await wrap.update();
      wrap.find("[data-test='amend-button']").simulate('click');
      expect(history).toEqual([`/project/3/baseline/14`])
    });

  });

  describe("Project is not submitted", () => {
    let history, amendBaselineSpy, wrap;
    beforeEach(() => {
      history = [];
      amendBaselineSpy = {execute: jest.fn((presenter, request) => presenter.amendBaselineSuccess({baselineId: 6}))}
      wrap = mount(
        <AmendBaselineButton
          match={{params: {projectId: 1}}}
          history={history}
          amendBaseline={amendBaselineSpy}
          status={"Draft"}
        />);
    });

    it("Displays nothing", () => {
      expect(wrap.find('[data-test="amend-button"]').length).toEqual(0)
    });

  });
});
