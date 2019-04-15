import {
  parseMoney,
  accumulateMoney,
  set,
  get,
  percentageDifference,
  calculateVariance,
  combineArrays,
  sum,
  weeksPassed,
  daysPassed,
  secondsPassed,
  setCreate,
  validateCumulativeArrayPropertyIsLessThan,
  validateDatesSequential,
  periodTotal,
  setArrayVariance,
  subtract,
  add,
  filterForNos,
  setArrayField,
  setInPreviousQuarter,
  path,
  date,
  select,
  sumArray
} from ".";

describe("sumArray()", () => {
  describe("Gets the sum of every value in an array", () => {
    it("Example 1", () => {
      let formData = ["1", "2", "3", "4", "5"];

      expect(sumArray(formData)).toEqual(15);
    });

    it("Example 2", () => {
      let formData = [1, 4, 1, 5, 9, 2, 6, 5];

      expect(sumArray(formData)).toEqual(33);
    });
  });

  it("Does nothing given undefined", () => {
    expect(sumArray(undefined)).toEqual(undefined);
  });
});

describe("select()", () => {
  describe("Returns the selected property", () => {
    it("Example 1", () => {
      let formData = [{item: 1, otherKey: 3}, {item: 2, otherKey: 3}];

      expect(select(formData, path('item'))).toEqual([1,2]);
    });

    it("Example 2", () => {
      let formData = [{myKey: { innerKey: 1 }}, {myKey: {innerKey: 4}}, {myKey: {innerKey: 1}}];

      expect(select(formData, path('myKey', 'innerKey'))).toEqual([1,4,1]);
    });
  });

  it("Does nothing given undefined", () => {
    expect(select(undefined)).toEqual(undefined);
  });
});

describe("date()", () => {
  describe("Returns a date object", () => {
    //https://stackoverflow.com/questions/55648881/2-identical-dates-in-different-formats-give-different-epoch-times/55648947
    it("Example 1", () => {
      let first_january_2019_epoch = new Date(2019, 0, 1).getTime();
      expect(date("2019")).toEqual(first_january_2019_epoch);
    });

    it("Example 2", () => {
      let first_september_1993_epoch = new Date(1993,8,1).getTime();
      expect(date("1993-09-01")).toEqual(first_september_1993_epoch);
    });
  });
});

describe("path()", () => {
  describe("Returns a list of path nodes", () => {
    it("Example 1", () => {
      expect(path("A","B","C","D")).toEqual(["A","B","C","D"]);
    });

    it("Example 2", () => {
      expect(path("A node", "Another node")).toEqual(["A node", "Another node"]);
    });
  });
});

describe("setArrayField()", () => {
  describe("Passes items which aren't arrays", () => {
    it("Returns null", () => {
      let newArray;
      setArrayField(null, ["property"], newArray, ["property"]);
      expect(newArray).toBeUndefined();
    });

    it("Returns null", () => {
      let newArray;
      setArrayField(
        { someObject: "What? this isnt supposed to be an object" },
        ["property"],
        newArray,
        ["property"]
      );
      expect(newArray).toBeUndefined();
    });
  });

  describe("Returns early without an error when field paths return undefined", () => {
    it("Example 1", () => {
      let array = [
        { property1: "1", property2: "2" },
        { property1: "3", property2: "4" }
      ];
      let newArray = setArrayField(
        array,
        undefined,
        [{ anUnrelatedProperty: "5" }],
        ["property1"]
      );
      expect(newArray).toBeUndefined();
    });

    it("Example 2", () => {
      let array = [
        { property1: "1", property2: "2" },
        { property1: "3", property2: "4" }
      ];
      let newArray = setArrayField(
        array,
        ["property1"],
        [{ anUnrelatedProperty: "5" }],
        undefined
      );
      expect(newArray).toBeUndefined();
    });
  });

  it("Example 1", () => {
    let array = [
      { property1: "1", property2: "2" },
      { property1: "3", property2: "4" }
    ];
    let newArray = setArrayField(array, ["property1"], undefined, [
      "differentproperty1"
    ]);
    expect(newArray).toEqual([
      { differentproperty1: "1" },
      { differentproperty1: "3" }
    ]);
  });

  it("Example 2", () => {
    let array = [
      { property1: "1", property2: "2" },
      { property1: "3", property2: "4" }
    ];
    let newArray = setArrayField(
      array,
      ["property1"],
      [{ anUnrelatedProperty: "5" }],
      ["property1"]
    );
    expect(newArray).toEqual([
      { property1: "1", anUnrelatedProperty: "5" },
      { property1: "3" }
    ]);
  });
});

