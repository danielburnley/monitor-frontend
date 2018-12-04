import UpdateProject from ".";

describe("UpdateProject", () => {
  let projectGateway, presenterSpy;
  function getUseCase(success = true, errors = []) {
    presenterSpy = { projectUpdated: jest.fn(), projectNotUpdated: jest.fn() }
    projectGateway = { update: jest.fn(async () => ({success, errors})) };
    return new UpdateProject(projectGateway);
  }
  describe('calls the project gateway', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1, {dog: "dog"}, "12");
      expect(projectGateway.update).toHaveBeenCalledWith(1, {dog: "dog"}, "12");
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565, {cat: "cat"}, "456");
      expect(projectGateway.update).toHaveBeenCalledWith(25565, {cat: "cat"}, "456");
    });
  });

  describe('calls creation success on success with any errors', () => {
    it('example 1', async () => {
      let usecase = getUseCase(true, ["error"]);
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.projectUpdated).toHaveBeenCalledWith(["error"]);
      expect(presenterSpy.projectNotUpdated).not.toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(true, 'another error');
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.projectUpdated).toHaveBeenCalledWith('another error');
      expect(presenterSpy.projectNotUpdated).not.toHaveBeenCalled();
    });
  });

  describe('calls creation failure on failure', () => {
    it('example 1', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 1);

      expect(presenterSpy.projectUpdated).not.toHaveBeenCalled();
      expect(presenterSpy.projectNotUpdated).toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 25565);

      expect(presenterSpy.projectUpdated).not.toHaveBeenCalled();
      expect(presenterSpy.projectNotUpdated).toHaveBeenCalled();
    });
  });
});
