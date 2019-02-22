import React from "react";
import ReturnListProvider from ".";
import { shallow } from "enzyme";

describe("<ReturnListProvider/>", () => {
  let page, getReturnsSpy, childrenSpy;

  describe("When a return list is loaded", () => {
    describe("Example 1", () => {
      let data = {
        returns: [
          {
            id: "1",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          }
        ]
      };
      beforeEach(() => {
        getReturnsSpy = {
          execute: (presenter, _) =>
            presenter.presentReturns({
              data: data
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ReturnListProvider
            match={{ projectId: 1 }}
            getReturns={getReturnsSpy}
          >
            {childrenSpy}
          </ReturnListProvider>
        );
      });

      it("Renders the children with the formData passed from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          returns: data
        });
      });
    });

    describe("Example 2", () => {
      let data = {
        returns: [
          {
            id: "1",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          },
          {
            id: "2",
            project_id: "1",
            status: "Submitted",
            updates: [
              {
                changed: "Some"
              }
            ]
          }
        ]
      };
      beforeEach(() => {
        getReturnsSpy = {
          execute: (presenter, _) =>
            presenter.presentReturns({
              data: data
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ReturnListProvider
            match={{ projectId: 2 }}
            getReturns={getReturnsSpy}
          >
            {childrenSpy}
          </ReturnListProvider>
        );
      });

      it("Renders the children with the formData passed from the usecase", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          returns: data
        });
      });
    });
  });
});
