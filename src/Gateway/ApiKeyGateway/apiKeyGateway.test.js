import nock from "nock";
import ApiKey from '../../Domain/ApiKey';
import ApiKeyGateway from ".";

describe("ApiKey Gateway", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe("#check", () => {
    describe("Valid API key", () => {
      describe("Example 1", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "firstKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 3;
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';

          checkRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', "firstKey")
            .post('/apikey/check', {project_id})
            .reply(201, {email: "custom@email.com", role: "Local Authority"});

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Calls the backend", () => {
          expect(checkRequest.isDone()).toBeTruthy();
        });

        it("Calls the api cookie gateway", () => {
          expect(apiCookieGateway.getApiKey).toHaveBeenCalled();
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: true, valid: true, email: "custom@email.com", role: "Local Authority"})
        });
      });

      describe("Example 2", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "otherKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 9;
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';

          checkRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', apikey)
            .post('/apikey/check', {project_id})
            .reply(201, {email: "myemail@mydomain", role: "Homes England"});

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Calls the backend", () => {
          expect(checkRequest.isDone()).toBeTruthy();
        });

        it("Calls the api cookie gateway", () => {
          expect(apiCookieGateway.getApiKey).toHaveBeenCalled();
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: true, valid: true, email: "myemail@mydomain", role: "Homes England"})
        });
      });
    });

    describe("Invalid API key", () => {
      describe("Example 1", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "firstKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 3;
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';

          checkRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', "firstKey")
            .post('/apikey/check', {project_id})
            .reply(401, {});

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Calls the backend", () => {
          expect(checkRequest.isDone()).toBeTruthy();
        });

        it("Calls the api cookie gateway", () => {
          expect(apiCookieGateway.getApiKey).toHaveBeenCalled();
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: true, valid: false});
        });
      });

      describe("Example 2", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "otherKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 9;
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';

          checkRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', apikey)
            .post('/apikey/check', {project_id})
            .reply(401, {});

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Calls the backend", () => {
          expect(checkRequest.isDone()).toBeTruthy();
        });

        it("Calls the api cookie gateway", () => {
          expect(apiCookieGateway.getApiKey).toHaveBeenCalled();
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: true, valid: false});
        });
      });
    });

    describe("Request timeout", () => {
      describe("Example 1", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "firstKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 3;
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';

          checkRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', "firstKey")
            .post('/apikey/check', {project_id})
            .socketDelay(2000);

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: false});
        });
      });

      describe("Example 2", () => {
        let checkRequest, project_id, response, apiCookieGateway;

        beforeEach(async () => {
          let apikey = "otherKey";
          apiCookieGateway = { getApiKey: jest.fn(() => new ApiKey(apikey)) }
          project_id = 9;
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';

          checkRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', apikey)
            .post('/apikey/check', {project_id})
            .socketDelay(2000);

          let gateway = new ApiKeyGateway(apiCookieGateway);

          response = await gateway.check(project_id);
        });

        it("Returns the appropriate data", () => {
          expect(response).toEqual({success: false});
        });
      });
    });
  });
});
