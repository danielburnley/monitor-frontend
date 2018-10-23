import React from "react";
import PeriodFinancials from ".";
import { mount } from "enzyme";

describe("Period Financials", () => {
  describe("Read Only data", () => {
    describe("Example 1", () => {
      let data = [
        { period: "Fluffy", age: "12" },
        { period: "sparkles", age: "5" }
      ];
      let schema = {
        periods: true,
        title: "cats",
        type: "Array",
        items: {
          type: "object",
          properties: {
            period: {
              type: "string",
              title: "Cat Name",
              readonly: true
            },
            age: {
              type: "string",
              title: "Cat Age",
              readonly: true
            }
          }
        }
      };
      let page = mount(<PeriodFinancials formData={data} schema={schema} />);
      it("Displays the titles", () => {
        expect(
          page
            .find('[data-test="line-title"]')
            .at(0)
            .text()
        ).toEqual("Cat Name");
        expect(
          page
            .find('[data-test="line-title"]')
            .at(1)
            .text()
        ).toEqual("Cat Age");
      });

      it("Displays the data", () => {
        expect(
          page
            .find('[data-test="period-line-data"]')
            .at(0)
            .text()
        ).toEqual("Fluffy");
        expect(
          page
            .find('[data-test="period-line-data"]')
            .at(1)
            .text()
        ).toEqual("sparkles");
        expect(
          page
            .find('[data-test="age-line-data"]')
            .at(0)
            .text()
        ).toEqual("12");
        expect(
          page
            .find('[data-test="age-line-data"]')
            .at(1)
            .text()
        ).toEqual("5");
      });
    });
    describe("Example 2", () => {
      let data = [
        { period: "scaley", length: "200" },
        { period: "slivery", length: "567" }
      ];
      let schema = {
        type: "array",
        items: {
          type: "object",
          properties: {
            period: {
              type: "string",
              title: "Lizard Type",
              readonly: true
            },
            length: {
              type: "string",
              title: "How Long",
              readonly: true
            }
          }
        }
      };
      let page = mount(<PeriodFinancials formData={data} schema={schema} />);
      it("Displays the title", () => {
        expect(
          page
            .find('[data-test="line-title"]')
            .at(0)
            .text()
        ).toEqual("Lizard Type");
        expect(
          page
            .find('[data-test="line-title"]')
            .at(1)
            .text()
        ).toEqual("How Long");
      });

      it("Displays the data", () => {
        expect(
          page
            .find('[data-test="period-line-data"]')
            .at(0)
            .text()
        ).toEqual("scaley");
        expect(
          page
            .find('[data-test="period-line-data"]')
            .at(1)
            .text()
        ).toEqual("slivery");
        expect(
          page
            .find('[data-test="length-line-data"]')
            .at(0)
            .text()
        ).toEqual("200");
        expect(
          page
            .find('[data-test="length-line-data"]')
            .at(1)
            .text()
        ).toEqual("567");
      });
    });
  });

  describe("Input rows", () => {
    describe("Example 1", () => {
      let data = [{ period: "Fluffy" }, { period: "sparkles", age: "5" }];
      let schema = {
        type: "array",
        items: {
          type: "object",
          properties: {
            period: {
              type: "string",
              title: "Dog Name",
              readonly: true
            },
            age: {
              type: "string",
              title: "Dog Age"
            }
          }
        }
      };

      let onChangeSpy = jest.fn();

      let page = mount(
        <PeriodFinancials
          formData={data}
          schema={schema}
          onChange={onChangeSpy}
        />
      );

      it("Displays the correct title", () => {
        expect(
          page
            .find('[data-test="line-title"]')
            .at(1)
            .text()
        ).toEqual("Dog Age");
      });

      it("Displays an input field", () => {
        expect(page.find("input[data-test='age-input']").length).toEqual(2);
      });

      it("Calls the onChange method passed in with the form data", () => {
        page
          .find("input[data-test='age-input']")
          .at(0)
          .simulate("change", { target: { value: "45" } });

        expect(onChangeSpy).toHaveBeenCalledWith([
          { age: "45", period: "Fluffy" },
          { age: "5", period: "sparkles" }
        ]);
      });

      it("Prepopulates form data", () => {
        expect(
          page
            .find("input[data-test='age-input']")
            .at(1)
            .props().value
        ).toEqual("5");
      });
    });

    describe("Example 2", () => {
      let data = [
        { period: "scaley" },
        { period: "slivery" },
        { period: "shiny", length: "2" }
      ];
      let schema = {
        type: "array",
        items: {
          type: "object",
          properties: {
            period: {
              type: "string",
              title: "Lizard Type",
              readonly: true
            },
            length: {
              type: "string",
              title: "How Long"
            }
          }
        }
      };
      let onChangeSpy = jest.fn();
      let page = mount(
        <PeriodFinancials
          formData={data}
          schema={schema}
          onChange={onChangeSpy}
        />
      );

      it("Displays the correct title", () => {
        expect(
          page
            .find('[data-test="line-title"]')
            .at(1)
            .text()
        ).toEqual("How Long");
      });

      it("Displays an input field", () => {
        expect(page.find("input[data-test='length-input']").length).toEqual(3);
      });

      it("Calls the onChange method passed in with the form data", () => {
        page
          .find("input[data-test='length-input']")
          .at(0)
          .simulate("change", { target: { value: "45" } });

        expect(onChangeSpy).toHaveBeenCalledWith([
          { period: "scaley", length: "45" },
          { period: "slivery" },
          { period: "shiny", length: "2" }
        ]);
      });

      it("Prepopulates form data", () => {
        expect(
          page
            .find("input[data-test='length-input']")
            .at(2)
            .props().value
        ).toEqual("2");
      });
    });
  });
});