describe("filterForNos()", () => {
  it("With no data", () => {
    expect(filterForNos(undefined)).toEqual([]);
  });

  describe("With data", () => {
    it("Example 1", () => {
      expect(
        filterForNos(
          [{ a: { b: "Yes" }, b: "we" }, { a: { b: "No" }, b: "e" }],
          ["a", "b"]
        )
      ).toEqual([{ a: { b: "No" }, b: "e" }]);
    });

    it("Example 2", () => {
      expect(
        filterForNos(
          [{ en: "Yes", gb: true }, { en: "Yes" }, { en: "No", gb: true }],
          ["en"]
        )
      ).toEqual([{ en: "No", gb: true }]);
    });
  });
});

describe("subtract()", () => {
  it("Example 1", () => {
    expect(subtract("5", "3")).toEqual("2");
  });

  it("Example 2", () => {
    expect(subtract("£127.26", "£789.34")).toEqual("-662.08");
  });
});

describe("add()", () => {
  it("Example 1", () => {
    expect(add("48", "52")).toEqual("100");
  });

  it("Example 2", () => {
    expect(add("$27896.34", "$8625.26")).toEqual("36521.6");
  });
});

describe("parseMoney()", () => {
  it("Returns 0 when given no value", () => {
    expect(parseMoney()).toEqual(0);
  });

  describe("Parses a formatted money value", () => {
    describe("Negative", () => {
      it("Example 1", () => {
        expect(parseMoney("-6.28")).toEqual(-6.28);
      });

      it("Example 2", () => {
        expect(parseMoney("-3.14")).toEqual(-3.14);
      });
    });

    describe("With invalid characters", () => {
      it("Example 1", () => {
        expect(parseMoney("$6.28")).toEqual(6.28);
      });

      it("Example 2", () => {
        expect(parseMoney("฿3.14")).toEqual(3.14);
      });
    });
  });
});

describe("accumulateMoney()", () => {
  describe("Sums up the values in an array with properties to 2 dp", () => {
    it("Example 1", () => {
      expect(
        accumulateMoney(
          [{ operand: "2" }, { operand: "4" }, { operand: "8" }],
          "operand",
          2
        )
      ).toEqual("14.00");
    });

    it("Example 1", () => {
      expect(
        accumulateMoney([{ operand: "0.1" }, { operand: "0.2" }], "operand", 2)
      ).toEqual("0.30");
    });
  });

  describe("Sums up the values in an array with properties to 0 dp", () => {
    it("Example 1", () => {
      expect(
        accumulateMoney(
          [{ operand: "2" }, { operand: "4" }, { operand: "8" }],
          "operand",
          0
        )
      ).toEqual("14");
    });

    it("Example 1", () => {
      expect(
        accumulateMoney([{ operand: "12345" }, { operand: "12345" }], "operand", 0)
      ).toEqual("24690");
    });
  });
});

describe("set()", () => {
  it("Example 1", () => {
    let formData = {};
    set(formData, "result", "Done");
    expect(formData).toEqual({ result: "Done" });
  });

  it("Example 2", () => {
    let formData = { parent: {} };
    set(formData["parent"], "output", "Done");
    expect(formData).toEqual({ parent: { output: "Done" } });
  });
});

