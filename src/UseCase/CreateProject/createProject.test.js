import CreateProject from ".";

describe("CreateProject", () => {
  let projectGateway, presenterSpy;

  function getUseCase(success = true, id = 1) {
    presenterSpy = { creationSuccess: jest.fn(), creationFailure: jest.fn() }
    projectGateway = { create: jest.fn(() => ({id: {id: id}, success})) };
    return new CreateProject(projectGateway);
  }


  describe("Calls the project gateway", async () => {
    it("Example 1", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, "name", "type");
      expect(projectGateway.create).toHaveBeenCalledWith("name", "type");
    });

    it("Example 2", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, "different name", "2");
      expect(projectGateway.create).toHaveBeenCalledWith("different name","2");
    });
  });


  describe("Creation successful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase();
        await usecase.execute(presenterSpy, "name", "type");
        expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(1);
        expect(presenterSpy.creationFailure).not.toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(true, 9);
        await usecase.execute(presenterSpy, "name", "type");
        expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(9);
        expect(presenterSpy.creationFailure).not.toHaveBeenCalled();

      });
    });
  });

  describe("Creation unsuccessful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase(false, 86);
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.creationFailure).toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(false, 42);
        await usecase.execute(presenterSpy, {});
        expect(presenterSpy.creationSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.creationFailure).toHaveBeenCalled();
      });
    });
  });
});
