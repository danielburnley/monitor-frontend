import List from ".";
import React from "react";
import { shallow } from "enzyme";

class ListComponent {
  constructor(items, type, prettyType) {
    this.type = type
    this.list = shallow(
    <List
      items={items}
      listType={type}
      match={{params: {projectId: 1}}}
      prettyListType={prettyType}
    />
    );
  }
  listItem = number =>
    this.list.find(`[data-test='${this.type}-${number}']`).text();
  status = number =>
    this.list.find(`[data-test='status-${number}']`).text();
  urlTarget = number =>
    this.list.find(`[data-test='url-${number}']`).prop("href");
  timestamp = number =>
    this.list.find(`[data-test='timestamp-${number}']`).text();
  timestampExists = number =>
    this.list.find(`[data-test='timestamp-${number}']`).length;
}

describe("<List>", () => {
  describe("Given one item", () => {
    describe("Example 1", () => {
      let items = [
        {
          id: 7,
          project_id: 1,
          status: "Draft",
          updates: [
            {
              changes: "Yes"
            }
          ],
          timestamp: 1545739200
        }
      ];
      let returnList = new ListComponent(items, "return", "Return");

      it("displays a list item for the return", () => {
        expect(returnList.listItem(7)).toEqual("Return 1");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(7)).toEqual("/project/1/return/7");
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(7)).toEqual("Draft");
      });

      it("shows the submission time of the return", () => {
        expect(returnList.timestamp(7)).toEqual("25/12/2018");
      });
    });

    describe("Example 2", () => {
      let items = [
        {
          id: 7,
          project_id: 1,
          status: "Saved",
          updates: [
            {
              changes: "Some"
            }
          ],
          timestamp: 0
        }
      ];
      let claimList = new ListComponent(items, "claim", "Claim");

      it("displays a list item for the return", () => {
        expect(claimList.listItem(7)).toEqual("Claim 1");
      });

      it("creates a link to the correct location", () => {
        expect(claimList.urlTarget(7)).toEqual("/project/1/claim/7");
      });

      it("shows the current status of the claim", () => {
        expect(claimList.status(7)).toEqual("Saved");
      });

      it("does not display the timestamp", () => {
        expect(claimList.timestampExists(7)).toEqual(0);
      });
    });
  });

  describe("Given two returns", () => {
    describe("Example 1", () => {
      let returns = [
        {
          id: 1,
          project_id: 1,
          status: "Draft",
          updates: [
            {
              changes: "Yes"
            }
          ],
          timestamp: 1545308331
        },
        {
          id: 2,
          project_id: 1,
          status: "Saved",
          update: [
            {
              changes: "Some"
            }
          ],
          timestamp: 0
        }
      ];
      let returnList = new ListComponent(returns, "return", "Return");

      it("displays multiple list items for the returns", () => {
        expect(returnList.listItem(1)).toEqual("Return 1");
        expect(returnList.listItem(2)).toEqual("Return 2");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(1)).toEqual("/project/1/return/1");
        expect(returnList.urlTarget(2)).toEqual("/project/1/return/2");
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(1)).toEqual("Draft");
        expect(returnList.status(2)).toEqual("Saved");
      });

      it("shows the timestamp when relevant", () => {
        expect(returnList.timestamp(1)).toEqual("20/12/2018");
        expect(returnList.timestampExists(2)).toEqual(0);
      });
    });

    describe("Example 2", () => {
      let claims = [
        {
          id: 7,
          project_id: 1,
          status: "Saved",
          updates: [
            {
              changes: "Some"
            }
          ],
          timestamp: 1546344000
        },
        {
          id: 6,
          project_id: 1,
          status: "Woof",
          update: [
            {
              changes: "Meow"
            }
          ],
          timestamp: 1514808000
        }
      ];
      let claimList = new ListComponent(claims, "claim", "Claim");

      it("displays multiple list items for the claims", () => {
        expect(claimList.listItem(7)).toEqual("Claim 1");
        expect(claimList.listItem(6)).toEqual("Claim 2");
      });

      it("creates a link to the correct location", () => {
        expect(claimList.urlTarget(7)).toEqual("/project/1/claim/7");
        expect(claimList.urlTarget(6)).toEqual("/project/1/claim/6");
      });

      it("shows the current status of the claim", () => {
        expect(claimList.status(7)).toEqual("Saved");
        expect(claimList.status(6)).toEqual("Woof");
      });

      it("shows the timestamp", () => {
        expect(claimList.timestamp(7)).toEqual("1/1/2019");
        expect(claimList.timestamp(6)).toEqual("1/1/2018");
      });
    });
  });
});
