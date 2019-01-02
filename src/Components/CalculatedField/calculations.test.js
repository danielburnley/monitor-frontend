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
  validateArrayPropertyIsLessThan
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
  it("Example 1", () => {
    expect(combineArrays([1,2,3], [4,5,6])).toEqual([1,2,3,4,5,6]);
  });

  it("Example 2", () => {
    expect(combineArrays([1,4,1,5], [9,2,6,5])).toEqual([1, 4, 1, 5, 9, 2, 6, 5]);
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
  it("Example 1", () => {
    expect(secondsPassed("2000/08/25","2000/08/26")).toEqual(86400);
  });

  it("Example 2", () => {
    expect(secondsPassed("2000/08/24","2000/08/26")).toEqual(172800);
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
