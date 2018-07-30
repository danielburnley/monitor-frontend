import nock from 'nock';
import ProjectGateway from '.';

describe('Project Gateway', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe('Given a Project is found', () => {
    let projectRequest, response;

    describe('Example one', () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        projectRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .get('/project/find?id=1')
          .reply(200, {some: 'data'});
        let gateway = new ProjectGateway();
        response = await gateway.findById(1);
      });

      it('Fetches the project from the API', () => {
        expect(projectRequest.isDone()).toBeTruthy();
      });

      it('Projects the response from the api', () => {
        expect(response).toEqual({success: true, foundProject: {some: 'data'}});
      });
    });

    describe('Example two', () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let projectRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/project/find?id=5')
          .reply(200, {other: 'things'});
        let gateway = new ProjectGateway();
        response = await gateway.findById(5);
      });

      it('Fetches the project from the API', () => {
        expect(projectRequest.isDone()).toBeTruthy();
      });

      it('Projects the response from the api', () => {
        expect(response).toEqual({
          success: true,
          foundProject: {other: 'things'},
        });
      });
    });
  });

  describe('Given a project is not found', () => {
    it('Projects unsuccessful', async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
      let projectRequest = nock('http://dog.woof')
        .matchHeader('Content-Type', 'application/json')
        .get('/project/find?id=5')
        .reply(404);
      let gateway = new ProjectGateway();
      let response = await gateway.findById(5);
      expect(response).toEqual({success: false});
    });
  });
});
