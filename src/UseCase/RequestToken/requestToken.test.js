import RequestToken from '.'

describe('requesting a new token', () => {
  let tokenGatewaySpy = {
    requestToken: jest.fn()
  };

  it('requests a token', async () => {
    let use_case = new RequestToken(tokenGatewaySpy);
    use_case.execute("cats@cathouse.com", 1, "http://localhost")
    expect(tokenGatewaySpy.requestToken).toHaveBeenCalledWith("cats@cathouse.com", 1, "http://localhost")
  })
});
