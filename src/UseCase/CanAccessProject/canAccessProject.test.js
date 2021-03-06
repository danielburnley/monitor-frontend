import CanAccessProject from ".";

describe("CanAccessProject", () => {
  describe('Given a valid saved api key', () => {
    describe('example 1', () => {
      let apiKeyCookieGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: "Homes England"}}))
      };
      let userRoleGatewaySpy = { getUserRole: jest.fn(() => ({userRole: "Homes England"})), setUserRole: jest.fn() }
      let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Homes England" })) };
      let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyCookieGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

      it('calls the api key storage gateway', async () => {
        await useCase.execute("", 1);
        expect(apiKeyCookieGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('calls the api key gateway', async () => {
        await useCase.execute("", 1);
        expect(apiKeyGatewaySpy.check).toBeCalledWith(1);
      });


      it('Saves the user role', async () => {
        await useCase.execute("", 1);
        expect(userRoleGatewaySpy.setUserRole).toBeCalledWith("Homes England")
      });

      it('returns the api key and user role', async () => {
        expect(await useCase.execute("",1)).toEqual({
          valid: true,
          apiKey: "apikey",
          userRole: "Homes England"
        });
      });
    });
    describe('example 2', () => {
      let apiKeyCookieGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'key'})), setApiKey: jest.fn()};
      let tokenGatewaySpy = {
        getAccess: jest.fn(() => ({apiKey: {apiKey: 'Cats'}, userRole: {userRole: "Local Authority"}}))
      };
      let userRoleGatewaySpy = { getUserRole: jest.fn(()=> ({userRole: "Local Authority"})), setUserRole: jest.fn() }
      let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: true, role: "Local Authority" })) };
      let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyCookieGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

      it('calls the api key storage gateway', async () => {
        await useCase.execute("", 6);
        expect(apiKeyCookieGatewaySpy.getApiKey).toHaveBeenCalled();
        expect(tokenGatewaySpy.getAccess).not.toHaveBeenCalled();
      });

      it('Saves the user role', async () => {
        await useCase.execute("", 5);
        expect(userRoleGatewaySpy.setUserRole).toBeCalledWith("Local Authority")
      });

      it('calls the api key gateway', async () => {
        await useCase.execute("", 6);
        expect(apiKeyGatewaySpy.check).toBeCalledWith(6);
      });

      it('returns the api key', async () => {
        expect(await useCase.execute("",1)).toEqual({
          valid: true,
          apiKey: "key",
          userRole: "Local Authority"
        });
      });
    });
  });

  describe('Given a valid token', () => {
    let apiKeyCookieGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: 'apikey'})), setApiKey: jest.fn()};
    let userRoleGatewaySpy = { getUserRole: jest.fn(() => ({userRole: 'he'})), setUserRole: jest.fn()}
    let tokenGatewaySpy = {
      getAccess: jest.fn(() => ({apiKey: { apiKey: 'Cats'}, userRole: {userRole: 'he'}}))
    };
    let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: false })) };
    let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyCookieGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

    it('Saves the new api key', async () => {
      await useCase.execute("", 1);
      expect(apiKeyCookieGatewaySpy.setApiKey).toBeCalledWith('Cats');
    });

    it('Saves the user role', async () => {
      await useCase.execute("", 1);
      expect(userRoleGatewaySpy.setUserRole).toBeCalledWith('he')
    })

    it('Calls the token gateway', async () => {
      await useCase.execute("", 1);
      expect(tokenGatewaySpy.getAccess).toBeCalledWith("");
    });

    it('Calls the token gateway with an access token', async () => {
      await useCase.execute("Cats", 3);
      expect(tokenGatewaySpy.getAccess).toBeCalledWith("Cats");
    });

    it('returns the api key', async () => {
      expect((await useCase.execute("Doggos", 2)).apiKey).toEqual('Cats')
    });

    it('retuns the role', async () => {
      expect((await useCase.execute("Doggos", 2)).userRole).toEqual('he')
    });

  });

  describe('Given an invalid token and no valid saved api key', () => {
    let tokenGatewaySpy = {
      getAccess: jest.fn(() => (null))
    };
    let apiKeyCookieGatewaySpy = { getApiKey: jest.fn(() => ({apiKey: ''})), setApiKey: jest.fn()};
    let userRoleGatewaySpy = jest.fn()
    let apiKeyGatewaySpy = { check:  jest.fn(async () => ({ valid: false })) };
    let useCase = new CanAccessProject(tokenGatewaySpy, apiKeyCookieGatewaySpy, userRoleGatewaySpy, apiKeyGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("", 6)).valid).toEqual(false)
    });
  });
});
