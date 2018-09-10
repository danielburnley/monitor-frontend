import ValidateReturn from ".";

describe('ValidateReturn', () => {
  let validationGatewaySpy, presenterSpy;

  function getUseCase(valid = true, invalid_paths = []) {
    validationGatewaySpy = {
      validate: jest.fn(() => ({ valid, invalid_paths }))
    };

    presenterSpy = {
      invalidateFields: jest.fn()
    };

    return new ValidateReturn(validationGatewaySpy,presenterSpy);
  }

  describe('example 1', () => {
    it('calls the validation gateway', () => {
      let schema = {
        cats: 'meow'
      }

      let useCase = getUseCase();
      useCase.execute(schema);
      expect(validationGatewaySpy.validate).toBeCalledWith(schema);
    });

    it('calls the presenter with the invalid paths', () => {
      let schema = {
        cats: 'meow'
      }

      let useCase = getUseCase();
      useCase.execute(schema);
      expect(presenterSpy.invalidateFields).toBeCalledWith([]);
    });
  });

  describe('example 2', () => {
    it('calls the validation gateway', () => {
      let schema = {
        dogs: 'woof'
      }

      let useCase = getUseCase();
      useCase.execute(schema);
      expect(validationGatewaySpy.validate).toBeCalledWith(schema);
    });

    it('calls the presenter with the invalid paths', () => {
      let schema = {
        dogs: 'woof'
      }

      let useCase = getUseCase(false, ['dogs']);
      useCase.execute(schema);
      expect(presenterSpy.invalidateFields).toBeCalledWith(['dogs']);
    });
  });
});
