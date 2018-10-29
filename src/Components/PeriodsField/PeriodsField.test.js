import Periods from "../../../test/PeriodsField"


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
      let periods = new Periods(data, schema);
      it("Displays the titles", () => {
        expect(periods.lineTitle(0)).toEqual("Cat Name");
        expect(periods.lineTitle(1)).toEqual("Cat Age");
      });

      it("Displays the data", () => {
        expect(periods.lineData(0, "period")).toEqual("Fluffy");
        expect(periods.lineData(1, "period")).toEqual("sparkles");
        expect(periods.lineData(0, "age")).toEqual("12");
        expect(periods.lineData(1, "age")).toEqual("5");
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
      let periods = new Periods(data, schema);
      it("Displays the title", () => {
        expect(periods.lineTitle(0)).toEqual("Lizard Type")
        expect(periods.lineTitle(1)).toEqual("How Long")
      });

      it("Displays the data", () => {
        expect(periods.lineData(0, "period")).toEqual("scaley")
        expect(periods.lineData(1, "period")).toEqual("slivery")
        expect(periods.lineData(0, "length")).toEqual("200")
        expect(periods.lineData(1, "length")).toEqual("567")
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
      let periods = new Periods(data, schema);

      it("Displays the correct title", () => {
        expect(periods.lineTitle(1)).toEqual("Dog Age");
      });

      it("Displays an input field", () => {
        expect(periods.inputFieldCount("age")).toEqual(2)
      });

      it("Calls the onChange method passed in with the form data", () => {
        expect(periods.changeInputField(0, "age", "45"))

        expect(periods.onChangeSpy).toHaveBeenCalledWith([
          { age: "45", period: "Fluffy" },
          { age: "5", period: "sparkles" }
        ]);
      });

      it("Prepopulates form data", () => {
        expect(periods.inputFieldValue(1, "age")).toEqual("5")
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
      let periods = new Periods(data, schema);

      it("Displays the correct title", () => {
        expect(periods.lineTitle(1)).toEqual("How Long");
      });

      it("Displays an input field", () => {
        expect(periods.inputFieldCount("length")).toEqual(3)
      });

      it("Calls the onChange method passed in with the form data", () => {
        periods.changeInputField(0, "length", "45")
        
        expect(periods.onChangeSpy).toHaveBeenCalledWith([
          { period: "scaley", length: "45" },
          { period: "slivery" },
          { period: "shiny", length: "2" }
        ]);
      });

      it("Prepopulates form data", () => {
        expect(periods.inputFieldValue(2, "length")).toEqual("2")
        });
    });
  });
});
