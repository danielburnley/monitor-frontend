import Periods from "../../../test/PeriodsField";
import FieldFake from "../../../test/FieldFake";

describe("Period Financials", () => {
    describe("Example 1", () => {
      let periods, uiSchema, schema, data;
      beforeEach(() => {
        data = [
          { period: "Fluffy", age: "12" },
          { period: "sparkles", age: "5" }
        ];
        schema = {
          periods: true,
          title: "cats",
          type: "Array",
          items: {
            type: "object",
            properties: {
              period: {
                type: "string",
                title: "Cat Name"
              },
              age: {
                type: "string",
                title: "Cat Age"
              }
            }
          }
        };
        uiSchema = {
          "ui:options": {
            "addable": true
          },
          items: {
            period: {"ui": "readonly"}
          }
        }
        periods = new Periods(data, schema, uiSchema);
      });

      it("renders the schema field", () => {
        expect(periods.schemaField().length).toEqual(4)
      });

      it("passes the registry to the schema field", () => {
        expect(periods.schemaFieldProperty(0, 'registry')).toEqual({fields: {SchemaField: FieldFake, anotherField: FieldFake}})
      });

      it("passes the uiSchema to the schema field", () => {
        expect(periods.schemaFieldProperty(0, 'uiSchema')).toEqual({"ui": "readonly"})
      });

      it("passes the schema to the schema field with the titles striped", () => {
          expect(periods.schemaFieldProperty(0, 'schema')).toEqual({
            type: "string",
            title: ""
          })
      });

      it("Displays the titles", () => {
        expect(periods.lineTitle(0)).toEqual("Cat Name");
        expect(periods.lineTitle(1)).toEqual("Cat Age");
      });

      it("Displays the data", () => {
        expect(periods.inputFieldValue(0, "period")).toEqual("Fluffy");
        expect(periods.inputFieldValue(1, "period")).toEqual("sparkles");
        expect(periods.inputFieldValue(0, "age")).toEqual("12");
        expect(periods.inputFieldValue(1, "age")).toEqual("5");
      });

      it("Displays an input field", () => {
        expect(periods.inputFieldCount("age")).toEqual(2);
      });

      it("Calls the onChange method passed in with the form data", () => {
        expect(periods.changeInputField(0, "age", "45"));

        expect(periods.onChangeSpy).toHaveBeenCalledWith([
          { age: "45", period: "Fluffy" },
          { age: "5", period: "sparkles" }
        ]);
      });

      it("Displays an add button", () => {
        expect(periods.addButton()).toEqual(1);
      });

      it("Pressing add increases input fields", () => {
        periods.pressAdd();
        expect(periods.inputFieldCount("age")).toEqual(3);
      });

      it("Displays a remove button", () => {
        expect(periods.removeButton()).toEqual(1);
      });
    });

    describe("Example 2", () => {
      let periods, data, schema, uiSchema;
      beforeEach(() => {
        data = [
          { quarter: "scaley", length: "200" },
          { quarter: "slivery", length: "567" },
          { quarter: "slivery", length: "567" }
        ];
        schema = {
          type: "array",
          items: {
            type: "object",
            properties: {
              quarter: {
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
        uiSchema = {
          "ui:options": {
            "addable": false
          },
          items: { length: {pretty: "long"} }
        }
        periods = new Periods(data, schema, uiSchema);
      });

      it("renders the schema field", () => {
        expect(periods.schemaField().length).toEqual(6)
      });

      it("passes the registry to the schema field", () => {
        expect(periods.schemaFieldProperty(0, 'registry')).toEqual({fields: {SchemaField: FieldFake, anotherField: FieldFake}})
      });

      it("passes the uiSchema to the schema field", () => {
        expect(periods.schemaFieldProperty(3, 'uiSchema')).toEqual({pretty: "long"})
      });

      it("Displays the title", () => {
        expect(periods.lineTitle(0)).toEqual("Lizard Type");
        expect(periods.lineTitle(1)).toEqual("How Long");
      });

      it("Displays the data", () => {
        expect(periods.inputFieldValue(0, "quarter")).toEqual("scaley");
        expect(periods.inputFieldValue(1, "quarter")).toEqual("slivery");
        expect(periods.inputFieldValue(0, "length")).toEqual("200");
        expect(periods.inputFieldValue(1, "length")).toEqual("567");
      });

      it("passes the schema to the schema field with the titles striped", () => {
        expect(periods.schemaFieldProperty(3, 'schema')).toEqual({
          type: "string",
          title: "",
          readonly: true
        })
      });

      it("Does not display an add button", () => {
        expect(periods.addButton()).toEqual(0);
      });

      it("Does not display a remove button", () => {
        expect(periods.removeButton()).toEqual(0);
      });
    });
  });

