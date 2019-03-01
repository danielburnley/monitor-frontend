import GetClaim from '.';

describe('GetClaim', () => {
  let claimGatewaySpy;

  function getUseCase(foundClaim) {
    claimGatewaySpy = {
      findById: jest.fn(() => ({
        success: true,
        foundClaim,
      })),
    };
    return new GetClaim(claimGatewaySpy);
  }

  describe('Given a claim is successfully found', () => {
    describe('Example one', () => {
      let foundClaim, useCase;

      beforeEach(() => {
        foundClaim = {
          type: 'hif',
          data: {
            claim: 'cat',
          },
          schema: { moo: 'duck' }
        };

        useCase = getUseCase(foundClaim);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentClaim: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1, projectId: 2});
        expect(claimGatewaySpy.findById).toBeCalledWith(1, 2);
      });

      it('Presents the claim', async () => {
        let presenterSpy = {presentClaim: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1, projectId: 2});
        expect(presenterSpy.presentClaim).toBeCalledWith(foundClaim);
      });
    });

    describe('Example two', () => {
      let foundClaim, useCase;

      beforeEach(() => {
        foundClaim = {
          type: 'abc',
          data: {
            duck: 'quack',
          },
          schema: {wolf: 'Awoo'}
        };

        useCase = getUseCase(foundClaim);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentClaim: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5, projectId: 6});
        expect(claimGatewaySpy.findById).toBeCalledWith(5, 6);
      });

      it('Presents the claim', async () => {
        let presenterSpy = {presentClaim: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5, projectId: 6});
        expect(presenterSpy.presentClaim).toBeCalledWith(foundClaim);
      });
    });
  });

  describe('Given a claim is not found', () => {
    it('Presents the claim not found', async () => {
      let claimGatewaySpy = {
        findById: jest.fn(() => ({success: false})),
      };
      let useCase = new GetClaim(claimGatewaySpy);
      let presenterSpy = {presentClaimNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {id: 5, projectId: 6});
      expect(presenterSpy.presentClaimNotFound).toBeCalled();
    });
  });
});
