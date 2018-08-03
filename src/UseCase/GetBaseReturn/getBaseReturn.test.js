import GetBaseReturnForProject from '.';

describe('GetBaseReturnForProject', () => {
  let returnGateway, presenterSpy, useCase;

  describe('Given a base return is found', () => {
    describe('Example one', () => {
      beforeEach(() => {
        returnGateway = {
          baseReturnFor: jest.fn(() => ({
            success: true,
            foundReturn: {cat: 'meow'},
          })),
        };
        presenterSpy = {presentReturn: jest.fn()};
        useCase = new GetBaseReturnForProject(returnGateway);

        useCase.execute(presenterSpy, {projectId: 1});
      });

      it('Passes the project ID to the gateway', () => {
        expect(returnGateway.baseReturnFor).toBeCalledWith(1);
      });

      it('Calls the presenter with the response from the gateway', () => {
        expect(presenterSpy.presentReturn).toBeCalledWith({cat: 'meow'});
      });
    });

    describe('Example two', () => {
      beforeEach(() => {
        returnGateway = {
          baseReturnFor: jest.fn(() => ({
            success: true,
            foundReturn: {some: 'thing'},
          })),
        };
        presenterSpy = {presentReturn: jest.fn()};
        useCase = new GetBaseReturnForProject(returnGateway);

        useCase.execute(presenterSpy, {projectId: 5});
      });

      it('Passes the project ID to the gateway', () => {
        expect(returnGateway.baseReturnFor).toBeCalledWith(5);
      });

      it('Calls the presenter with the response from the gateway', () => {
        expect(presenterSpy.presentReturn).toBeCalledWith({some: 'thing'});
      });
    });
  });

  describe('Given a base return is not found', () => {
    it('Calls the presenter with return not found', () => {
      returnGateway = {
        baseReturnFor: jest.fn(() => ({success: false, foundReturn: {}})),
      };
      presenterSpy = {presentReturnNotFound: jest.fn()};
      useCase = new GetBaseReturnForProject(returnGateway);
      useCase.execute(presenterSpy, {projectId: 404})

      expect(presenterSpy.presentReturnNotFound).toBeCalled();
    });
  });
});
