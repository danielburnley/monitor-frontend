import Logout from ".";

describe("Logout", () => {
  let cookieApiKeyGatewaySpy, presenterSpy;

  beforeEach(() => {
    cookieApiKeyGatewaySpy = {clear: jest.fn()};
    presenterSpy = {userLoggedOut: jest.fn()};
  });

  it("Calls the cookie api key gateway", () => {
    let usecase = new Logout(cookieApiKeyGatewaySpy);
    usecase.execute(presenterSpy);
    expect(cookieApiKeyGatewaySpy.clear).toHaveBeenCalled();
  });

  it("Calls the presenter after logging out", () => {
    let usecase = new Logout(cookieApiKeyGatewaySpy);
    usecase.execute(presenterSpy);
    expect(presenterSpy.userLoggedOut).toHaveBeenCalled();
  });
});
