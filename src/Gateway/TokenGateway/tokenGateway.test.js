import nock from 'nock';
import TokenGateway from '.';
import { access } from 'fs';

describe('token gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Example 1', () => {
    describe('Requesting a token', () => {
      it('Requests a token from the API', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/request', {email_address: 'cats@cathouse.com', project_id: 1})
          .reply(200);
        let gateway = new TokenGateway();
        await gateway.requestToken('cats@cathouse.com', 1);
        expect(accessInfoRequest.isDone()).toBeTruthy()
      })
    })

    describe('Given a token', () => {
      it('passes the token', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(202, {apiKey: 'Dogs', userRole: 'HE'});
        let gateway = new TokenGateway();
        let access_info = await gateway.getAccess('Cats', 1);
        expect(accessInfoRequest.isDone()).toBeTruthy()
      })

      it('returns an api key', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let access_info = await gateway.getAccess('Cats', 1);
        expect(access_info.apiKey.apiKey).toEqual('Dogs')
      });

      it('returns a user role', async() => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(202, {apiKey: 'Dogs', userRole: "6"});
        let gateway = new TokenGateway();
        let access_info = await gateway.getAccess('Cats', 1);
        expect(access_info.userRole.userRole).toEqual("6")
      })
    });

    describe('Given no token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(400);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getAccess('Cats', 1);
        expect(apiKey).toEqual(null)
      })
    })

    describe('Given an invalid token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 1})
          .reply(403);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getAccess('Cats', 1);
        expect(apiKey).toEqual(null)
      })
    })
  })

  describe('example 2', () => {
    describe('Requesting a token', () => {
      it('Requests a token from the API', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/request', {email_address: 'cats@cathouse.com', project_id: 8})
          .reply(200);
        let gateway = new TokenGateway();
        await gateway.requestToken('cats@cathouse.com', 8);
        expect(accessInfoRequest.isDone()).toBeTruthy()
      })
    })

    describe('Given a token', () => {
      it('passes the token', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let apiKey = await gateway.getAccess('Cats', 8);
        expect(accessInfoRequest.isDone()).toBeTruthy()
      })

      it('returns an api key', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(202, {apiKey: 'Dogs'});
        let gateway = new TokenGateway();
        let access_info = await gateway.getAccess('Cats', 8);
        expect(access_info.apiKey.apiKey).toEqual('Dogs')
      });
    });

    describe('Given no token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(400);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getAccess('Cats', 8);
        expect(apiKey).toEqual(null)
      })
    })

    describe('Given an invalid token', () => {
      it('returns null', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        let accessInfoRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/token/expend', {access_token: 'Cats', project_id: 8})
          .reply(403);
        let gateway = new TokenGateway();
        let apiKey = await gateway.getAccess('Cats', 8);
        expect(apiKey).toEqual(null)
      })
    })
  })
});
