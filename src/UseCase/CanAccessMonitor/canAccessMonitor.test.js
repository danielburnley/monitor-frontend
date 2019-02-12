import CanAccessMonitor from ".";

describe("CanAccessMonitor", () => {
  describe('Given a valid saved api key', () => {
    describe('example 1', () => {
      let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: '3'}}))
      };
      let userRoleGatewaySpy = { getUserRole: jest.fn(()=> ({userRole: '3'})) }
      let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyGatewaySpy, userRoleGatewaySpy);
      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('calls the user role gateway', async () => {
        await useCase.execute("", 1);
        expect(userRoleGatewaySpy.getUserRole).toHaveBeenCalled();
      });

      it('returns the api key and user role', async () => {
        expect(await useCase.execute("")).toEqual({
          valid: true,
          apiKey: 'apikey',
          userRole: '3'
        });
      });
    });
    describe('example 2', () => {
      let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'key'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: '5'}}))
      };
      let userRoleGatewaySpy = { getUserRole: jest.fn(()=> ({userRole: '5'})) }
      let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyGatewaySpy, userRoleGatewaySpy);
      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('calls the project gateway', async () => {
        await useCase.execute("");
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('returns the api key', async () => {
        expect(await useCase.execute("")).toEqual({valid: true, apiKey: 'key', userRole: '5'});
      });
    });
  });

  describe('Given a valid token', () => {
    let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: null})), setApiKey: jest.fn()};
    let userRoleGatewaySpy = { getUserRole: jest.fn(() => ({userRole: 'he'})), setUserRole: jest.fn()}
    let tokenGatewaySpy = {
      getAccess: jest.fn(() => ({apiKey: { apiKey: 'Cats'}, userRole: {userRole: 'he'}}))
    };
    let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyGatewaySpy, userRoleGatewaySpy);

    it('Saves the new api key', async () => {
      await useCase.execute("");
      expect(apiKeyGatewaySpy.setApiKey).toBeCalledWith('Cats');
    });

    it('Saves the user role', async () => {
      await useCase.execute("");
      expect(userRoleGatewaySpy.setUserRole).toBeCalledWith('he')
    })

    it('Calls the token gateway', async () => {
      await useCase.execute("");
      expect(tokenGatewaySpy.getAccess).toBeCalledWith("");
    });

    it('Calls the token gateway with an access token', async () => {
      await useCase.execute("Cats");
      expect(tokenGatewaySpy.getAccess).toBeCalledWith("Cats");
    });

    it('returns the api key', async () => {
      expect((await useCase.execute("Doggos")).apiKey).toEqual('Cats')
    });

    it('retuns the role', async () => {
      expect((await useCase.execute("Doggos")).userRole).toEqual('he')
    });

  });

  describe('Given an invalid token and no valid saved api key', () => {
    let tokenGatewaySpy = {
      getAccess: jest.fn(() => (null))
    };
    let apiKeyGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: ''})), setApiKey: jest.fn()};
    let userRoleGatewaySpy = jest.fn()
    let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyGatewaySpy, userRoleGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("")).valid).toEqual(false)
    });
  });
});
