import UpdateProject from ".";

describe("UpdateProject", () => {
  let projectGateway, presenterSpy;
  function getUseCase(success = true) {
    presenterSpy = { projectUpdated: jest.fn(), projectNotUpdated: jest.fn() }
    projectGateway = { update: jest.fn(async () => ({success})) };
    return new UpdateProject(projectGateway);
  }
  describe('calls the project gateway', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1, {dog: "dog"});
      expect(projectGateway.update).toHaveBeenCalledWith(1, {dog: "dog"});
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565, {cat: "cat"});
      expect(projectGateway.update).toHaveBeenCalledWith(25565, {cat: "cat"});
    });
  });

  describe('calls creation success on success', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.projectUpdated).toHaveBeenCalled();
      expect(presenterSpy.projectNotUpdated).not.toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.projectUpdated).toHaveBeenCalled();
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
