import nock from 'nock';
import TokenGateway from '.';

describe('token gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Example 1', () => {
    describe('Requesting a token', () => {
      it('Requests a token from the API', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/request', {email_address: 'cats@cathouse.com', project_id: 1})
          .reply(200);
        let gateway = new TokenGateway();
        await gateway.requestToken('cats@cathouse.com', 1);
        expect(apiKeyRequest.isDone()).toBeTruthy()
      })
    })

    describe('Given a token', () => {
      it('passes the token', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 1);
        expect(apiKeyRequest.isDone()).toBeTruthy()
      })

      it('returns an api key', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 1);
        expect(apiKey.apiKey).toEqual('Dogs')
      });
    });

    describe('Given no token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(400);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 1);
        expect(apiKey).toEqual(null)
      })
    })

    describe('Given an invalid token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(403);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 1);
        expect(apiKey).toEqual(null)
      })
    })
  })

  describe('example 2', () => {
    describe('Requesting a token', () => {
      it('Requests a token from the API', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/request', {email_address: 'cats@cathouse.com', project_id: 8})
          .reply(200);
        let gateway = new TokenGateway();
        await gateway.requestToken('cats@cathouse.com', 8);
        expect(apiKeyRequest.isDone()).toBeTruthy()
      })
    })

    describe('Given a token', () => {
      it('passes the token', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 8);
        expect(apiKeyRequest.isDone()).toBeTruthy()
      })

      it('returns an api key', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 8);
        expect(apiKey.apiKey).toEqual('Dogs')
      });
    });

    describe('Given no token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(400);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 8);
        expect(apiKey).toEqual(null)
      })
    })

    describe('Given an invalid token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let apiKeyRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(403);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getApiKey('Cats', 8);
        expect(apiKey).toEqual(null)
      })
    })
  })
});
