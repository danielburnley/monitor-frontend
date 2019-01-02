import {parseMoney, accumulateMoney, set, get, percentageDifference} from ".";
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
