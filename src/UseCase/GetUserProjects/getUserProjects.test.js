import GetUserProjects from '.';

describe('GetUserProjects', () => {
  let userGatewaySpy, useCase, presenterSpy, projectList;

  describe('Example 1', () => {
    beforeEach(() => {
      projectList = [
        {
          type: "hif",
          data: {
            projectName: "my name"
          },
          status: "baseline"
        }
      ]

      userGatewaySpy = {
        getProjects: jest.fn(() => ({
          success: true,
          projectList
        })),
      }
      presenterSpy = {presentProjectList: jest.fn()};

      useCase = new GetUserProjects(userGatewaySpy);
    });

    it("Calls the user gateway", async () => {
      await useCase.execute(presenterSpy)
      expect(userGatewaySpy.getProjects).toBeCalled();
    });

    it('Presents the project', async () => {
      await useCase.execute(presenterSpy);
      expect(presenterSpy.presentProjectList).toBeCalledWith(projectList);
    });
  });

  describe('Example 2', () => {
    beforeEach(() => {
      projectList = [
        {
          type: "ac",
          data: {
            projectName: "building houses"
          },
          status: "return ready"
        }
      ]

      userGatewaySpy = {
        getProjects: jest.fn(() => ({
          success: true,
          projectList
        })),
      }
      presenterSpy = {presentProjectList: jest.fn()};

      useCase = new GetUserProjects(userGatewaySpy);
    });

    it("Calls the user gateway", async () => {
      await useCase.execute(presenterSpy)
      expect(userGatewaySpy.getProjects).toBeCalled();
    });

    it('Presents the project', async () => {
      await useCase.execute(presenterSpy);
      expect(presenterSpy.presentProjectList).toBeCalledWith(projectList);
    });
  });
});