import ValidateReturn from ".";

describe('ValidateReturn', () => {
  let validationGatewaySpy, presenterSpy;

  presenterSpy = {
    invalidateFields: jest.fn()
  };

  function getUseCase(valid = true, prettyInvalidPaths = []) {
    validationGatewaySpy = {
      validate: jest.fn(async () => ({ valid, prettyInvalidPaths }))
    };

    return new ValidateReturn(validationGatewaySpy);
  }

  describe('example 1', () => {
    it('calls the validation gateway', async () => {
      let data = {
        cats: 'meow'
      }

      let type = 'hif';
      let project_id = 1;
      let useCase = getUseCase();
      await useCase.execute(presenterSpy, project_id, data, type);
      expect(validationGatewaySpy.validate).toBeCalledWith(project_id, data, type);
    });

    it('calls the presenter with the invalid paths', async () => {
      let data = {
        cats: 'meow'
      }
      let useCase = getUseCase(false, ['cats']);
      let project_id = 1;

      await useCase.execute(presenterSpy, project_id, data);
      expect(presenterSpy.invalidateFields).toBeCalledWith(['cats']);
    });
  });

  describe('example 2', () => {
    it('calls the validation gateway', async () => {
      let data = {
        dogs: 'woof'
      }

      let type = 'ac';
      let project_id = 3;
      let useCase = getUseCase();
      await useCase.execute(presenterSpy, project_id, data, type);
      expect(validationGatewaySpy.validate).toBeCalledWith(project_id, data, type);
    });

    it('calls the presenter with the invalid paths', async () => {
      let data = {
        dogs: 'woof'
      }

      let project_id = 3;

      let useCase = getUseCase(false, ['dogs']);
      await useCase.execute(presenterSpy, project_id, data);
      expect(presenterSpy.invalidateFields).toBeCalledWith(['dogs']);
    });
  });
});
