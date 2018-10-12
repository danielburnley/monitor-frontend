import SubmitProject from ".";

describe("SubmitProject", () => {
  let projectGateway, presenterSpy;
  function getUseCase(success = true) {
    presenterSpy = { creationSuccess: jest.fn(), creationFailure: jest.fn() }
    projectGateway = { submit: jest.fn(async () => ({success})) };
    return new SubmitProject(projectGateway);
  }
  describe('calls the project gateway', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1);
      expect(projectGateway.submit).toHaveBeenCalledWith(1);
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565);
      expect(projectGateway.submit).toHaveBeenCalledWith(25565);
    });
  });

  describe('calls creation success on success', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(1);
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.creationSuccess).toHaveBeenCalledWith(25565);
    });
  });

  describe('calls creation failure on failure', () => {
    it('example 1', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.creationFailure).toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.creationFailure).toHaveBeenCalled();
    });
  });
});
