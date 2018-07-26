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
        };

        useCase = getUseCase(foundProject);
      });

      it('Calls the gateway with the correct ID', () => {
        let presenterSpy = {presentProject: jest.fn()};
        useCase.execute(presenterSpy, {id: 1});
        expect(projectGatewaySpy.findById).toBeCalledWith(1);
      });

      it('Presents the project', () => {
        let presenterSpy = {presentProject: jest.fn()};
        useCase.execute(presenterSpy, {id: 1});
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
        };

        useCase = getUseCase(foundProject);
      });

      it('Calls the gateway with the correct ID', () => {
        let presenterSpy = {presentProject: jest.fn()};
        useCase.execute(presenterSpy, {id: 5});
        expect(projectGatewaySpy.findById).toBeCalledWith(5);
      });

      it('Presents the project', () => {
        let presenterSpy = {presentProject: jest.fn()};
        useCase.execute(presenterSpy, {id: 5});
        expect(presenterSpy.presentProject).toBeCalledWith(foundProject);
      });
    });
  });

  describe('Given a project is not found', () => {
    it('Presents the project not found', () => {
      let projectGatewaySpy = {
        findById: jest.fn(() => ({success: false})),
      };
      let useCase = new GetProject(projectGatewaySpy);
      let presenterSpy = {presentProjectNotFound: jest.fn()};
      useCase.execute(presenterSpy, {id: 5});
      expect(presenterSpy.presentProjectNotFound).toBeCalled();
    });
  });
});


