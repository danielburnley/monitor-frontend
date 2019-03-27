import AmendBaseline from ".";

describe("AmendBaseline", () => {
  let presenterSpy;
  beforeEach(() => {
    presenterSpy = { amendBaselineSuccess: jest.fn(), amendBaselineFailure: jest.fn() }
  });

  describe("Amendment succesful", () => {
    describe("example one", () => {
    let amendBaseline, baselineGatewaySpy;
    beforeEach(() => {
      baselineGatewaySpy = {
        amend: jest.fn((project_id, data, timestamp) => ({
          success: true,
          baselineId: 5,
          errors: [],
          timestamp: 45656
        }))
      }
      amendBaseline = new AmendBaseline(baselineGatewaySpy)
    });

    it("Calls the baseline gateway with the project id, data and timestamp", () => {
      amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {cat: "meowmeowmeow"},
        timestamp: 3
      })
      expect(baselineGatewaySpy.amend).toHaveBeenCalledWith(3, {cat: "meowmeowmeow"}, 3);
    });

    it("calls the presenter with the id, errors and timestamp passed from the gateway", async () => {
      await amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {cow: "moooo"},
        timestamp: 3
      });

      expect(presenterSpy.amendBaselineSuccess).toHaveBeenCalledWith({
        baselineId: 5,
        errors: [],
        timestamp: 45656
      });
    });
  });

    describe("example two", () => {
    let amendBaseline, baselineGatewaySpy;
    beforeEach(() => {
      baselineGatewaySpy = {
        amend: jest.fn((project_id, data, timestamp) => ({
          success: true,
          baselineId: 7,
          errors: ['incorrect_timestamp'],
          timestamp: 12345
        }))
      }
      amendBaseline = new AmendBaseline(baselineGatewaySpy)
    });

    it("Calls the baseline gateway with the project id, data and timestamp", () => {
      amendBaseline.execute(presenterSpy,{
        projectId: 3,
        data: {duck: "quackity quack"},
        timestamp: 3
      })
      expect(baselineGatewaySpy.amend).toHaveBeenCalledWith(3, {duck: "quackity quack"}, 3);
    });

    it("calls the presenter with the id passed from the gateway", async () => {
      await amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {snake: "hsssssss"},
        timestamp: 3
      });

      expect(presenterSpy.amendBaselineSuccess).toHaveBeenCalledWith({
        baselineId: 7,
        errors: ['incorrect_timestamp'],
        timestamp: 12345
      });
    });
  });
  });

  it("Amendment unsuccessful", () => {
    let amendBaseline, baselineGatewaySpy;
    beforeEach(() => {
      baselineGatewaySpy = {
        amend: jest.fn((project_id, data, timestamp) => ({
          success: false
        }))
      }
      amendBaseline = new AmendBaseline(baselineGatewaySpy)
    });

    it("does not call the presenter", async () => {
      await amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {cow: "moooo"},
        timestamp: 3
      });

      expect(presenterSpy.amendBaselineSuccess).not.toHaveBeenCalled();
    });
  });
});
