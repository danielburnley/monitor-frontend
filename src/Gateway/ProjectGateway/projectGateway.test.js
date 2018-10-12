import nock from "nock";
import ProjectGateway from ".";
import Project from "../../Domain/Project";

describe("Project Gateway", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  describe("#FindByID", () => {
    describe("Given a Project is found", () => {
      let projectRequest, response, apiKeyGateway;

      describe("Example one", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
          apiKeyGateway = {
            getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
          };
          projectRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "superSecret")
            .get("/project/find?id=1")
            .reply(200, { data: { cow: "moo" }, schema: { duck: "quack" } });
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.findById(1);
        });

        it("Fetches the project from the API", () => {
          expect(projectRequest.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let project = new Project({ cow: "moo" }, { duck: "quack" });
          expect(response).toEqual({
            success: true,
            foundProject: { data: project.data, schema: project.schema },
            success: true
          });
        });

        it("Calls the api key gateway", () => {
          expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
        });
      });

      describe("Example two", () => {
        let projectRequest, response, apiKeyGateway;
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          apiKeyGateway = {
            getApiKey: jest.fn(() => ({ apiKey: "extraSecret" }))
          };
          projectRequest = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "extraSecret")
            .get("/project/find?id=5")
            .reply(200, { data: { dogs: "woof" }, schema: { cats: "meow" } });
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.findById(5);
        });

        it("Fetches the project from the API", () => {
          expect(projectRequest.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let project = new Project({ dogs: "woof" }, { cats: "meow" });
          expect(response).toEqual({
            success: true,
            foundProject: { data: project.data, schema: project.schema }
          });
        });

        it("Calls the api key gateway", () => {
          expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
        });
      });
    });

    describe("Given a project is not found", () => {
      it("Projects unsuccessful", async () => {
        let apiKeyGateway = { getApiKey: () => ({ apiKey: "extraSecret" }) };
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        let projectRequest = nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/project/find?id=5")
          .reply(404);
        let gateway = new ProjectGateway(apiKeyGateway);
        let response = await gateway.findById(5);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Update", () => {
    describe("Example one", () => {
      let gateway;
      let apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://rabbits.jump/";
        gateway = new ProjectGateway(apiKeyGateway);
      });

      it("Submits data to the API", async () => {
        let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 2,
            project_data: { rabbits: "hop" }
          })
          .reply(200);
        await gateway.update(2, { rabbits: "hop" });

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 2,
            project_data: { rabbits: "hop" }
          })
          .reply(200);
        let response = await gateway.update(2, { rabbits: "hop" });

        expect(response).toEqual({ success: true });
      });
    });
    describe("Example two", () => {
      let gateway;
      let apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://rabbits.jump/";
        gateway = new ProjectGateway(apiKeyGateway);
      });

      it("Submits data to the API", async () => {
        let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 6,
            project_data: { cows: "moo" }
          })
          .reply(200);
        await gateway.update(6, { cows: "moo" });

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 19,
            project_data: { frogs: "croak" }
          })
          .reply(200);
        let response = await gateway.update(19, { frogs: "croak" });
        expect(response).toEqual({ success: true });
      });
    });
  });

  describe("Submit", () => {
    describe("Example 1", () => {
      let gateway, apiKeyGateway;

      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };
        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ProjectGateway(apiKeyGateway);
      });

      it("Submits the data to the API", async () => {
        let submitProjectRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { project_id: 1 })
          .reply(200);
        await gateway.submit(1);

        expect(submitProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { project_id: 3 })
          .reply(200);
        let response = await gateway.submit(3);

        expect(response).toEqual({ success: true });
      });
    });
    describe("Example 2", () => {
      let gateway, apiKeyGateway;

      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };
        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ProjectGateway(apiKeyGateway);
      });

      it("Submits the data to the API", async () => {
        let submitProjectRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { project_id: 7 })
          .reply(200);
        await gateway.submit(7);

        expect(submitProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { project_id: 28 })
          .reply(200);
        let response = await gateway.submit(28);
        expect(response).toEqual({ success: true });
      });
    });
  });
});
