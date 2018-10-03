import ReturnList from ".";
import React from "react";
import { shallow } from "enzyme";

class ReturnListComponent {
  constructor(formData, schemaTitle) {
    this.returnList = shallow(
      <ReturnList schema={{ title: schemaTitle }} formData={formData} />
    );
  }

  title = () => this.returnList.find("[data-test='schema-title']").text();
  listItem1 = () => this.returnList.find("[data-test='return-1']").text();
  listItem2 = () => this.returnList.find("[data-test='return-2']").text();
  listItem3 = () => this.returnList.find("[data-test='return-3']").text();
  listItem4 = () => this.returnList.find("[data-test='return-5']").text();
  listItem5 = () => this.returnList.find("[data-test='return-5']").text();
  listItem6 = () => this.returnList.find("[data-test='return-6']").text();
  listItem7 = () => this.returnList.find("[data-test='return-7']").text();
}

describe("<ReturnList", () => {
  describe("Given one return", () => {
    describe("Example 1", () => {
      let formData = {
        returns: [
          {
            id: "1",
            project_id: "1",
            status: "Draft",
            updates: [
              {
                changes: "Yes"
              }
            ]
          }
        ]
      };
      let schemaTitle = "Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });

      it("displays a list item for the return", () => {
        expect(returnList.listItem1()).toEqual("Return 1");
      });
    });

    describe("Example 2", () => {
      let formData = {
        returns: [
          {
            id: "7",
            project_id: "1",
            status: "Saved",
            updates: [
              {
                changes: "Some"
              }
            ]
          }
        ]
      };
      let schemaTitle = "List of Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("List of Returns");
      });

      it("displays a list item for the return", () => {
        expect(returnList.listItem7()).toEqual("Return 7");
      });
    });
  });

  xdescribe("Given two returns", () => {
    describe("Example 1", () => {
      let formData = {
        returns: {
          id: "1",
          project_id: "1",
          status: "Draft",
          updates: "Yes"
        },
        returns: {
          id: "2",
          project_id: "1",
          status: "Saved",
          update: "Some"
        }
      };
      let schemaTitle = "Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });

      it("displays a list item for the return", () => {
        expect(returnList.listItem1()).toEqual("Return 1");
      });
    });
  });
});
