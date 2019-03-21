import CanAccessMonitor from ".";

describe("CanAccessMonitor", () => {
  describe('Given a valid saved api key', () => {
    describe('example 1', () => {
      let apiKeyStorageGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: "Homes England"}}))
      };
      let userRoleGatewaySpy = { setUserRole: jest.fn() }
      let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Homes England" })) };
      let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyStorageGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyStorageGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('Saves the user role', async () => {
        await useCase.execute("", 1);
        expect(userRoleGatewaySpy.setUserRole).toBeCalledWith("Homes England")
      });

      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyGatewaySpy.check).toBeCalledWith();
      });

      it('returns the api key and user role', async () => {
        expect(await useCase.execute("")).toEqual({
          valid: true,
          apiKey: "apikey",
          userRole: "Homes England"
        });
      });
    });

    describe('example 2', () => {
      let apiKeyStorageGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'key'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: "Local Authority"}}))
      };
      let userRoleGatewaySpy = { setUserRole: jest.fn() }
      let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Local Authority" })) };
      let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyStorageGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyStorageGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('calls the api key gateway', async () => {
        await useCase.execute("");
        expect(apiKeyGatewaySpy.check).toBeCalledWith();
      });

      it('Saves the user role', async () => {
        await useCase.execute("");
        expect(userRoleGatewaySpy.setUserRole).toBeCalledWith("Local Authority");
      });

      it('returns the api key', async () => {
        expect(await useCase.execute("")).toEqual({valid: true, apiKey: 'key', userRole: "Local Authority"});
      });
    });
  });

  describe('Given a valid token', () => {
    let apiKeyStorageGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: null})), setApiKey: jest.fn()};
    let userRoleGatewaySpy = { getUserRole: jest.fn(() => ({userRole: 'he'})), setUserRole: jest.fn()}
    let tokenGatewaySpy = {
      getAccess: jest.fn(() => ({apiKey: { apiKey: 'Cats'}, userRole: {userRole: 'he'}}))
    };
    let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Local Authority" })) };
    let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyStorageGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

    it('Saves the new api key', async () => {
      await useCase.execute("");
      expect(apiKeyStorageGatewaySpy.setApiKey).toBeCalledWith('Cats');
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
    let apiKeyStorageGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: ''})), setApiKey: jest.fn()};
    let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Local Authority" })) };
    let userRoleGatewaySpy = jest.fn()
    let useCase = new CanAccessMonitor(tokenGatewaySpy, apiKeyStorageGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("")).valid).toEqual(false)
    });
  });
});
