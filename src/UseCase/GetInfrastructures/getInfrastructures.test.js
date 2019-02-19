import GetInfrastructures from '.';

describe('GetInfrastructures', () => {
  let projectGatewaySpy;

  function getUseCase(infrastructures) {
    projectGatewaySpy = {
      getInfrastructures: jest.fn(() => ({
        success: true,
        infrastructures,
      })),
    };

    return new GetInfrastructures(projectGatewaySpy);
  }

  describe('Given a project is successfully found', () => {
    describe('Example one', () => {
      let infrastructures, useCase;

      beforeEach(() => {
        infrastructures = [{
          data: { someData: "about cats", moreData: "about dogs" }
        }];

        useCase = getUseCase(infrastructures);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentInfrastructures: jest.fn()};
        await useCase.execute(presenterSpy, 1);
        expect(projectGatewaySpy.getInfrastructures).toBeCalledWith(1);
      });

      it('Presents the infrastructures', async () => {
        let presenterSpy = {presentInfrastructures: jest.fn()};
        await useCase.execute(presenterSpy, 1);
        expect(presenterSpy.presentInfrastructures).toBeCalledWith(infrastructures);
      });
    });

    describe('Example two', () => {
      let infrastructures, useCase;

      beforeEach(() => {
        infrastructures = [
          {
            data: {aboutInfra1: "data"}
          },
          {
            data: {aboutNumber2: "different data"}
          }
        ]

        useCase = getUseCase(infrastructures);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentInfrastructures: jest.fn()};
        await useCase.execute(presenterSpy, 5);
        expect(projectGatewaySpy.getInfrastructures).toBeCalledWith(5);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentInfrastructures: jest.fn()};
        await useCase.execute(presenterSpy, 5);
        expect(presenterSpy.presentInfrastructures).toBeCalledWith(infrastructures);
      });
    });
  });

  describe('Given a project is not found', () => {
    it('Presents the project not found', async () => {
      let projectGatewaySpy = {
        getInfrastructures: jest.fn(() => ({success: false})),
      };
      let useCase = new GetInfrastructures(projectGatewaySpy);
      let presenterSpy = {presentProjectNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {id: 5});
      expect(presenterSpy.presentProjectNotFound).toBeCalled();
    });
  });
});
