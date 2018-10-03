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
  listItem = number =>
    this.returnList.find(`[data-test='return-${number}']`).text();
  status = number =>
    this.returnList.find(`[data-test='status-${number}']`).text();
  urlTarget = number =>
    this.returnList.find(`[data-test='return-${number}']`).prop("href");
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
      let url = window.location.origin;

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });

      it("displays a list item for the return", () => {
        expect(returnList.listItem(1)).toEqual("Return 1");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(1)).toEqual(`${url}/project/1/return/1`);
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(1)).toEqual("Draft");
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
      let url = window.location.origin;

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("List of Returns");
      });

      it("displays a list item for the return", () => {
        expect(returnList.listItem(7)).toEqual("Return 7");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(7)).toEqual(`${url}/project/1/return/7`);
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(7)).toEqual("Saved");
      });
    });
  });

  describe("Given two returns", () => {
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
          },
          {
            id: "2",
            project_id: "1",
            status: "Saved",
            update: [
              {
                changes: "Some"
              }
            ]
          }
        ]
      };
      let schemaTitle = "Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);
      let url = window.location.origin;

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });

      it("displays multiple list items for the returns", () => {
        expect(returnList.listItem(1)).toEqual("Return 1");
        expect(returnList.listItem(2)).toEqual("Return 2");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(1)).toEqual(`${url}/project/1/return/1`);
        expect(returnList.urlTarget(2)).toEqual(`${url}/project/1/return/2`);
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(1)).toEqual("Draft");
        expect(returnList.status(2)).toEqual("Saved");
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
          },
          {
            id: "6",
            project_id: "1",
            status: "Woof",
            update: [
              {
                changes: "Meow"
              }
            ]
          }
        ]
      };
      let schemaTitle = "Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);
      let url = window.location.origin;

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });

      it("displays multiple list items for the returns", () => {
        expect(returnList.listItem(7)).toEqual("Return 7");
        expect(returnList.listItem(6)).toEqual("Return 6");
      });

      it("creates a link to the correct location", () => {
        expect(returnList.urlTarget(7)).toEqual(`${url}/project/1/return/7`);
        expect(returnList.urlTarget(6)).toEqual(`${url}/project/1/return/6`);
      });

      it("shows the current status of the return", () => {
        expect(returnList.status(7)).toEqual("Saved");
        expect(returnList.status(6)).toEqual("Woof");
      });
    });
  });
});
