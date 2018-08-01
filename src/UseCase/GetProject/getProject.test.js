import GetProject from '.';

describe('GetProject', () => {
  let projectGatewaySpy;

  function getUseCase(foundProject) {
    projectGatewaySpy = {
      findById: jest.fn(() => ({
        success: true,
        foundProject,
      })),
    };

    return new GetProject(projectGatewaySpy);
  }

  describe('Given a project is successfully found', () => {
    describe('Example one', () => {
      let foundProject, useCase;

      beforeEach(() => {
        foundProject = {
          type: 'hif',
          data: {
            cat: 'meow',
          },
          schema: {cows: 'moo'}
        };

        useCase = getUseCase(foundProject);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentProject: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1});
        expect(projectGatewaySpy.findById).toBeCalledWith(1);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentProject: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1});
        expect(presenterSpy.presentProject).toBeCalledWith(foundProject);
      });
    });

    describe('Example two', () => {
      let foundProject, useCase;

      beforeEach(() => {
        foundProject = {
          type: 'abc',
          data: {
            dog: 'woof',
          },
          schema: {cows: 'moo'}
        };

        useCase = getUseCase(foundProject);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentProject: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5});
        expect(projectGatewaySpy.findById).toBeCalledWith(5);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentProject: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5});
        expect(presenterSpy.presentProject).toBeCalledWith(foundProject);
      });
    });
  });

  describe('Given a project is not found', () => {
    it('Presents the project not found', async () => {
      let projectGatewaySpy = {
        findById: jest.fn(() => ({success: false})),
      };
      let useCase = new GetProject(projectGatewaySpy);
      let presenterSpy = {presentProjectNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {id: 5});
      expect(presenterSpy.presentProjectNotFound).toBeCalled();
    });
  });
});
