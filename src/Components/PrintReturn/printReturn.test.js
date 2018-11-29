import React from "react";
import PrintReturn from ".";
import { shallow } from "enzyme";

describe("Print Return", () => {
  describe("Example 1", () => {
    let page, getReturnSpy, childrenSpy;
    beforeEach(() => {
      getReturnSpy = {
        execute: jest.fn((presenter, _) =>
          presenter.presentReturn({
            data: { kitty: "purrr" },
            schema: { type: "cat", title: "Kitty" },
            status: "Submitted",
            type: "ac"
          })
        )
      };

      childrenSpy = jest.fn();

      page = shallow(
        <PrintReturn
          match={{ params: { id: "1", projectId: "4" } }}
          getReturn={getReturnSpy}
        >
        {childrenSpy}
        </PrintReturn>

      );
    });

    it("Calls the getReturn usecase when loaded", () => {
      expect(getReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        id: "1",
        projectId: "4"
      });
    });

    it("Holds the data when the return is presented", () => {
      expect(page.state().data).toEqual({ kitty: "purrr" });
    });

    it("Holds the schmea when the return is presented", () => {
      expect(page.state().schema).toEqual({ type: "cat", title: "Kitty" });
    });

    it("Call its children with the correct props", ()=> {
      expect(childrenSpy).toHaveBeenCalledWith({
        schema: { type: "cat", title: "Kitty" },
        data: { kitty: "purrr" }
      })
    })
  });

  describe("Example 2", () => {
    let page, getReturnSpy, childrenSpy;
    beforeEach(() => {
      getReturnSpy = {
        execute: jest.fn((presenter, _) =>
          presenter.presentReturn({
            data: { doggy: "woofy" },
            schema: { type: "dog", title: "Woof" },
            status: "Submitted",
            type: "hif"
          })
        )
      };

      childrenSpy = jest.fn();

      page = shallow(
        <PrintReturn
          match={{ params: { id: "2", projectId: "5" } }}
          getReturn={getReturnSpy}
        >
        {childrenSpy}
        </PrintReturn>
      );
    });

    it("Calls the getReturn usecase when loaded", () => {
      expect(getReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        id: "2",
        projectId: "5"
      });
    });

    it("Holds the data when the return is presented", () => {
      expect(page.state().data).toEqual({ doggy: "woofy" });
    });

    it("Holds the schmea when the return is presented", () => {
      expect(page.state().schema).toEqual({ type: "dog", title: "Woof" });
    });

    it("Call its children with the correct props", ()=> {
      expect(childrenSpy).toHaveBeenCalledWith({
        schema: { type: "dog", title: "Woof" },
        data: { doggy: "woofy" }
      })
    })
  });
});
