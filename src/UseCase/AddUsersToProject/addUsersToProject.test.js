import AddUsersToProject from ".";

describe("AddUsersToProject", () => {
  let projectGateway, presenterSpy;

  function getUseCase(success = true) {
    presenterSpy = { userAddedSuccess: jest.fn(), userAddedFailure: jest.fn() }
    projectGateway = { addUser: jest.fn(async () => ({success})) };
    return new AddUsersToProject(projectGateway);
  }


  describe("Calls the project gateway", async () => {
    it("Example 1", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 2, "a user");
      expect(projectGateway.addUser).toHaveBeenCalledWith(2, "a user");
    });

    it("Example 2", async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy,1, "different name");
      expect(projectGateway.addUser).toHaveBeenCalledWith(1, "different name");
    });
  });


  describe("Creation successful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase();
        await usecase.execute(presenterSpy, 2, "user");
        expect(presenterSpy.userAddedSuccess).toHaveBeenCalled();
        expect(presenterSpy.userAddedFailure).not.toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(true);
        await usecase.execute(presenterSpy,3, "using");
        expect(presenterSpy.userAddedSuccess).toHaveBeenCalled();
        expect(presenterSpy.userAddedFailure).not.toHaveBeenCalled();

      });
    });
  });

  describe("Creation unsuccessful", () => {
    describe("Calls the presenter", () => {
      it("Example 1", async () => {
        let usecase = getUseCase(false);
        await usecase.execute(presenterSpy, 1, "mr user");
        expect(presenterSpy.userAddedSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.userAddedFailure).toHaveBeenCalled();
      });

      it("Example 2", async () => {
        let usecase = getUseCase(false);
        await usecase.execute(presenterSpy, 3, "mrs user");
        expect(presenterSpy.userAddedSuccess).not.toHaveBeenCalled();
        expect(presenterSpy.userAddedFailure).toHaveBeenCalled();
      });
    });
  });
});
