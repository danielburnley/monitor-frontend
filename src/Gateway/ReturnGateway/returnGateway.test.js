import nock from 'nock';
import ReturnGateway from '.';

describe('Return Gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Given a Return is found', () => {
    let returnRequest, response;

    describe('Example one', () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        returnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .get('/return/1')
          .reply(200, {some: 'data'});
        let gateway = new ReturnGateway();
        response = await gateway.findById(1);
      });

      it('Fetches the return from the API', () => {
        expect(returnRequest.isDone()).toBeTruthy();
      });

      it('Returns the response from the api', () => {
        expect(response).toEqual({success: true, foundReturn: {some: 'data'}});
      });
    });

    describe('Example two', () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let returnRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/return/5')
          .reply(200, {other: 'things'});
        let gateway = new ReturnGateway();
        response = await gateway.findById(5);
      });

      it('Fetches the return from the API', () => {
        expect(returnRequest.isDone()).toBeTruthy();
      });

      it('Returns the response from the api', () => {
        expect(response).toEqual({
          success: true,
          foundReturn: {other: 'things'},
        });
      });
    });
  });

  describe('Given a return is not found', () => {
    it('Returns unsuccessful', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
      let returnRequest = nock('http://dog.woof')
        .matchHeader('Content-Type', 'application/json')
        .get('/return/5')
        .reply(404);
      let gateway = new ReturnGateway();
      let response = await gateway.findById(5);
      expect(response).toEqual({success: false});
    });
  });
});
