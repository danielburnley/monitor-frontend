import {
  parseMoney,
  accumulateMoney,
  set,
  get,
  percentageDifference,
  calculateVariance,
  combineArrays,
  sum
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
    expect(combineArrays([1,4,1,5],[9,2,6,5])).toEqual([1, 4, 1, 5, 9, 2, 6, 5]);
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
