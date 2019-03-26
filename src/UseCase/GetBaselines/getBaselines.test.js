import GetBaselines from '.';

describe('GetBaselines', () => {
  let baselineGatewaySpy;

  function getUseCase(foundBaseline) {
    baselineGatewaySpy = {
      getAllBaselines: jest.fn(() => ({
        success: true,
        baselines: [foundBaseline]
      })),
    };

    return new GetBaselines(baselineGatewaySpy);
  }

  describe('Given a project is successfully found', () => {
    describe('Example one', () => {
      let foundBaseline, useCase;

      beforeEach(() => {
        foundBaseline = {
          type: 'hif',
          data: {
            cat: 'meow',
          },
          schema: {cows: 'moo'}
        };

        useCase = getUseCase(foundBaseline);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentBaselines: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1});
        expect(baselineGatewaySpy.getAllBaselines).toBeCalledWith(1);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentBaselines: jest.fn()};
        await useCase.execute(presenterSpy, {id: 1});
        expect(presenterSpy.presentBaselines).toBeCalledWith([foundBaseline]);
      });
    });

    describe('Example two', () => {
      let foundBaseline, useCase;

      beforeEach(() => {
        foundBaseline = {
          type: 'abc',
          data: {
            dog: 'woof',
          },
          schema: {cows: 'moo'}
        };

        useCase = getUseCase(foundBaseline);
      });

      it('Calls the gateway with the correct ID', async () => {
        let presenterSpy = {presentBaselines: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5});
        expect(baselineGatewaySpy.getAllBaselines).toBeCalledWith(5);
      });

      it('Presents the project', async () => {
        let presenterSpy = {presentBaselines: jest.fn()};
        await useCase.execute(presenterSpy, {id: 5});
        expect(presenterSpy.presentBaselines).toBeCalledWith([foundBaseline]);
      });
    });
  });

  describe('Given the baseline are not found', () => {
    it('Presents the project not found', async () => {
      let baselineGatewaySpy = {
        getAllBaselines: jest.fn(() => ({success: false})),
      };
      let useCase = new GetBaselines(baselineGatewaySpy);
      let presenterSpy = {presentBaselinesNotFound: jest.fn()};
      await useCase.execute(presenterSpy, {id: 5});
      expect(presenterSpy.presentBaselinesNotFound).toBeCalled();
    });
  });
});
