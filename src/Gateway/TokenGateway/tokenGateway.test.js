import nock from 'nock';
import TokenGateway from '.';

describe('token gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Requesting a token', () => {
    it('Requests a token from the API', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      let apiKeyRequest = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .post('/token/request', {email_address: 'cats@cathouse.com'})
        .reply(200);
      let gateway = new TokenGateway();
      await gateway.requestToken('cats@cathouse.com');
      expect(apiKeyRequest.isDone()).toBeTruthy()
    })
  })

  describe('Given a token', () => {
    it('passes the token', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      let apiKeyRequest = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .post('/token/expend', {access_token: 'Cats'})
        .reply(202, {apiKey: 'Dogs'});
      let gateway = new TokenGateway();
      let apiKey = await gateway.getApiKey('Cats');
      expect(apiKeyRequest.isDone()).toBeTruthy()
    })

    it('returns an api key', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      let apiKeyRequest = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .post('/token/expend', {access_token: 'Cats'})
        .reply(202, {apiKey: 'Dogs'});
      let gateway = new TokenGateway();
      let apiKey = await gateway.getApiKey('Cats');
      expect(apiKey.apiKey).toEqual('Dogs')
    });
  });

  describe('Given no token', () => {
    it('returns null', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      let apiKeyRequest = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .post('/token/expend', {access_token: 'Cats'})
        .reply(400);
      let gateway = new TokenGateway();
      let apiKey = await gateway.getApiKey('Cats');
      expect(apiKey).toEqual(null)
    })
  })

  describe('Given an invalid token', () => {
    it('returns null', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      let apiKeyRequest = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .post('/token/expend', {access_token: 'Cats'})
        .reply(403);
      let gateway = new TokenGateway();
      let apiKey = await gateway.getApiKey('Cats');
      expect(apiKey).toEqual(null)
    })
  })
});
