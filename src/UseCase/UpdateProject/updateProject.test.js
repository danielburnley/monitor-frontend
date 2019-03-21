import UpdateProject from ".";

describe("UpdateProject", () => {
  let projectGateway, presenterSpy;
  function getUseCase(success = true, errors = [], new_timestamp = 0) {
    presenterSpy = { projectUpdated: jest.fn(), projectNotUpdated: jest.fn() }
    projectGateway = { update: jest.fn(async () => ({success, errors, new_timestamp})) };
    return new UpdateProject(projectGateway);
  }
  describe('calls the project gateway', () => {
    it('example 1', async () => {
      let usecase = getUseCase();
      let request = {projectId: 1, data: {dog: "dog"}, timestamp: "12"}
      await usecase.execute(presenterSpy, request);
      expect(projectGateway.update).toHaveBeenCalledWith(1, {dog: "dog"}, "12");
    });
    it('example 2', async () => {
      let usecase = getUseCase();
      let request = {projectId: 25565, data: {cat: "cat"}, timestamp: "456"}
      await usecase.execute(presenterSpy, request);
      expect(projectGateway.update).toHaveBeenCalledWith(25565, {cat: "cat"}, "456");
    });
  });

  describe('calls creation success on success with any errors and timestamp', () => {
    it('example 1', async () => {
      let usecase = getUseCase(true, ["error"], "456");
      let request = {projectId: 1, data: null, timestamp: null}
      await usecase.execute(presenterSpy, request);
      expect(presenterSpy.projectUpdated).toHaveBeenCalledWith(["error"], "456");
      expect(presenterSpy.projectNotUpdated).not.toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(true, 'another error', "234");
      let request = {projectId: 25565, data: null, timestamp: null}
      await usecase.execute(presenterSpy, request);
      expect(presenterSpy.projectUpdated).toHaveBeenCalledWith('another error', "234");
      expect(presenterSpy.projectNotUpdated).not.toHaveBeenCalled();
    });
  });

  describe('calls creation failure on failure', () => {
    it('example 1', async () => {
      let usecase = getUseCase(false);
      let request = {projectId: 1, data: null, timestamp: null}
      await usecase.execute(presenterSpy, request);

      expect(presenterSpy.projectUpdated).not.toHaveBeenCalled();
      expect(presenterSpy.projectNotUpdated).toHaveBeenCalled();
    });
    it('example 2', async () => {
      let usecase = getUseCase(false);
      let request = {projectId: 25565, data: null, timestamp: null}
      await usecase.execute(presenterSpy, 25565);

      expect(presenterSpy.projectUpdated).not.toHaveBeenCalled();
      expect(presenterSpy.projectNotUpdated).toHaveBeenCalled();
    });
  });
});