describe("get()", () => {
  describe("With an array index", () => {
    it("Example 1", () => {
      let formData = {
        a: [
          {a: "value"},
          {somevalue: "my value"},
          {anothervalue: "more value"},
          {finalvalue: "final value"}
        ]
      };
      expect(get(formData, "a", -3)).toEqual({somevalue: "my value"});
    });

    it("Example 2", () => {
      let formData = {
        x: [
          {b: "First value"}, {b: "Last"}
        ]
      };
      expect(get(formData, "x", -1)).toEqual({b: "Last"});
    });
  });

  describe("With a non-existent key", () => {
    it("Example 1", () => {
      let formData = {
        a: {
          b: "value"
        }
      };
      expect(get(formData, "a", "c")).toEqual(undefined);
    });

    it("Example 2", () => {
      let formData = {};
      expect(get(formData, "e")).toEqual(undefined);
    });
  });

  describe("With an existing key", () => {
    it("Example 1", () => {
      let formData = {
        a: {
          b: "value"
        }
      };
      expect(get(formData, "a", "b")).toEqual("value");
    });

    it("Example 2", () => {
      let formData = {
        a: "data"
      };
      expect(get(formData, "a")).toEqual("data");
    });
  });

  describe("With a path enclosed in a double array", () => {
    it("Example 1", () => {
      let formData = {
        a: {
          b: "value"
        }
      };
      expect(get(formData, ["a", "b"])).toEqual("value");
    });

    it("Example 2", () => {
      let formData = {
        a: "data"
      };
      expect(get(formData, ["a"])).toEqual("data");
    });
  });
});

describe("percentageDifference()", () => {
  it("Example 1", () => {
    expect(percentageDifference(0.75, 0.8)).toEqual(6.67);
  });

  it("Example 2", () => {
    expect(percentageDifference(0.75, 1)).toEqual(33.33);
  });
});

describe("calculateVariance()", () => {
  it("Example 1", () => {
    expect(calculateVariance(0.15, 0.5)).toEqual(30);
  });

  it("Example 2", () => {
    expect(calculateVariance(0.5, 0.75)).toEqual(66.67);
  });
});

