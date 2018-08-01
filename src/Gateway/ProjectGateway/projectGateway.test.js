import nock from 'nock';
import ProjectGateway from '.';
import Project from '../../Domain/Project';

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
          .reply(200, {data: {cow: "moo"}, schema: {duck: "quack"}});
        let gateway = new ProjectGateway();
        response = await gateway.findById(1);
      });

      it('Fetches the project from the API', () => {
        expect(projectRequest.isDone()).toBeTruthy();
      });

      it('Projects the response from the api', () => {
        let project = new Project({cow: "moo"},{duck: "quack"})
        expect(response).toEqual({success: true, foundProject: {data: project.data, schema: project.schema},
          "success": true});
      });
    });

    describe('Example two', () => {
      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
        let projectRequest = nock('http://dog.woof')
          .matchHeader('Content-Type', 'application/json')
          .get('/project/find?id=5')
          .reply(200, { data: {dogs:'woof'} , schema:{cats:'meow'}});
        let gateway = new ProjectGateway();
        response = await gateway.findById(5);
      });

      it('Fetches the project from the API', () => {
        expect(projectRequest.isDone()).toBeTruthy();
      });

      it('Projects the response from the api', () => {
        let project = new Project({dogs:'woof'},{cats:'meow'})
        expect(response).toEqual({
          success: true,
          foundProject: {data: project.data, schema: project.schema},
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
