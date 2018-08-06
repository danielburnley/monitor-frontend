import nock from 'nock';
import Return from '../../Domain/Return'
import ReturnGateway from '.';

describe('Return Gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('#FindById', () => {
    describe('Given a Return is found', () => {
      let returnRequest, response;

      describe('Example one', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          returnRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .get('/return/get?id=1')
            .reply(200, {data: {some: 'data'}, schema: {some: 'schema'}});
          let gateway = new ReturnGateway();
          response = await gateway.findById(1);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({some: 'data'}, {some: 'schema'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({some: 'data'});
          expect(response.foundReturn.schema).toEqual({some: 'schema'});
        });
      });

      describe('Example two', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          let returnRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/return/get?id=5')
            .reply(200, {data: {cats: 'meow'}, schema: {dogs: 'woof'}});
          let gateway = new ReturnGateway();
          response = await gateway.findById(5);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({cats: 'meow'}, {dogs: 'woof'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({cats: 'meow'});
          expect(response.foundReturn.schema).toEqual({dogs: 'woof'});
        });
      });
    });

    describe('Given a return is not found', () => {
      it('Returns unsuccessful', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let returnRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/return/get?id=5')
          .reply(404);
        let gateway = new ReturnGateway();
        let response = await gateway.findById(5);
        expect(response).toEqual({success: false});
      });
    });
  });

  describe('#Submit', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {return_id: 1, data: {cats: 'meow'}})
          .reply(200);
        await gateway.submit(1, {cats: 'meow'});

        expect(submitReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {return_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        let response = await gateway.submit(1, {cats: 'meow'});
        expect(response).toEqual({success: true});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {return_id: 2, data: {dogs: 'woof'}})
          .reply(200);
        await gateway.submit(2, {dogs: 'woof'});

        expect(submitReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {return_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        let response = await gateway.submit(2, {dogs: 'woof'});
        expect(response).toEqual({success: true});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Returns unsuccessful', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {return_id: 2, data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.submit(2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe('#BaseReturnFor', () => {
    describe('Given a Return is found', () => {
      let returnRequest, response;

      describe('Example one', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          returnRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .get('/project/get-base-return?id=1')
            .reply(200, {data: {some: 'data'}, schema: {some: 'schema'}});
          let gateway = new ReturnGateway();
          response = await gateway.baseReturnFor(1);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({some: 'data'}, {some: 'schema'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({some: 'data'});
          expect(response.foundReturn.schema).toEqual({some: 'schema'});
        });
      });

      describe('Example two', () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          let returnRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/project/get-base-return?id=5')
            .reply(200, {data: {cats: 'meow'}, schema: {dogs: 'woof'}});
          let gateway = new ReturnGateway();
          response = await gateway.baseReturnFor(5);
        });

        it('Fetches the return from the API', () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it('Returns the response from the api', () => {
          let expectedReturn = new Return({cats: 'meow'}, {dogs: 'woof'});
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({cats: 'meow'});
          expect(response.foundReturn.schema).toEqual({dogs: 'woof'});
        });
      });
    });

    describe('Given a return is not found', () => {
      it('Returns unsuccessful', async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let returnRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/project/get-base-return?id=5')
          .reply(404);
        let gateway = new ReturnGateway();
        let response = await gateway.baseReturnFor(5);
        expect(response).toEqual({success: false});
      });
    });
  });

  describe('#Create', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        await gateway.create(1, {cats: 'meow'});

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 1, data: {cats: 'meow'}})
          .reply(200, {id: 1});
        let response = await gateway.create(1, {cats: 'meow'});
        expect(response).toEqual({success: true, returnId: 1});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        await gateway.create(2, {dogs: 'woof'});

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(200, {id: 2});
        let response = await gateway.create(2, {dogs: 'woof'});
        expect(response).toEqual({success: true, returnId: 2});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Returns unsuccessful', async () => {
        let createReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/create', {project_id: 2, data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.create(2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe('#Update', () => {
    describe('Example one', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {return_id: 1, data: {cats: 'meow'}})
          .reply(200);
        await gateway.update(1, {cats: 'meow'});

        expect(updateReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {return_id: 1, data: {cats: 'meow'}})
          .reply(200);
        let response = await gateway.update(1, {cats: 'meow'});
        expect(response).toEqual({success: true});
      });
    });

    describe('Example two', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Submits the data to the API', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {return_id: 2, data: {dogs: 'woof'}})
          .reply(200);
        await gateway.update(2, {dogs: 'woof'});

        expect(updateReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {return_id: 2, data: {dogs: 'woof'}})
          .reply(200);
        let response = await gateway.update(2, {dogs: 'woof'});
        expect(response).toEqual({success: true});
      });
    });

    describe('With an unsuccessful response', () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway();
      });

      it('Returns unsuccessful', async () => {
        let updateReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/update', {return_id: 2, data: {dogs: 'woof'}})
          .reply(500);
        let response = await gateway.update(2, {dogs: 'woof'});

        expect(response.success).toBeFalsy();
      });
    });
  });
});
