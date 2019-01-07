import React from "react";
import FormField from ".";
import { shallow } from "enzyme";

describe("FormField", () => {
  describe("renderInput()", () => {
    describe("With an input type of text", () => {
      let type = "text";
      let field = shallow(<FormField type={type} />);

      it("Renders the input type of text", () => {
        expect(field.find("[data-test='input-text']").length).toEqual(1);
      });
    });

    describe("With an input type of yes/no", () => {
      let type = "yes/no";
      let field = shallow(<FormField type={type} />);

      it("Renders the input type of yes/no", () => {
        expect(field.find("[data-test='input-yes-no']").length).toEqual(1);
      });
    });

    describe("With an input type of status", () => {
      let type = "status";
      let field = shallow(<FormField type={type} />);

      it("Renders the input type of status", () => {
        expect(field.find("[data-test='input-status']").length).toEqual(1);
      });
    });
  });

  describe("Renders the label correctly", () => {
    describe("Example 1", () => {
      let fieldLabel = "Dogs";
      let field = shallow(<FormField fieldLabel={fieldLabel} />);

      it("Renders the label", () => {
        expect(field.find("[data-test='label']").text()).toEqual("Dogs");
      });
    });

    describe("Example 2", () => {
      let fieldLabel = "Cats";
      let field = shallow(<FormField fieldLabel={fieldLabel} />);

      it("Renders the label", () => {
        expect(field.find("[data-test='label']").text()).toEqual("Cats");
      });
    });
  });
});
