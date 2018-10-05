import GetReturns from ".";

describe("GetReturns", () => {
  let returnGateway, presenterSpy, useCase;

  describe("Given returns are found", () => {
    describe("Example one", () => {
      let foundReturns = {
        returns: [
          {
            id: 1,
            project_id: 1,
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          }
        ]
      };
      beforeEach(async () => {
        returnGateway = {
          getReturns: jest.fn(() => ({
            success: true,
            returns: foundReturns
          }))
        };
        presenterSpy = { presentReturns: jest.fn() };
        useCase = new GetReturns(returnGateway);

        await useCase.execute(presenterSpy, { projectId: 1 });
      });

      it("Passes the project ID to the gateway", () => {
        expect(returnGateway.getReturns).toBeCalledWith(1);
      });

      it("Calls the presenter with the response from the gateway", () => {
        expect(presenterSpy.presentReturns).toBeCalledWith({data: foundReturns});
      });
    });

    describe("Example one", () => {
      let foundReturns = {
        returns: [
          {
            id: 1,
            project_id: 7,
            status: "Draft",
            updates: [
              {
                changed: "Yes"
              }
            ]
          },
          {
            id: 2,
            project_id: 7,
            status: "Submitted",
            updates: [
              {
                changed: "Some"
              }
            ]
          }
        ]
      };
      beforeEach(async () => {
        returnGateway = {
          getReturns: jest.fn(() => ({
            success: true,
            returns: foundReturns
          }))
        };
        presenterSpy = { presentReturns: jest.fn() };
        useCase = new GetReturns(returnGateway);

        await useCase.execute(presenterSpy, { projectId: 7 });
      });

      it("Passes the project ID to the gateway", () => {
        expect(returnGateway.getReturns).toBeCalledWith(7);
      });

      it("Calls the presenter with the response from the gateway", () => {
        expect(presenterSpy.presentReturns).toBeCalledWith({data: foundReturns});
      });
    });
  });

  describe("Given returns are not found", () => {
    it("Calls the presenter with return not found", async () => {
      let foundReturns = {}
      returnGateway = {
        getReturns: jest.fn(() => ({
          success: false,
          returns: foundReturns
        }))
      };
      presenterSpy = {presentReturnNotFound: jest.fn()};
      useCase = new GetReturns(returnGateway);
      await useCase.execute(presenterSpy, {projectId: 404});

      expect(presenterSpy.presentReturnNotFound).toBeCalled();
    })
  });
});
