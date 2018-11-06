import ShowCookieConsent from '.';

describe("ShowCookieConsent", () => {
  it("Shows cookie consent", async () => {
    let presenterSpy = {show: jest.fn()};
    let gatewayStub = {setConsent: jest.fn(), getConsent: jest.fn(async () => ({consent: false}))};
    let useCase = new ShowCookieConsent(gatewayStub);
    await useCase.execute(presenterSpy);
    expect(gatewayStub.getConsent).toHaveBeenCalled();
    expect(gatewayStub.setConsent).toHaveBeenCalledWith(true);
    expect(presenterSpy.show).toHaveBeenCalled();
  });

  it("Doesn't show cookie consent", async () => {
    let presenterSpy = {show: jest.fn()};
    let gatewayStub = {setConsent: jest.fn(), getConsent: jest.fn(async () => ({consent: true}))};
    let useCase = new ShowCookieConsent(gatewayStub);
    await useCase.execute(presenterSpy);
    expect(gatewayStub.getConsent).toHaveBeenCalled();
    expect(gatewayStub.setConsent).not.toHaveBeenCalled();
    expect(presenterSpy.show).not.toHaveBeenCalled();
  });
});
