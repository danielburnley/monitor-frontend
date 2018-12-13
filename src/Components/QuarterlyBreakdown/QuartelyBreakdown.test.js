import QuarterlyBreakdown from ".";
import { mount } from "enzyme";
import React from "react";
import FieldFake from "../../../test/FieldFake";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Quarterly Breakdown", () => {
    describe("Example 1", () => {
      let field, schema, data, onChangeSpy, uiSchema;
      beforeEach(() => {
        onChangeSpy = jest.fn();

        uiSchema = {
          items : {
            period: {"ui":"weirdUiProp"}
          }
        }

        schema = {
          type: "array",
          title: "Cats Data",
          items: {
            type: "object",
            properties: {
              period: { title: "Year", type: "string", readonly: true },
              quarter1: {
                title: "1st Quarter",
                type: "string"
              },
              quarter2: {
                title: "2nd Quarter",
                type: "string",
                readonly: true
              },
              quarter3: {
                title: "3rd Quarter",
                type: "string",
                readonly: true
              },
              quarter4: {
                title: "4th Quarter",
                type: "string",
                readonly: true
              },
              quareter5: {
                title: "5th Quarter",
                type: "string",
                hidden: true
              },
              total: { title: "Total", type: "string", readonly: true }
            }
          }
        };
        data = [
          {
            period: "2018",
            quarter1: "Fluffy",
            quarter2: "Sparkles"
          },
          {
            period: "2019",
            quarter1: "Spot",
            quarter4: "Purrrfect",
            total: "4 new cats"
          }
        ];
        field = mount(<QuarterlyBreakdown
          schema={schema}
          formData={data}
          onChange={onChangeSpy}
          registry={{fields: {SchemaField: FieldFake, extraField: FieldFake}}}
          uiSchema={uiSchema}
          />);
      });

      describe("Rendering Schema Field", () => {
        it("Renders a schema field for each data point", () => {
          expect(field.find("FieldFake").length).toEqual(14)
        });

        it("passes the registry to schema field", () => {
          expect(field.find("FieldFake").at(0).props().registry).toEqual({fields: {SchemaField: FieldFake, extraField: FieldFake} })
        });

        it("passes the uischema", () => {
          expect(field.find("FieldFake").at(0).props().uiSchema).toEqual({"ui":"weirdUiProp"})
        });
      });

      describe("onChange", () => {
        it("call the onChange method with the form data", async () => {
          field
            .find('#root_quarter1_0')
            .simulate("change", { target: { value: "Bye" } });
          expect(onChangeSpy).toHaveBeenCalledWith(
            [
              {
                period: "2018",
                quarter1: "Bye",
                quarter2: "Sparkles"
              },
              {
                period: "2019",
                quarter1: "Spot",
                quarter4: "Purrrfect",
                total: "4 new cats"
              }
            ]
          );
          await field.update();
          expect(field.find("input#root_quarter1_0").props().value).toEqual("Bye");
        });
      })

      describe("Rendering data", () => {
        it("Displays the first period", () => {
          expect(field.find('#root_period_0').length).toEqual(1);
          expect(field.find('#root_period_0').props().value).toEqual(
            "2018"
          );
        });
  
        it("Displays the first quarter1", () => {
          expect(field.find('#root_quarter1_0').length).toEqual(1);
          expect(field.find('#root_quarter1_0').props().value).toEqual(
            "Fluffy"
          );
        });
  
        it("Displays the first quarter2", () => {
          expect(field.find('#root_quarter2_0').length).toEqual(1);
          expect(field.find('#root_quarter2_0').props().value).toEqual(
            "Sparkles"
          );
        });
  
        it("Displays the first quarter3", () => {
          expect(field.find('#root_quarter3_0').length).toEqual(1);
        });
  
        it("Displays the first quarter4", () => {
          expect(field.find('#root_quarter4_0').length).toEqual(1);
        });
  
        it("Displays the first period total", () => {
          expect(field.find('#root_total_0').length).toEqual(1);
        });
  
        it("displays the second period", () => {
          expect(field.find('#root_period_1').length).toEqual(1);
          expect(field.find('#root_period_1').props().value).toEqual(
            "2019"
          );
        });
  
        it("Displays the second quarter1", () => {
          expect(field.find('#root_quarter1_1').length).toEqual(1);
          expect(field.find('#root_quarter1_1').props().value).toEqual(
            "Spot"
          );
        });
  
        it("Displays the second quarter2", () => {
          expect(field.find('#root_quarter2_1').length).toEqual(1);
        });
  
        it("Displays the second quarter3", () => {
          expect(field.find('#root_quarter3_1').length).toEqual(1);
        });
  
        it("Displays the second quarter4", () => {
          expect(field.find('#root_quarter4_1').length).toEqual(1);
          expect(field.find('#root_quarter4_1').props().value).toEqual(
            "Purrrfect"
          );
        });
  
        it("Displays the second period total", () => {
          expect(field.find('#root_total_1').length).toEqual(1);
          expect(field.find('#root_total_1').props().value).toEqual(
            "4 new cats"
          );
        });
      });

      describe("Rendering titles", () => {
        it("Displays the title", () => {
          expect(field.find("[data-test='title']").text()).toEqual("Cats Data");
          expect(field.find("[data-test='title']").length).toEqual(1);
        });
  
        it("Displays the period title", () => {
          expect(field.find("[data-test='period_title']").length).toEqual(1);
        });
  
        it("Displays the 1st quarter title", () => {
          expect(field.find("[data-test='quarter1_title']").text()).toEqual(
            "1st Quarter"
          );
          expect(field.find("[data-test='quarter1_title']").length).toEqual(1);
        });
  
        it("Displays the second title", () => {
          expect(field.find("[data-test='quarter2_title']").text()).toEqual(
            "2nd Quarter"
          );
          expect(field.find("[data-test='quarter2_title']").length).toEqual(1);
        });
        it("Displays the third title", () => {
          expect(field.find("[data-test='quarter3_title']").text()).toEqual(
            "3rd Quarter"
          );
          expect(field.find("[data-test='quarter3_title']").length).toEqual(1);
        });
        it("Displays the fourth title", () => {
          expect(field.find("[data-test='quarter4_title']").text()).toEqual(
            "4th Quarter"
          );
          expect(field.find("[data-test='quarter4_title']").length).toEqual(1);
        });

        it("Doesn't display the fifth title", () => {
          expect(field.find("[data-test='quarter5_title']").length).toEqual(0);
        });

        it("Displays the total title", () => {
          expect(field.find("[data-test='total_title']").text()).toEqual("Total");
          expect(field.find("[data-test='total_title']").length).toEqual(1);
        });
      });
      describe("When not addable", () => {
        it("Does not render an add button when not addable", () => {
          expect(field.find("[data-test='add-button']").length).toEqual(0);
        });
  
        it("Does not render a remove button when not addable", () => {
          expect(field.find("[data-test='remove-button-0']").length).toEqual(0);
        });
      });

    });

    describe("Example 2", () => {
      let schema, data, field, onChangeSpy, uiSchema;
      beforeEach(() => {
        onChangeSpy = jest.fn(() => {})
        schema = {
          type: "array",
          title: "Dogs Data",
          addable: true,
          items: {
            type: "object",
            properties: {
              period: { title: "Period", type: "string", readonly: true },
              quarter1: {
                title: "Quarter 1.0",
                type: "string",
                readonly: true
              },
              quarter2: {
                title: "Quarter 2.0",
                type: "string"
              },
              quarter3: {
                title: "Quarter 3.0",
                type: "string",
                readonly: true
              },
              quarter4: {
                title: "Quarter 4.0",
                type: "string",
                readonly: true
              },
              total: { title: "Year Total", type: "string", readonly: true }
            }
          }
        };
        uiSchema = {
          items: {
            quarter1: {"anotherprop": "forui"}
          }
        }
        data = [
          {
            period: "2015",
            quarter1: "Bernard",
            quarter2: "Barks",
            quarter3: "Woof",
            quarter4: "Spot",
            total: "2 new dogs"
          },
          {
            period: "2016",
            quarter1: "Wag",
            quarter2: "floppy",
            quarter3: "Wolf",
            quarter4: "Scout",
            total: "3 new dogs"
          }
        ];
        field = mount(<QuarterlyBreakdown
          schema={schema}
          formData={data}
          registry={{fields: {SchemaField: FieldFake, extraField: FieldFake}}}
          onChange={onChangeSpy}
          uiSchema={uiSchema}
          />);
      });

      describe("Rendering the schema field", () => {
        it("Renders a schema field for each data point", () => {
          expect(field.find("FieldFake").length).toEqual(12)
        });
  
        it("passes the registry to schema field", () => {
          expect(field.find("FieldFake").at(0).props().registry).toEqual({fields: {SchemaField: FieldFake, extraField: FieldFake} })
        });

        it("passes the uischema", () => {
          expect(field.find("FieldFake").at(1).props().uiSchema).toEqual({"anotherprop": "forui"})
        });
      });

      describe("Rendering titles", () => {
        it("Displays the title", () => {
          expect(field.find("[data-test='title']").text()).toEqual("Dogs Data");
          expect(field.find("[data-test='title']").length).toEqual(1);
        });
  
        it("Displays the headers", () => {
          expect(field.find("[data-test='period_title']").text()).toEqual(
            "Period"
          );
          expect(field.find("[data-test='quarter1_title']").text()).toEqual(
            "Quarter 1.0"
          );
          expect(field.find("[data-test='quarter2_title']").text()).toEqual(
            "Quarter 2.0"
          );
          expect(field.find("[data-test='quarter3_title']").text()).toEqual(
            "Quarter 3.0"
          );
          expect(field.find("[data-test='quarter4_title']").text()).toEqual(
            "Quarter 4.0"
          );
          expect(field.find("[data-test='total_title']").text()).toEqual(
            "Year Total"
          );
        });
      });

      describe("Rendering data", () => {
        it("Displays the first period", () => {
          expect(field.find('#root_period_0').length).toEqual(1);
          expect(field.find('#root_period_0').props().value).toEqual(
            "2015"
          );
        });
  
        it("displays the data from the first period", () => {
          expect(field.find('#root_period_0').length).toEqual(1);
          expect(field.find('#root_period_0').props().value).toEqual(
            "2015"
          );
          expect(field.find('#root_quarter1_0').length).toEqual(1);
          expect(field.find('#root_quarter1_0').props().value).toEqual(
            "Bernard"
          );
          expect(field.find('#root_quarter2_0').length).toEqual(1);
          expect(field.find('#root_quarter2_0').props().value).toEqual(
            "Barks"
          );
          expect(field.find('#root_quarter3_0').length).toEqual(1);
          expect(field.find('#root_quarter3_0').props().value).toEqual(
            "Woof"
          );
          expect(field.find('#root_quarter4_0').length).toEqual(1);
          expect(field.find('#root_quarter4_0').props().value).toEqual(
            "Spot"
          );
          expect(field.find('#root_total_0').length).toEqual(1);
          expect(field.find('#root_total_0').props().value).toEqual(
            "2 new dogs"
          );
        });
      });

      describe("When marked as addable", () => {
        it("Does renders an add button", () => {
          expect(field.find("[data-test='add-button']").length).toEqual(1);
        });
  
        it("Does renders a remove button", () => {
          expect(field.find("[data-test='remove-button-0']").length).toEqual(1);
        });
      });

      describe("onChange", () => {
        it("calls the onchange with the new form data", async () => {
          field
            .find('#root_quarter1_0')
            .simulate("change", { target: { value: "Cats" } });
          expect(onChangeSpy).toHaveBeenCalledWith(
            [
              {
                period: "2015",
                quarter1: "Cats",
                quarter2: "Barks",
                quarter3: "Woof",
                quarter4: "Spot",
                total: "2 new dogs"
              },
              {
                period: "2016",
                quarter1: "Wag",
                quarter2: "floppy",
                quarter3: "Wolf",
                quarter4: "Scout",
                total: "3 new dogs"
              }
            ]
          );
          await field.update();
          expect(field.find("input#root_quarter1_0").props().value).toEqual("Cats");          
        })
      });

    });

  describe("No data", () => {
    describe("Example 1", () => {
      let schema, data, field, onChangeSpy;
      beforeEach(() => {
        onChangeSpy = jest.fn();

        schema = {
          type: "array",
          addable: true,
          title: "Cats Data",
          items: {
            type: "object",
            properties: {
              period: { title: "Year", type: "string", readonly: true },
              quarter3: { title: "3rd Quarter", type: "string" },
              quarter1: { title: "1st Quarter", type: "string" },
              quarter2: { title: "2nd Quarter", type: "string" },
              quarter4: { title: "4th Quarter", type: "string" },
              total: { title: "Total", type: "string" }
            }
          }
        };

        data = null;
        field = mount(
          <QuarterlyBreakdown
            schema={schema}
            formData={data}
            registry={{fields: {SchemaField: FieldFake}}}
            onChange={onChangeSpy}
          />
        );
      });

      it("has one input field", () => {
        expect(field.find('#root_period_0').length).toEqual(1);
        expect(field.find('#root_quarter1_0').length).toEqual(1);
        expect(field.find('#root_quarter2_0').length).toEqual(1);
        expect(field.find('#root_quarter3_0').length).toEqual(1);
        expect(field.find('#root_quarter4_0').length).toEqual(1);
      });

      it("renders an add button", () => {
        expect(field.find("[data-test='add-button']").length).toEqual(1);
      });

      it("does render a remove button", () => {
        expect(field.find("[data-test='remove-button-0']").length).toEqual(1);
      });
    });

    describe("Example 2", () => {
      let schema, data, field, onChangeSpy;
      beforeEach(() => {
        onChangeSpy = jest.fn();

        schema = {
          type: "array",
          addable: true,
          title: "Cats Data",
          items: {
            type: "object",
            properties: {
              period: { title: "Year", type: "string", readonly: true },
              quarter3: { title: "Quarter 1.0", type: "string" },
              quarter1: { title: "Quarter 2.0", type: "string" },
              quarter2: { title: "Quarter 3.0", type: "string" },
              quarter4: { title: "Quarter 4.0", type: "string" },
              total: { title: "Total", type: "string" }
            }
          }
        };

        data = null;
        field = mount(
          <QuarterlyBreakdown
            schema={schema}
            formData={data}
            onChange={onChangeSpy}
            registry={{fields: {SchemaField: FieldFake}}}
          />
        );
      });

      it("has one input field", () => {
        expect(field.find('#root_period_0').length).toEqual(1);
        expect(field.find('#root_quarter1_0').length).toEqual(1);
        expect(field.find('#root_quarter2_0').length).toEqual(1);
        expect(field.find('#root_quarter3_0').length).toEqual(1);
        expect(field.find('#root_quarter4_0').length).toEqual(1);
      });

      it("renders an add button", () => {
        expect(field.find("[data-test='add-button']").length).toEqual(1);
      });

      it("does render a remove button", () => {
        expect(field.find("[data-test='remove-button-0']").length).toEqual(1);
      });
    });
  });
});
