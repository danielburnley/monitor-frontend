import GetProjectOverview from ".";

describe("GetProjectOverview", () => {
  let presenterSpy, projectGatewaySpy, useCase;
  describe("Given the overview was not successfully found", () => {
    it("Calls presentFailure on the presenter", async () => {
      let presenterSpy = {
        presentOverview: jest.fn(),
        presentFailure: jest.fn()
      };

      let projectGatewaySpy = {
        overview: jest.fn(() => ({ success: false }))
      };

      useCase = new GetProjectOverview({
        projectGateway: projectGatewaySpy
      });

      await useCase.execute(presenterSpy, { projectId: 1 });

      expect(presenterSpy.presentFailure).toHaveBeenCalled();
    });
  });
  describe("Given the overview was successfully found", () => {
    describe("Example one", () => {
      beforeEach(async () => {
        presenterSpy = {
          presentOverview: jest.fn(),
          presentFailure: jest.fn()
        };

        projectGatewaySpy = {
          overview: jest.fn(() => ({
            success: true,
            overview: {
              name: "Cat",
              status: "Draft",
              type: "ac",
              data: { thisIs: "someData" },
              returns: [{ id: 1, status: "Draft" }],
              baselines: [{ id: 1, status: "Draft" }],
              claims: [{ id: 1, status: "Draft" }]
            }
          }))
        };

        useCase = new GetProjectOverview({
          projectGateway: projectGatewaySpy
        });

        await useCase.execute(presenterSpy, { projectId: 1 });
      });

      it("Gets the overview from the gateway", async () => {
        expect(projectGatewaySpy.overview).toHaveBeenCalledWith({
          projectId: 1
        });
      });

      it("Calls the presenter with the found data", () => {
        expect(presenterSpy.presentOverview).toHaveBeenCalledWith({
          name: "Cat",
          status: "Draft",
          type: "ac",
          data: { thisIs: "someData" },
          returns: [{ id: 1, status: "Draft" }],
          baselines: [{ id: 1, status: "Draft" }],
          claims: [{ id: 1, status: "Draft" }]
        });
      });
    });

    describe("Example two", () => {
      beforeEach(async () => {
        presenterSpy = {
          presentOverview: jest.fn(),
          presentFailure: jest.fn()
        };

        projectGatewaySpy = {
          overview: jest.fn(() => ({
            success: true,
            overview: {
              name: "Dog",
              status: "Submitted",
              type: "hif",
              data: { meow: "woof" },
              returns: [{ id: 1, status: "Draft" }],
              baselines: [{ id: 2, status: "Submitted" }],
              claims: [{ id: 3, status: "Submitted" }]
            }
          }))
        };

        useCase = new GetProjectOverview({
          projectGateway: projectGatewaySpy
        });

        await useCase.execute(presenterSpy, { projectId: 6 });
      });

      it("Gets the overview from the gateway", async () => {
        expect(projectGatewaySpy.overview).toHaveBeenCalledWith({
          projectId: 6
        });
      });

      it("Calls the presenter with the found data", () => {
        expect(presenterSpy.presentOverview).toHaveBeenCalledWith({
          name: "Dog",
          status: "Submitted",
          type: "hif",
          data: { meow: "woof" },
          returns: [{ id: 1, status: "Draft" }],
          baselines: [{ id: 2, status: "Submitted" }],
          claims: [{ id: 3, status: "Submitted" }]
        });
      });
    });
  });
});
