import CanAccessProject from ".";

describe("CanAccessProject", () => {
  let tokenGatewaySpy = {
    getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
  };
  let useCase = new CanAccessProject(tokenGatewaySpy);

  it('Calls the token gateway', async () => {
    await useCase.execute("", 1)
    expect(tokenGatewaySpy.getApiKey).toBeCalledWith("", 1)
  });

  it('Calls the token gateway with an access token', async () => {
    await useCase.execute("Cats", 3)
    expect(tokenGatewaySpy.getApiKey).toBeCalledWith("Cats", 3)
  });

  describe('Given a valid token', () => {
    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
    };
    let useCase = new CanAccessProject(tokenGatewaySpy);

    it('returns the api key', async () => {
      expect((await useCase.execute("Doggos", 2)).apiKey).toEqual('Cats')
    });

  });

  describe('Given invalid token', () => {
    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => (null))
    };
    let useCase = new CanAccessProject(tokenGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("", 6)).valid).toEqual(false)
    });
  });
});
