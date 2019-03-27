import GetClaims from ".";

describe("GetClaims", () => {
  let claimGateway, presenterSpy, useCase;

  describe("Given returns are found", () => {
    describe("Example one", () => {
      let claims = [
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
      beforeEach(async () => {
        claimGateway = {
          getClaims: jest.fn(() => ({
            success: true,
            claims: claims
          }))
        };
        presenterSpy = { presentClaims: jest.fn() };
        useCase = new GetClaims(claimGateway);

        await useCase.execute(presenterSpy, { projectId: 1 });
      });

      it("Passes the project ID to the gateway", () => {
        expect(claimGateway.getClaims).toBeCalledWith(1);
      });

      it("Calls the presenter with the response from the gateway", () => {
        expect(presenterSpy.presentClaims).toBeCalledWith(claims);
      });
    });

    describe("Example one", () => {
      let claims =  [
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
      beforeEach(async () => {
        claimGateway = {
          getClaims: jest.fn(() => ({
            success: true,
            claims: claims
          }))
        };
        presenterSpy = { presentClaims: jest.fn() };
        useCase = new GetClaims(claimGateway);

        await useCase.execute(presenterSpy, { projectId: 7 });
      });

      it("Passes the project ID to the gateway", () => {
        expect(claimGateway.getClaims).toBeCalledWith(7);
      });

      it("Calls the presenter with the response from the gateway", () => {
        expect(presenterSpy.presentClaims).toBeCalledWith(claims);
      });
    });
  });

  describe("Given returns are not found", () => {
    it("Calls the presenter with return not found", async () => {
      let claims = {}
      claimGateway = {
        getClaims: jest.fn(() => ({
          success: false,
          returns: claims
        }))
      };
      presenterSpy = {presentClaimsNotFound: jest.fn()};
      useCase = new GetClaims(claimGateway);
      await useCase.execute(presenterSpy, {projectId: 404});

      expect(presenterSpy.presentClaimsNotFound).toBeCalled();
    })
  });
});
