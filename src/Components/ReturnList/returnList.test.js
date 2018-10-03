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
}

describe("<ReturnList", () => {
  describe("Given one return", () => {
    describe("Example 1", () => {
      let formData = {
        returns: {
          id: "1",
          project_id: "1",
          status: "Draft",
          updates: "Yes"
        }
      };
      let schemaTitle = "Returns";
      let returnList = new ReturnListComponent(formData, schemaTitle);

      it("displays this schema title", () => {
        expect(returnList.title()).toEqual("Returns");
      });
    });
  });
});
