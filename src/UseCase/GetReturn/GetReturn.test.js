import GetReturn from '.';

describe('GetReturn', () => {
  let returnGatewaySpy;

  function getUseCase(foundReturn) {
    returnGatewaySpy = {
      findById: jest.fn(() => ({
        success: true,
        foundReturn,
      })),
    };
    return new GetReturn(returnGatewaySpy);
  }

  describe('Given a return is successfully found', () => {
    describe('Example one', () => {
      let foundReturn, useCase;

      beforeEach(() => {
        foundReturn = {
          type: 'hif',
          data: {
            cat: 'meow',
          },
          schema: { cow: 'scema' }
        };

        useCase = getUseCase(foundReturn);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentReturn: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1, projectId: 2});
        expect(returnGatewaySpy.findById).toBeCalledWith(1, 2);
      });

      it('Presents the return', async () => {
        let presenterSpy = {presentReturn: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1, projectId: 2});
        expect(presenterSpy.presentReturn).toBeCalledWith(foundReturn);
      });
    });

    describe('Example two', () => {
      let foundReturn, useCase;

      beforeEach(() => {
        foundReturn = {
          type: 'abc',
          data: {
            dog: 'woof',
          },
          schema: {wolf: 'Awoo'}
        };

        useCase = getUseCase(foundReturn);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentReturn: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5, projectId: 6});
        expect(returnGatewaySpy.findById).toBeCalledWith(5, 6);
      });

      it('Presents the return', async () => {
        let presenterSpy = {presentReturn: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5, projectId: 6});
        expect(presenterSpy.presentReturn).toBeCalledWith(foundReturn);
      });
    });
  });

  describe('Given a return is not found', () => {
    it('Presents the return not found', async () => {
      let returnGatewaySpy = {
        findById: jest.fn(() => ({success: false})),
      };
      let useCase = new GetReturn(returnGatewaySpy);
      let presenterSpy = {presentReturnNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {id: 5, projectId: 6});
      expect(presenterSpy.presentReturnNotFound).toBeCalled();
    });
  });
});