describe("combineArrays()", () => {
  describe("With missing data", () => {
    it("Example 1", () => {
      expect(combineArrays([1, 2, 3])).toEqual([1, 2, 3]);
    });

    it("Example 2", () => {
      expect(combineArrays(undefined, [9, 2, 6, 5])).toEqual([9, 2, 6, 5]);
    });
  });

  describe("With data", () => {
    it("Example 1", () => {
      expect(combineArrays([1, 2, 3], [4, 5, 6])).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("Example 2", () => {
      expect(combineArrays([1, 4, 1, 5], [9, 2, 6, 5])).toEqual([
        1,
        4,
        1,
        5,
        9,
        2,
        6,
        5
      ]);
    });
  });
});

describe("sum()", () => {
  it("Example 1", () => {
    expect(sum({ augend: "15", addend: "14" }, "augend", "addend")).toEqual(29);
  });

  it("Example 2", () => {
    expect(
      sum({ termA: "15", termB: "14", termC: "1" }, "termA", "termB", "termC")
    ).toEqual(30);
  });
});

describe("weeksPassed()", () => {
  it("Example 1", () => {
    expect(weeksPassed("2000/08/25", "2000/09/2")).toEqual(1);
  });

  it("Example 2", () => {
    expect(weeksPassed("2000/08/25", "2000/09/10")).toEqual(2);
  });
});

describe("daysPassed()", () => {
  it("Example 1", () => {
    expect(daysPassed("2000/08/25", "2000/09/2")).toEqual(8);
  });

  it("Example 2", () => {
    expect(daysPassed("2000/08/25", "2000/09/10")).toEqual(16);
  });
});

describe("secondsPassed()", () => {
  describe("Valid date", () => {
    it("Example 1", () => {
      expect(secondsPassed("2000/08/25", "2000/08/26")).toEqual(86400);
    });

    it("Example 2", () => {
      expect(secondsPassed("2000/08/24", "2000/08/26")).toEqual(172800);
    });
  });

  describe("Invalid date", () => {
    it("Example 1", () => {
      expect(secondsPassed("??", "??")).toEqual("");
    });

    it("Example 2", () => {
      expect(secondsPassed("!!", "!!")).toEqual("");
    });
  });
});

describe("setCreate()", () => {
  it("Example 1", () => {
    let formData = {};
    setCreate(formData, ["my", "data"], "Hello");
    expect(formData).toEqual({ my: { data: "Hello" } });
  });

  it("Example 2", () => {
    let formData = {};
    setCreate(formData, ["info"], "Hi");
    expect(formData).toEqual({ info: "Hi" });
  });
});

describe("validateCumulativeArrayPropertyIsLessThan()", () => {
  describe("Valid", () => {
    it("Example 1", () => {
      let formData = [
        { main: "12" },
        { main: "24" },
        { main: "78" }
      ];
      validateCumulativeArrayPropertyIsLessThan(formData, ["main"], 200);
      expect(formData).toEqual([
        { _valid: true, main: "12" },
        { _valid: true, main: "24" },
        { _valid: true, main: "78" }
      ]);
    });

    it("Example 2", () => {
      let formData = [{ main: "13" }];
      validateCumulativeArrayPropertyIsLessThan(formData, ["main"], 20);
      expect(formData).toEqual([{ _valid: true, main: "13" }]);
    });
  });

  describe("Invalid", () => {
    it("Example 1", () => {
      let formData = [
        { total: { main: "12" }, value1: 2 },
        { total: { main: "24" }, value1: 2 },
        { total: { main: "78" }, value1: 2 }
      ];
      validateCumulativeArrayPropertyIsLessThan(formData, ["total", "main"], 80);
      expect(formData).toEqual([
        { total: { _valid: false, main: "12" }, value1: 2},
        { total: { _valid: false, main: "24" }, value1: 2},
        { total: { _valid: false, main: "78" }, value1: 2}
      ]);
    });

    it("Example 2", () => {
      let formData = [{ main: "24" }];
      validateCumulativeArrayPropertyIsLessThan(formData, ["main"], 19);
      expect(formData).toEqual([{ _valid: false, main: "24" }]);
    });
  });
});

describe("validateDatesSequential", () => {
  describe("Valid", () => {
    it("Example 1", () => {
      let formData = { date1: "2010-01-01", date2Holder: {date2: "2010-01-07"}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"])
      expect(formData).toEqual({ date1: "2010-01-01", date2Holder: {date2: "2010-01-07", _valid: true}})
    });

    it("Example 2", () => {
      let formData = { date1: "2010-01-01", date2Holder: {date2: "2010-01-07"}, date3holder: {date3: "2010-01-14"}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"], ["date3holder", "date3"])
      expect(formData).toEqual({ date1: "2010-01-01", date2Holder: {date2: "2010-01-07", _valid: true}, date3holder: {date3: "2010-01-14", _valid: true}})
    })
  });

  describe("Empty but valid", () => {
    it("Example 1", () => {
      let formData = { date1: undefined, date2Holder: {date2: undefined}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"])
      expect(formData).toEqual({ date1: undefined, date2Holder: {date2: undefined, _valid: true}})
    })

    it("Example 2", () => {
      let formData = { date1: undefined, date2Holder: {date2: undefined}, date3Holder: {date3: undefined}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"], ["date3Holder", "date3"])
      expect(formData).toEqual({ date1: undefined, date2Holder: {date2: undefined, _valid: true}, date3Holder: {date3: undefined, _valid: true}})
    })
  });

  describe("Invalid", () => {
    it("Example 1", () => {
      let formData = { date1: "2010-01-01", date2Holder: {date2: "2009-01-07"}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"])
      expect(formData).toEqual({ date1: "2010-01-01", date2Holder: {date2: "2009-01-07", _valid: false}})
    });

    it("Example 2", () => {
      let formData = { date1: "2010-01-01", date2Holder: {date2: "2009-01-07"}, date3holder: {date3: "2010-01-14"}}
      validateDatesSequential(formData, ["date1"], ["date2Holder", "date2"], ["date3holder", "date3"])
      expect(formData).toEqual({ date1: "2010-01-01", date2Holder: {date2: "2009-01-07", _valid: false}, date3holder: {date3: "2010-01-14", _valid: true}})
    })
  });
});

describe("periodTotal()", () => {
  describe("With data", () => {
    it("Example 1", () => {
      let formData = { periods: [{ Q1: "12", Q2: "8" }] };
      periodTotal(formData, ["total"], "periods", "Q1", "Q2");
      expect(formData).toEqual({
        periods: [{ Q1: "12", Q2: "8", total: "20.00" }]
      });
    });

    it("Example 2", () => {
      let formData = {
        per: [{ Q3: "12", Q4: "8.111" }, { Q3: "32.333", Q4: "16" }]
      };
      periodTotal(formData, ["value"], "per", "Q3", "Q4");
      expect(formData).toEqual({
        per: [
          { Q3: "12", Q4: "8.111", value: "20.11" },
          { Q3: "32.333", Q4: "16", value: "48.33" }
        ]
      });
    });
  });

  describe("Without data", () => {
    it("Example 1", () => {
      let formData = {};
      periodTotal(formData, ["total"], "periods", "Q1", "Q2");
      expect(formData).toEqual({});
    });

    it("Example 2", () => {
      let formData = {};
      periodTotal(formData, ["value"], "per", "Q3", "Q4");
      expect(formData).toEqual({});
    });
  });
});

describe("setArrayVariance()", () => {
  describe("With data", () => {
    it("Example 1", () => {
      let originalArray = [
        { originalArrayProperty: "10" },
        { originalArrayProperty: "20" }
      ];
      let newArray = [{ newArrayProperty: "20" }, { newArrayProperty: "40" }];
      setArrayVariance(
        originalArray,
        "originalArrayProperty",
        newArray,
        "newArrayProperty",
        "varianceField"
      );
      expect(newArray).toEqual([
        { newArrayProperty: "20", varianceField: 10 },
        { newArrayProperty: "40", varianceField: 20 }
      ]);
    });

    it("Example 2", () => {
      let originalArray = [
        { originalArrayProperty: "35" },
        { originalArrayProperty: "64" }
      ];
      let newArray = [{ newArrayProperty: "25" }, { newArrayProperty: "25" }];
      setArrayVariance(
        originalArray,
        "originalArrayProperty",
        newArray,
        "newArrayProperty",
        "varianceField"
      );
      expect(newArray).toEqual([
        { newArrayProperty: "25", varianceField: -10 },
        { newArrayProperty: "25", varianceField: -39 }
      ]);
    });
  });

  describe("Without data", () => {
    it("Example 1", () => {
      setArrayVariance([]);
    });

    it("Example 2", () => {
      setArrayVariance(undefined, []);
    });
  });
});

describe("setInPreviousQuarter", () => {

  describe("Unsubmitted return data", () => {
    let RealDate
    beforeEach(() => {
      RealDate = Date
    });

    afterEach(() => {
      global.Date = RealDate
    });

    describe("Example 1", () => {
      it("sets the value into the correct quarter", () => {
        let fakeDate = new Date('03/01/2018')
        global.Date = jest.fn(() => fakeDate)
        let formData = {}
        setInPreviousQuarter(formData, {returnStatus: "Draft"}, 'cats', '456')

        expect(formData).toEqual({cats: {quarter3: '456' }})
      });
    });

    describe("Example 2", () => {
      it("sets the value into the correct quarter", () => {
        let fakeDate = new Date('11/01/2018')
        global.Date = jest.fn(() => fakeDate)
        let formData = {}
        setInPreviousQuarter(formData, {returnStatus: "Draft"}, 'cats', '456')

        expect(formData).toEqual({cats: {quarter2: '456' }})
      });
    });

    describe("Example 3", () => {
      it("sets the value into the correct quarter", () => {
        let fakeDate = new Date('07/01/2018')
        global.Date = jest.fn(() => fakeDate)
        let formData = {}
        setInPreviousQuarter(formData, {returnStatus: "Draft"}, 'cats', '456')

        expect(formData).toEqual({cats: {quarter1: '456' }})
      });
    });

    describe("Example 4", () => {
      it("sets the value into the correct quarter", () => {
        let fakeDate = new Date('04/01/2018')
        global.Date = jest.fn(() => fakeDate)
        let formData = {}
        setInPreviousQuarter(formData, {returnStatus: "Draft"}, 'cats', '456')

        expect(formData).toEqual({cats: {quarter4: '456' }})
      });
    });
  });

  describe("Submitted return data", () => {
    it("Wont change the formdata", () => {
      let formData = {}

      setInPreviousQuarter(formData, {returnStatus: "Submitted"}, "cats", "456")

      expect(formData).toEqual({})
    });
  });
});
