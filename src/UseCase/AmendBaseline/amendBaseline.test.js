import AmendBaseline from ".";

describe("AmendBaseline", () => {
  let presenterSpy;
  beforeEach(() => {
    presenterSpy = { amendProjectSuccess: jest.fn(), amendProjectFailure: jest.fn() }
  });

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
        data: {},
        timestamp: 3
      })
      expect(baselineGatewaySpy.amend).toHaveBeenCalledWith(3, {}, 3);
    });

    it("calls the presenter with the id, errors and timestamp passed from the gateway", () => {
      amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {},
        timestamp: 3
      })
      expect(presenterSpy.amendProjectSuccess).toHaveBeenCalledWith({
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
        data: {},
        timestamp: 3
      })
      expect(baselineGatewaySpy.amend).toHaveBeenCalledWith(3, {}, 3);
    });

    it("calls the presenter with the id passed from the gateway", () => {
      amendBaseline.execute(presenterSpy, {
        projectId: 3,
        data: {},
        timestamp: 3
      })
      expect(presenterSpy.amendProjectSuccess).toHaveBeenCalledWith({
        baselineId: 7,
        errors: ['incorrect_timestamp'],
        timestamp: 12345
      });
    });
  });

  describe("Gateway returns unsuccessful", () => {
    let amendBaseline, baselineGatewaySpy;
    beforeEach(() => {
      baselineGatewaySpy = {
        amend: jest.fn((project_id, data, timestamp) => ({
          success: false
        }))
      }
      amendBaseline = new AmendBaseline(baselineGatewaySpy)
    });

    it("Calls the failure function on the presenter", () => {
      amendBaseline.execute(presenterSpy, { projectId: 1, data: {}, timestamp: 1})
      expect(presenterSpy.amendProjectFailure).toHaveBeenCalled();
    });
  });
});
