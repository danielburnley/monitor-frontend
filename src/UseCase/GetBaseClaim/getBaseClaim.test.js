import GetBaseClaim from '.';

describe('GetBaseClaim', () => {
  let claimGateway, presenterSpy, useCase;

  describe('Given a base claim is found', () => {
    describe('Example one', () => {
      beforeEach(async () => {
        claimGateway = {
          getBaseClaimFor: jest.fn(() => ({
            success: true,
            baseClaim: {cat: 'meow'},
          })),
        };
        presenterSpy = {presentClaim: jest.fn()};
        useCase = new GetBaseClaim(claimGateway);

        await useCase.execute(presenterSpy, {projectId: 1});
      });

      it('Passes the project ID to the gateway', () => {
        expect(claimGateway.getBaseClaimFor).toBeCalledWith(1);
      });

      it('Calls the presenter with the response from the gateway', () => {
        expect(presenterSpy.presentClaim).toBeCalledWith({cat: 'meow'});
      });
    });

    describe('Example two', () => {
      beforeEach(async () => {
        claimGateway = {
          getBaseClaimFor: jest.fn(() => ({
            success: true,
            baseClaim: {some: 'thing'},
          })),
        };
        presenterSpy = {presentClaim: jest.fn()};
        useCase = new GetBaseClaim(claimGateway);

        await useCase.execute(presenterSpy, {projectId: 5});
      });

      it('Passes the project ID to the gateway', () => {
        expect(claimGateway.getBaseClaimFor).toBeCalledWith(5);
      });

      it('Calls the presenter with the response from the gateway', () => {
        expect(presenterSpy.presentClaim).toBeCalledWith({some: 'thing'});
      });
    });
  });

  describe('Given a base claim is not returned', () => {
    it('Calls the presenter with return not found', async () => {
      claimGateway = {
        getBaseClaimFor: jest.fn(() => ({success: false, baseClaim: {}})),
      };
      presenterSpy = {presentClaimNotFound: jest.fn()};
      useCase = new GetBaseClaim(claimGateway);
      await useCase.execute(presenterSpy, {projectId: 404})

      expect(presenterSpy.presentClaimNotFound).toBeCalled();
    });
  });
});
