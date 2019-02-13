import nock from 'nock';
import UserGateway from '.';
import Project from '../../Domain/Project';

describe('user gateway', () => {
  let request, response, apiKeyGateway;
  afterEach(() => {
    nock.cleanAll();
  });
  describe('Example 1', () => {
    beforeEach(async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };
      request = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .matchHeader("API_KEY", "superSecret")
        .get('/user/projects')
        .reply(200, {project_list: [{id: 1, name: "name", type: "a type", status: "Draft"}]});
      let gateway = new UserGateway(apiKeyGateway);
      response = await gateway.getProjects();
    });

    it('Requests the project list from the API', async () => {
      expect(request.isDone()).toBeTruthy();
    });
    
    it("Calls the api key gateway", () => {
      expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
    });

    it("Returns the response from the api", () => {
      let projects = [new Project({ summary: { projectName: "name" }}, null, "Draft", "a type", null)];
      expect(response).toEqual({
        success: true,
        projectList: projects
      });
    });
  });

  describe('Example 2', () => {
    beforeEach(async () => {
      process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
      apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };
      request = nock('http://cat.meow')
        .matchHeader('Content-Type', 'application/json')
        .matchHeader("API_KEY", "superSecret")
        .get('/user/projects')
        .reply(200, {project_list: [
          {id: 3, name: "cat", type: "ac", status: "not done"},
          {id: 4, name: "another name", type: "a different type", status: "Submitted"}
        ]});
      let gateway = new UserGateway(apiKeyGateway);
      response = await gateway.getProjects();
    });

    it('Requests the project list from the API', async () => {
      expect(request.isDone()).toBeTruthy();
    });
    
    it("Calls the api key gateway", () => {
      expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
    });

    it("Returns the response from the api", () => {
      let projects = [
        new Project({ summary: { projectName: "cat" }}, null, "not done", "ac", null),
        new Project({ summary: { projectName: "another name" }}, null, "Submitted", "a different type", null)
      ];
      expect(response).toEqual({
        success: true,
        projectList: projects
      });
    });
  })
});