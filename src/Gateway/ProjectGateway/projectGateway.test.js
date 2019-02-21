import nock from "nock";
import ProjectGateway from ".";
import Project from "../../Domain/Project";
import Infrastructure from "../../Domain/Infrastructure";

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
            .reply(200, { data: { cow: "moo" }, schema: { duck: "quack" }, type: 'ac', status: 'Draft', timestamp: "12345"});
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.findById(1);
        });

        it("Fetches the project from the API", () => {
          expect(projectRequest.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let project = new Project({ cow: "moo" }, { duck: "quack" }, 'Draft', 'ac', "12345");
          expect(response).toEqual({
            success: true,
            foundProject: { data: project.data, schema: project.schema, type: project.type, status: project.status, timestamp: project.timestamp}
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
            .reply(200, { data: { dogs: "woof" }, schema: { cats: "meow" }, status: 'Submited', type: 'hif', timestamp: "2344" });
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.findById(5);
        });

        it("Fetches the project from the API", () => {
          expect(projectRequest.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let project = new Project({ dogs: "woof" }, { cats: "meow" }, 'Submited', 'hif', "2344");
          expect(response).toEqual({
            success: true,
            foundProject: { data: project.data, schema: project.schema, type: project.type, status: project.status, timestamp: project.timestamp }
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

  describe("#GetInfrastructures", () => {
    describe("Given a Infrastructures are returned", () => {
      let request, response, apiKeyGateway;

      describe("Example one", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
          apiKeyGateway = {
            getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
          };
          request = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "superSecret")
            .get("/project/1/infrastructures")
            .reply(200, { infrastructures: [ { cow: "moo" } ]});
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.getInfrastructures(1);
        });

        it("Fetches the project from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let infrastructure = new Infrastructure({ cow: "moo" })
          expect(response).toEqual({
            success: true,
            infrastructures: [infrastructure]
          });
        });

        it("Calls the api key gateway", () => {
          expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
        });
      });

      describe("Example two", () => {
        let request, response, apiKeyGateway;
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          apiKeyGateway = {
            getApiKey: jest.fn(() => ({ apiKey: "extraSecret" }))
          };
          request = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("API_KEY", "extraSecret")
            .get("/project/5/infrastructures")
            .reply(200, { infrastructures: [{ dogs: "woof" }]});
          let gateway = new ProjectGateway(apiKeyGateway);
          response = await gateway.getInfrastructures(5);
        });

        it("Fetches the project from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Projects the response from the api", () => {
          let infrastructure = new Infrastructure({ dogs: "woof" });
          expect(response).toEqual({
            success: true,
            infrastructures: [infrastructure]
          });
        });

        it("Calls the api key gateway", () => {
          expect(apiKeyGateway.getApiKey).toHaveBeenCalled();
        });
      });
    });

    describe("Given the project doesnt exist", () => {
      it("Projects unsuccessful", async () => {
        let apiKeyGateway = { getApiKey: () => ({ apiKey: "extraSecret" }) };
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        let projectRequest = nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/project/5/infrastructures")
          .reply(404);
        let gateway = new ProjectGateway(apiKeyGateway);
        let response = await gateway.getInfrastructures(5);
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
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(200, { errors: [], timestamp: "2" });
        await gateway.update(2, { rabbits: "hop" }, "123456");

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 2,
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(200, { errors: ["some_errors"], timestamp: "567" });
        let response = await gateway.update(2, { rabbits: "hop" }, "123456");

        expect(response).toEqual({ success: true, errors: ["some_errors"], new_timestamp: "567" });
      });

      it("Returns unsuccessful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 2,
            project_data: { rabbits: "hop" },
            timestamp: "123456"
          })
          .reply(500, {});
        let response = await gateway.update(2, { rabbits: "hop" }, "123456");

        expect(response).toEqual({ success: false });
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
          .reply(200, {errors: [], timestamp: "0"});
        await gateway.update(6, { cows: "moo" });

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 6,
            project_data: { cows: "moo" },
            timestamp: "2343"
          })
          .reply(200, { errors: ["more_errors"], timestamp: "789"});
        let response = await gateway.update(6, { cows: "moo" }, "2343");
        expect(response).toEqual({ success: true, errors: ["more_errors"], new_timestamp: "789" });
      });

      it("Returns unsuccessful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/update", {
            project_id: 6,
            project_data: { cows: "moo" },
            timestamp: "2343"
          })
          .reply(403, {});
        let response = await gateway.update(6, { cows: "moo" }, "2343");
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Submit", () => {
    describe("Example 1", () => {
      let gateway, apiKeyGateway, locationGateway;

      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        locationGateway = {
          getRoot: jest.fn(async () => "https://ducks.quack")
        }

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ProjectGateway(apiKeyGateway, locationGateway);
      });

      it("Submits the data to the API", async () => {
        let submitProjectRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { url: 'https://ducks.quack/project/1', project_id: 1 })
          .reply(200);
        await gateway.submit(1);

        expect(submitProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { url: 'https://ducks.quack/project/3', project_id: 3 })
          .reply(200);
        let response = await gateway.submit(3);

        expect(response).toEqual({ success: true });
      });
    });
    describe("Example 2", () => {
      let gateway, apiKeyGateway, locationGateway;

      beforeEach(async () => {
        apiKeyGateway = {
          getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
        };

        locationGateway = {
          getRoot: jest.fn(async () => "https://dog.woof")
        }

        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ProjectGateway(apiKeyGateway, locationGateway);
      });

      it("Submits the data to the API", async () => {
        let submitProjectRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { url: 'https://dog.woof/project/7', project_id: 7 })
          .reply(200);
        await gateway.submit(7);

        expect(submitProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/project/submit", { url: 'https://dog.woof/project/28', project_id: 28 })
          .reply(200);
        let response = await gateway.submit(28);
        expect(response).toEqual({ success: true });
      });
    });
  });

  describe("#Validate", () => {
    let gateway, apiKeyGateway;

    beforeEach(async () => {
      apiKeyGateway = {
        getApiKey: jest.fn(() => ({ apiKey: "superSecret" }))
      };
      gateway = new ProjectGateway(apiKeyGateway);
    });

    describe("Given valid data", () => {
      describe("Example 1", () => {
        let validateProjectRequest;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://flowers.blossom/";

          validateProjectRequest = nock("http://flowers.blossom")
            .matchHeader("Content-Type", "application/json")
            .post("/project/validate", {
              project_id: 1,
              type: "cat",
              data: "Some data stuffs"
            })
            .reply(200, {
              invalidPaths: [],
              prettyInvalidPaths: [],
              valid: true
            });
        });

        it("Submits data to the API", async () => {
          await gateway.validate(1, "cat", "Some data stuffs");

          expect(validateProjectRequest.isDone()).toBeTruthy();
        });

        it("returns an empty list if valid", async () => {
          let response = await gateway.validate(1, "cat", "Some data stuffs");

          expect(response).toEqual({
            invalidPaths: [],
            prettyInvalidPaths: [],
            valid: true
          });
        });
      });

      describe("Example 2", () => {
        let validateProjectRequest, response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cows.moo/";

          validateProjectRequest = nock("http://cows.moo")
            .matchHeader("Content-Type", "application/json")
            .post("/project/validate", {
              project_id: 3,
              type: "bop",
              data: "More data-y data"
            })
            .reply(200, {
              valid: true,
              invalidPaths: [],
              prettyInvalidPaths: []
            });
          response = await gateway.validate(3, "bop", "More data-y data");
        });

        it("Submits data to the API", async () => {
          expect(validateProjectRequest.isDone()).toBeTruthy();
        });

        it("returns an empty list", async () => {
          expect(response).toEqual({
            invalidPaths: [],
            prettyInvalidPaths: [],
            valid: true
          });
        });
      });
    });

    describe("Given invalid data", () => {
      describe("Example 1", () => {
        let response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://flowers.blossom/";

          nock("http://flowers.blossom")
            .matchHeader("Content-Type", "application/json")
            .post("/project/validate", {
              project_id: 5,
              type: "cat",
              data: "Some data stuffs"
            })
            .reply(200, {
              invalidPaths: [ 'dogHouses', 'location'],
              prettyInvalidPaths: ['Dog Houses', 'Location'],
              valid: false
            });
            response = await gateway.validate(5, "cat", "Some data stuffs");
        });

        it("returns details of missing fields", async () => {
          expect(response).toEqual({
            invalidPaths: [ 'dogHouses', 'location'],
            prettyInvalidPaths: ['Dog Houses', 'Location'],
            valid: false
          })
        })
      });

      describe("Example 2", () => {
        let response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cows.moo/";

          nock("http://cows.moo")
            .matchHeader("Content-Type", "application/json")
            .post("/project/validate", {
              project_id: 3,
              type: "dog",
              data: "woof woof"
            })
            .reply(200, {
              invalidPaths: [ 'catHouses', 'timezone'],
              prettyInvalidPaths: ['Cat Houses', 'Time Zone'],
              valid: false
            });
            response = await gateway.validate(3, "dog", "woof woof");
        });

        it("returns details of missing fields", async () => {
          expect(response).toEqual({
            invalidPaths: [ 'catHouses', 'timezone'],
            prettyInvalidPaths: ['Cat Houses', 'Time Zone'],
            valid: false
          })
        })
      });
    });
  });

  describe("#Create", () => {
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
          .post("/project/create", {
            type: "mvf",
            name: "my first project",
            bidId: "HID/DHS/324678"
          })
          .reply(200, {projectId: 4});
        await gateway.create("my first project", "mvf", "HID/DHS/324678");

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/create", {
            type: "mvf",
            name: "my first project",
            bidId: "HID/DHS/324678"
          })
          .reply(200, {projectId: 4});
        let response = await gateway.create("my first project", "mvf", "HID/DHS/324678");

        expect(response).toEqual({ success: true, id: 4 });
      });

      it("Returns unsuccessful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/create", {
            type: "mvf",
            name: "my first project",
            bidId: "HID/DHS/324678"
          })
          .reply(403, {projectId: 4});
        let response = await gateway.create("my first project", "mvf", "HID/DHS/324678");

        expect(response).toEqual({ success: false});
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
          .post("/project/create", {
            type: "ff",
            name: "my second project",
            bidId: "DHW/FHY/4623"
          })
          .reply(200, { projectId: 67});
        await gateway.create("my second project", "ff", "DHW/FHY/4623");

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/create", {
            type: "ff",
            name: "my second project",
            bidId: "DHW/FHY/4623"
          })
          .reply(200, { projectId: 67});
        let response = await gateway.create("my second project", "ff", "DHW/FHY/4623");

        expect(response).toEqual({ success: true, id: 67 });
      });

      it("Returns unsuccessful", async () => {
        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/create", {
            type: "ff",
            name: "my second project",
            bidId: "DHW/FHY/4623"
          })
          .reply(403, { projectId: 67});
        let response = await gateway.create("my second project", "ff", "DHW/FHY/4623");

        expect(response).toEqual({ success: false});
      });
    });
  });

  describe("#addUser", () => {
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
        let users = [{
          email: "my_email@email.com",
          role: "Homes England"
        }]

        let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/1/add_users", {
            users: users
          })
          .reply(200);
        await gateway.addUser(1, users);

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        let users = [{
          email: "my_email@email.com",
          role: "Homes England"
        }]

        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/1/add_users", {
            users: users
          })
          .reply(200);
        let response = await gateway.addUser(1, users);

        expect(response).toEqual({ success: true });
      });

      it("Returns unsuccessful", async () => {
        let users = [{
          email: "my_email@email.com",
          role: "Homes England"
        }]

        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/1/add_users", {
            users: users
          })
          .reply(403);
        let response = await gateway.addUser(1, users);

        expect(response).toEqual({ success: false});
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
        let users = [
          {
            email: "my_email@email.com",
            role: "Homes England"
          },
          {
            email: "email2@gov.uk",
            role: "Local Authority"
          }
        ]

        let updateProjectRequest = nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/6/add_users", {
            users: users
          })
          .reply(200);
        await gateway.addUser(6, users);

        expect(updateProjectRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        let users = [{
          email: "my_email@email.com",
          role: "Homes England"
        }]

        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/6/add_users", {
            users: users
          })
          .reply(200);
        let response = await gateway.addUser(6, users);

        expect(response).toEqual({ success: true });
      });

      it("Returns unsuccessful", async () => {
        let users = [{
          email: "my_email@email.com",
          role: "Homes England"
        }]

        nock("http://rabbits.jump")
          .matchHeader("Content-Type", "application/json")
          .post("/project/6/add_users", {
            users: users
          })
          .reply(403);
        let response = await gateway.addUser(6, users);

        expect(response).toEqual({ success: false});
      });
    });
  });
});
