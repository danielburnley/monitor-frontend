import SubmitBaseline from ".";

describe("SubmitBaseline", () => {
  let baselineGateway, presenterSpy;
  function getUseCase(success = true) {
    presenterSpy = { submissionSuccessful: jest.fn(), submissionUnsuccessful: jest.fn() }
    baselineGateway = { submit: jest.fn(async () => ({success})) };
    return new SubmitBaseline(baselineGateway);
  }
  describe('calls the project gateway', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1);
      expect(baselineGateway.submit).toHaveBeenCalledWith(1);
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565);
      expect(baselineGateway.submit).toHaveBeenCalledWith(25565);
    });
  });

  describe('calls creation success on success', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.submissionSuccessful).toHaveBeenCalledWith(1);
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.submissionSuccessful).toHaveBeenCalledWith(25565);
    });
  });

  describe('calls creation failure on failure', () => {
    it('example 1', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 1);
      expect(presenterSpy.submissionUnsuccessful).toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(false);
      await usecase.execute(presenterSpy, 25565);
      expect(presenterSpy.submissionUnsuccessful).toHaveBeenCalled();
    });
  });
});
