import CanAccessProject from ".";

describe("CanAccessProject", () => {
  let tokenGatewaySpy = {
    getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
  };
  let useCase = new CanAccessProject(tokenGatewaySpy);

  it('Calls the token gateway', async () => {
    await useCase.execute("")
    expect(tokenGatewaySpy.getApiKey).toBeCalledWith("")
  });

  it('Calls the token gateway with an access token', async () => {
    await useCase.execute("Cats")
    expect(tokenGatewaySpy.getApiKey).toBeCalledWith("Cats")
  });

  describe('Given a valid token', () => {
    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => ({apiKey: 'Cats'}))
    };
    let useCase = new CanAccessProject(tokenGatewaySpy);

    it('returns the api key', async () => {
      expect((await useCase.execute("Doggos")).apiKey).toEqual('Cats')
    });

  });

  describe('Given invalid token', () => {
    let tokenGatewaySpy = {
      getApiKey: jest.fn(() => (null))
    };
    let useCase = new CanAccessProject(tokenGatewaySpy);

    it('Given empty string as access token it returns false', async () => {
      expect((await useCase.execute("")).valid).toEqual(false)
    });
  });
});
