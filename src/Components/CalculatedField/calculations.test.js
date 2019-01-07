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
  validateArrayPropertyIsLessThan,
  periodTotal,
  setArrayVariance
} from ".";

describe("parseMoney()", () => {
  it("Returns 0 when given no value", () => {
    expect(parseMoney()).toEqual(0);
  });

  describe("Parses a formatted money value", () => {
    it("Example 1", () => {
      expect(parseMoney("$6.28")).toEqual(6.28);
    });

    it("Example 2", () => {
      expect(parseMoney("฿3.14")).toEqual(3.14);
    });
  });
});

describe("accumulateMoney()", () => {
  describe("Sums up the values in an array with properties", () => {
    it("Example 1", () => {
      expect(
        accumulateMoney([{operand: "2"}, {operand: "4"}, {operand: "8"}], 'operand')
      ).toEqual(14);
    });
  })
});

describe("set()", () => {
  it("Example 1", () => {
    let formData = {};
    set(formData, "result", "Done")
    expect(formData).toEqual({result: "Done"});
  });

  it("Example 2", () => {
    let formData = {parent: {}};
    set(formData["parent"], "output", "Done")
    expect(formData).toEqual({parent: {output: "Done"}});
  });
});

describe("get()", () => {
  describe("With a non-existent key", () => {
    it("Example 1", () => {
      let formData = {
        a: {
          b: "value"
        }
      };
      expect(get(formData, 'a','c')).toEqual(undefined);
    });

    it("Example 2", () => {
      let formData = {};
      expect(get(formData, 'e')).toEqual(undefined);
    });
  });

  describe("With an existing key", () => {
    it("Example 1", () => {
      let formData = {
        a: {
          b: "value"
        }
      };
      expect(get(formData, 'a','b')).toEqual("value");
    });

    it("Example 2", () => {
      let formData = {
        a: "data"
      };
      expect(get(formData, 'a')).toEqual("data");
    });
  });
});

describe("percentageDifference()", () => {
  it("Example 1", () => {
    expect(percentageDifference(0.75, 0.80)).toEqual(6.67);
  });

  it("Example 2", () => {
    expect(percentageDifference(0.75, 1)).toEqual(33.33);
  });
});

describe("calculateVariance()", () => {
  it("Example 1", () => {
    expect(calculateVariance(0.15, 0.50)).toEqual(30);
  });

  it("Example 2", () => {
    expect(calculateVariance(0.50, 0.75)).toEqual(66.67);
  });
});

describe("combineArrays()", () => {
  describe("With missing data", () => {
    it("Example 1", () => {
      expect(combineArrays([1,2,3])).toEqual([1,2,3]);
    });

    it("Example 2", () => {
      expect(combineArrays(undefined, [9,2,6,5])).toEqual([9, 2, 6, 5]);
    });
  });

  describe("With data", () => {
    it("Example 1", () => {
      expect(combineArrays([1,2,3], [4,5,6])).toEqual([1,2,3,4,5,6]);
    });

    it("Example 2", () => {
      expect(combineArrays([1,4,1,5], [9,2,6,5])).toEqual([1, 4, 1, 5, 9, 2, 6, 5]);
    });
  });
});

describe("sum()", () => {
  it("Example 1", () => {
    expect(
        sum({ augend: "15", addend: "14" }, "augend", "addend")
    ).toEqual(29);
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
      expect(secondsPassed("2000/08/25","2000/08/26")).toEqual(86400);
    });

    it("Example 2", () => {
      expect(secondsPassed("2000/08/24","2000/08/26")).toEqual(172800);
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
    setCreate(formData, ["my","data"], "Hello");
    expect(formData).toEqual({my: {data: "Hello"}});
  });

  it("Example 2", () => {
    let formData = {};
    setCreate(formData, ["info"], "Hi");
    expect(formData).toEqual({info: "Hi"});
  });
});

describe("validateArrayPropertyIsLessThan()", () => {
  describe("Valid", () => {
    it("Example 1", () => {
      let formData = [{main: "12"}];
      validateArrayPropertyIsLessThan(formData, ["main"], 20);
      expect(formData).toEqual([{"_valid": true, "main": "12"}]);
    });

    it("Example 2", () => {
      let formData = [{main: "13"}];
      validateArrayPropertyIsLessThan(formData, ["main"], 20);
      expect(formData).toEqual([{"_valid": true, "main": "13"}]);
    });
  });

  describe("Invalid", () => {
    it("Example 1", () => {
      let formData = [{main: "22"}];
      validateArrayPropertyIsLessThan(formData, ["main"], 19);
      expect(formData).toEqual([{"_valid": false, "main": "22"}]);
    });

    it("Example 2", () => {
      let formData = [{main: "24"}];
      validateArrayPropertyIsLessThan(formData, ["main"], 19);
      expect(formData).toEqual([{"_valid": false, "main": "24"}]);
    });
  });
});

describe("periodTotal()", () => {
  describe("With data", () => {
    it("Example 1", () => {
      let formData = {periods: [{Q1: "12", Q2: "8"}]};
      periodTotal(formData, ["total"], "periods", "Q1", "Q2");
      expect(formData).toEqual(
        {
          "periods": [
            {"Q1": "12", "Q2": "8", "total": "20"}
          ]
        }
      );
    });

    it("Example 2", () => {
      let formData = {per: [{Q3: "12", Q4: "8"}, {Q3: "32", Q4: "16"}]};
      periodTotal(formData, ["value"], "per", "Q3", "Q4");
      expect(formData).toEqual(
        {
          "per": [
            {"Q3": "12", "Q4": "8", "value": "20"},
            {"Q3": "32", "Q4": "16", "value": "48"}
          ]
        }
      );
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
      let originalArray = [{originalArrayProperty: "10"}, {originalArrayProperty: "20"}];
      let newArray = [{newArrayProperty: "20"}, {newArrayProperty: "40"}];
      setArrayVariance(originalArray, "originalArrayProperty", newArray, "newArrayProperty", "varianceField")
      expect(newArray).toEqual(
        [
          {"newArrayProperty": "20", "varianceField": 10},
          {"newArrayProperty": "40", "varianceField": 20}
        ]
      );
    });

    it("Example 2", () => {
      let originalArray = [{originalArrayProperty: "35"}, {originalArrayProperty: "64"}];
      let newArray = [{newArrayProperty: "25"}, {newArrayProperty: "25"}];
      setArrayVariance(originalArray, "originalArrayProperty", newArray, "newArrayProperty", "varianceField")
      expect(newArray).toEqual(
        [
          {"newArrayProperty": "25", "varianceField": -10},
          {"newArrayProperty": "25", "varianceField": -39}
        ]
      );
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
