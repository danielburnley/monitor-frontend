import React from "react";
import ClaimListProvider from ".";
import { shallow } from "enzyme";

describe("<ClaimListProvider/>", () => {
  let getClaimsSpy, childrenSpy, claims;

  describe("Example 1", () => {
    beforeEach(() => {
      claims = [
        {
          id: "1",
          version: "1",
          status: "Draft",
          data: { changed: "Yes" },
          timestamp: 1233
        }
      ]

      getClaimsSpy = {
        execute: jest.fn((presenter, _) => 
          presenter.presentClaims(claims))
      };
      childrenSpy = jest.fn();

      shallow(
        <ClaimListProvider
          match={{ params: { projectId: 1 } }}
          getClaims={getClaimsSpy}
        >
          {childrenSpy}
        </ClaimListProvider>
      );
    });

    it("calls the get claims usecase", () => {
      expect(getClaimsSpy.execute).toHaveBeenCalledWith(expect.anything(), {projectId: 1})
    });

    it("Renders the children list of baseline versions passed from the use case", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        claims: claims
      });
    });
  });

  describe("Example 2", () => {
    beforeEach(() => {
      claims =  [
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

      getClaimsSpy = {
        execute: jest.fn((presenter, _) =>
          presenter.presentClaims(claims)
        )
      };
      childrenSpy = jest.fn();

      shallow(<ClaimListProvider
          match={{ params: { projectId: 2} }}
          getClaims={getClaimsSpy}
        >
          {childrenSpy}
        </ClaimListProvider>
      );
    });

    it("calls the get claims usecase", () => {
      expect(getClaimsSpy.execute).toHaveBeenCalledWith(expect.anything(), {projectId: 2})
    });

    it("Renders the children with the claims passed from the use case", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        claims: claims
      });
    });
  });
});
