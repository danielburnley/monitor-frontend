import CreateProject from ".";

describe("CreateProject", () => {
  let projectGateway, presenterSpy;
  function getUseCase(id = 1, status = "success") {
    presenterSpy = { creationSuccess: jest.fn(), creationFailure: jest.fn() }
    projectGateway = { create: jest.fn(async () => ({id, status})) };
    return new CreateProject(projectGateway);
  }


  describe("Calls the project gateway", async () => {
    it("Example 1", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, {});
      expect(projectGateway.create).toHaveBeenCalledWith({});
    });
    it("Example 2", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, {cathouse: "Cats"});
      expect(projectGateway.create).toHaveBeenCalledWith({cathouse: "Cats"});
    });
  });


  describe("Creation successful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase();
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(1);
        expect(presenterSpy.creationFailure).not.toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(9);
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(9);
        expect(presenterSpy.creationFailure).not.toHaveBeenCalled();

      });
    });
  });

  describe("Creation unsuccessful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase(86, "failure");
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.creationFailure).toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(42, "failure");
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.creationFailure).toHaveBeenCalled();
      });
    });
  });


});
