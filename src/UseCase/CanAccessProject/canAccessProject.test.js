import CanAccessProject from ".";

describe("CanAccessProject", () => {
  let tokenGatewaySpy = {
    getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
  };
  let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};


  describe('Given a valid saved api key', () => {
    describe('example 1', () => {
      let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};

      let projectGatewaySpy = { findById:  jest.fn(async () => ({ success: true })) };
      let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyGatewaySpy, projectGatewaySpy);
      it('calls the api key gateway', async () => {
        await useCase.execute("", 1);
        expect(apiKeyGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getApiKey).not.toHaveBeenCalled();
      });

      it('calls the project gateway', async () => {
        await useCase.execute("", 1);
        expect(projectGatewaySpy.findById).toBeCalledWith(1);
        expect(tokenGatewaySpy.getApiKey).not.toHaveBeenCalled();
      });

      it('returns the api key', async () => {
        expect(await useCase.execute("",1)).toEqual({valid: true, apiKey: 'apikey'});
      });
    });
    describe('example 2', () => {
      let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'key'})), setApiKey: jest.fn()};

      let projectGatewaySpy = { findById:  jest.fn(async () => ({ success: true })) };
      let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyGatewaySpy, projectGatewaySpy);
      it('calls the api key gateway', async () => {
        await useCase.execute("", 6);
        expect(apiKeyGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getApiKey).not.toHaveBeenCalled();
      });

      it('calls the project gateway', async () => {
        await useCase.execute("", 6);
        expect(projectGatewaySpy.findById).toBeCalledWith(6);
        expect(tokenGatewaySpy.getApiKey).not.toHaveBeenCalled();
      });

      it('returns the api key', async () => {
        expect(await useCase.execute("",1)).toEqual({valid: true, apiKey: 'key'});
      });
    });
  });

  describe('Given a valid token', () => {
    let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};

    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
    };
    let projectGatewaySpy = { findById:  jest.fn(async () => ({ success: false })) };
    let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyGatewaySpy, projectGatewaySpy);

    it('Saves the new api key', async () => {
      await useCase.execute("", 1);
      expect(apiKeyGatewaySpy.setApiKey).toBeCalledWith('Cats');
    });

    it('Calls the token gateway', async () => {
      await useCase.execute("", 1);
      expect(tokenGatewaySpy.getApiKey).toBeCalledWith("", 1);
    });

    it('Calls the token gateway with an access token', async () => {
      await useCase.execute("Cats", 3);
      expect(tokenGatewaySpy.getApiKey).toBeCalledWith("Cats", 3);
    });

    it('returns the api key', async () => {
      expect((await useCase.execute("Doggos", 2)).apiKey).toEqual('Cats')
    });

  });

  describe('Given an invalid token and no valid saved api key', () => {
    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => (null))
    };
    let projectGatewaySpy = { findById:  jest.fn(async () => ({ success: false })) };
    let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyGatewaySpy, projectGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("", 6)).valid).toEqual(false)
    });
  });
});
