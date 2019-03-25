import React from "react";
import BaselineListProvider from ".";
import { shallow } from "enzyme";

describe("<BaselineListProvider/>", () => {
  let getBaselinesSpy, childrenSpy, baselines;

  describe("Example 1", () => {
    beforeEach(() => {
      baselines = [
        {
          id: "1",
          version: "1",
          status: "Draft",
          data: { changed: "Yes" },
          timestamp: 1233
        }
      ]

      getBaselinesSpy = {
        execute: jest.fn((presenter, _) => 
          presenter.presentBaselines(baselines))
      };
      childrenSpy = jest.fn();

      shallow(
        <BaselineListProvider
          match={{ params: { projectId: 1 } }}
          getBaselines={getBaselinesSpy}
        >
          {childrenSpy}
        </BaselineListProvider>
      );
    });

    it("calls the get baselines usecase", () => {
      expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {id: 1})
    });

    it("Renders the children list of baseline versions passed from the use case", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        baselines: baselines
      });
    });
  });

  describe("Example 2", () => {
    beforeEach(() => {
      baselines =  [
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

      getBaselinesSpy = {
        execute: jest.fn((presenter, _) =>
          presenter.presentBaselines(baselines)
        )
      };
      childrenSpy = jest.fn();

      shallow(<BaselineListProvider
          match={{ params: { projectId: 2} }}
          getBaselines={getBaselinesSpy}
        >
          {childrenSpy}
        </BaselineListProvider>
      );
    });

    it("calls the get baselines usecase", () => {
      expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {id: 2})
    });

    it("Renders the children with the baselines passed from the use case", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        baselines: baselines
      });
    });
  });
});
