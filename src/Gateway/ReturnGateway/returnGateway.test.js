import nock from "nock";
import Return from "../../Domain/Return";
import ReturnGateway from ".";

describe("ReturnGateway", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  let apiKeyGateway, locationGateway;

  describe("#validate", () => {
    describe("Example 1", () => {
      describe("Connection successful", () => {
        let validationRequest, response;
        let data = {
          dogs: "woof"
        };
        let type = "hif";
        let project_id = 1;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          locationGateway = {getRoot: () => 'https://example.com'};
          apiKeyGateway = {getApiKey: () => ({apiKey: 'superSecret'})}
          validationRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', 'superSecret')
            .post('/return/validate',{type, project_id, data})
            .reply(200, {valid: true, invalidPaths: [], prettyInvalidPaths: []});

          let gateway = new ReturnGateway(apiKeyGateway, locationGateway);

          response = await gateway.validate(project_id, data, type);
        });

        it("fetches validation from the API", () => {
          expect(validationRequest.isDone()).toBeTruthy();
        });

        it("returns a list of paths that were invalid", () => {
          expect(response).toEqual({
            success: true,
            invalidPaths: [],
            prettyInvalidPaths: [],
            valid: true
          });
        });
      });

      describe("Connection unsuccessful", () => {
        let validationRequest, response;
        let data = {
          dogs: "woof"
        };
        let type = "hif";
        let project_id = 1;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          locationGateway = {getRoot: () => 'https://example.com'};
          apiKeyGateway = {getApiKey: () => ({apiKey: 'superSecret'})}
          validationRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .matchHeader('API_KEY', 'superSecret')
            .post('/return/validate',{type, project_id, data})
            .socketDelay(2000)
          let gateway = new ReturnGateway(apiKeyGateway, locationGateway);

          response = await gateway.validate(project_id, data, type);
        });

        it("Returns success as false", () => {
          expect(response).toEqual({success: false})
        });
      });
    });

    describe("Example 2", () => {
      let validationRequest, response;
      let data = {
        cats: "meow"
      };
      let type = "hif";
      let project_id = 1;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        locationGateway = {getRoot: () => 'https://example.com'};
        apiKeyGateway = {getApiKey: () => ({apiKey: 'megaSecret'})}
        validationRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .matchHeader('API_KEY', 'megaSecret')
          .post('/return/validate',{type, project_id, data})
          .reply(200, {valid: false, invalidPaths: ['cats'], prettyInvalidPaths: ['Cats']});
        let gateway = new ReturnGateway(apiKeyGateway, locationGateway);

        response = await gateway.validate(project_id, data, type);
      });

      it("fetches validation from the API", () => {
        expect(validationRequest.isDone()).toBeTruthy();
      });

      it('returns a list of paths that were invalid', () => {
        expect(response).toEqual({invalidPaths: ['cats'], prettyInvalidPaths: ['Cats'], valid: false, success: true});
      });
    });
  });

  describe("#FindById", () => {
    let gateway;
    describe("Given a Return is found", () => {
      describe("Example one", () => {
        describe("Connection successful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
            locationGateway = {getRoot: () => 'https://example.com'};
            apiKeyGateway = {getApiKey: () => ({apiKey: 'catz'})};
            returnRequest = nock('http://cat.meow')
              .matchHeader('Content-Type', 'application/json')
              .get('/return/get?id=0&returnId=1')
              .reply(200, {data: {some: 'data'}, schema: {some: 'schema'}, status: 'Draft'});
            let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
            response = await gateway.findById(1, 0);
          });

          it("Fetches the return from the API", () => {
            expect(returnRequest.isDone()).toBeTruthy();
          });

          it("Returns the response from the api", () => {
            let expectedReturn = new Return({ some: "data" }, { some: "schema" });
            expect(response.success).toEqual(true);
            expect(response.foundReturn.data).toEqual({ some: "data" });
            expect(response.foundReturn.schema).toEqual({ some: "schema" });
            expect(response.foundReturn.status).toEqual("Draft");
          });
        })

        describe("Connection unsuccessful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
            locationGateway = {getRoot: () => 'https://example.com'};
            apiKeyGateway = {getApiKey: () => ({apiKey: 'catz'})};
            returnRequest = nock('http://cat.meow')
              .matchHeader('Content-Type', 'application/json')
              .get('/return/get?id=0&returnId=1')
              .socketDelay(2000)

            gateway = new ReturnGateway(apiKeyGateway, locationGateway);
            response = await gateway.findById(1, 0);
          });

          it("Returns success as false", () => {
            expect(response).toEqual({ success: false });
          });
        });
      });

      describe("Example two", () => {
        let returnRequest, response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          locationGateway = {getRoot: () => 'https://example.com'};
          apiKeyGateway = {getApiKey: () => ({apiKey: 'doggy'})};

          returnRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/return/get?id=6&returnId=5')
            .reply(200, {data: {cats: 'meow'}, schema: {dogs: 'woof'}, status: 'Submitted'});
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
          response = await gateway.findById(5, 6);
        });

        it("Fetches the return from the API", () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          let expectedReturn = new Return({ cats: "meow" }, { dogs: "woof" });
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({ cats: "meow" });
          expect(response.foundReturn.schema).toEqual({ dogs: "woof" });
          expect(response.foundReturn.status).toEqual("Submitted");
        });
      });
    });

    describe("Given a return is not found", () => {
      it("Returns unsuccessful", async () => {
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        let returnRequest = nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/return/get?id=6&returnId=5")
          .reply(404);
        let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        let response = await gateway.findById(5, 6);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Submit", () => {
    describe("Example one", () => {
      let gateway;

      describe("Connection successful", () => {
        beforeEach(async () => {
          locationGateway = {getRoot: () => 'https://frontend.space'};

          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        });

        it('Submits the data to the API', async () => {
          let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 1, return_id: 1, data: {cats: 'meow'}, url: 'https://frontend.space/project/1/return/1'})
          .reply(200);
          await gateway.submit(1, 1, { cats: "meow" });

          expect(submitReturnRequest.isDone()).toBeTruthy();
        });

        it('Returns successful & the return id', async () => {
          let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 1, return_id: 1, data: {cats: 'meow'}, url: 'https://frontend.space/project/1/return/1'})
          .reply(200, {id: 1});
          let response = await gateway.submit(1, 1, {cats: 'meow'});
          expect(response).toEqual({success: true});
        });

      });

      describe("Connection unsuccessful", () => {
        beforeEach(async () => {
          locationGateway = {getRoot: () => 'https://frontend.space'};

          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        });

        it("Returns success as false", async () => {
          let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 1, return_id: 1, data: {cats: 'meow'}, url: 'https://frontend.space/project/1/return/1'})
          .socketDelay(2000);
          let response = await gateway.submit(1, 1, {cats: 'meow'});
          expect(response).toEqual({success: false});
        });
      });
    });

    describe("Example two", () => {
      let gateway;

      beforeEach(async () => {
        locationGateway = {getRoot: () => 'https://cathost.net'};
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it('Submits the data to the API', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}, url: 'https://cathost.net/project/255/return/2'})
          .reply(200);
        await gateway.submit(255, 2, { dogs: "woof" });

        expect(submitReturnRequest.isDone()).toBeTruthy();
      });

      it('Returns successful & the return id', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}, url: 'https://cathost.net/project/255/return/2'})
          .reply(200, {id: 2});
        let response = await gateway.submit(255, 2, {dogs: 'woof'});
        expect(response).toEqual({success: true});
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        locationGateway = {getRoot: () => 'https://cathost.net'};
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it('Returns unsuccessful', async () => {
        let submitReturnRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/return/submit', {project_id: 255, return_id: 2, data: {dogs: 'woof'}, url: 'https://cathost.net/project/255/return/2'})
          .reply(500);
        let response = await gateway.submit(255, 2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe("#getReturns", () => {
    describe("Given at least one return", () => {

      describe("Example one", () => {
        describe("Connection successful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            returnRequest = nock("http://cat.meow")
              .matchHeader("Content-Type", "application/json")
              .get("/project/1/returns")
              .reply(200, {
                returns: [
                  {
                    id: 3,
                    project_id: 1,
                    updates: [{ cats: "meow" }],
                    status: "Submitted"
                  },
                  {
                    id: 4,
                    project_id: 1,
                    updates: [{ dogs: "woof" }],
                    status: "Draft"
                  }
                ]
              });

            let gateway = new ReturnGateway(apiKeyGateway);
            response = await gateway.getReturns(1);
          });

          it("Fetches the return from the API", () => {
            expect(returnRequest.isDone()).toBeTruthy();
          });

          it("Returns a response from the api", () => {
            expect(response.success).toEqual(true)
            expect(response.returns[0].id).toEqual(3)
            expect(response.returns[0].project_id).toEqual(1)
            expect(response.returns[0].updates).toEqual([{ cats: "meow" }])
            expect(response.returns[0].status).toEqual("Submitted")
            expect(response.returns[1].id).toEqual(4)
            expect(response.returns[1].project_id).toEqual(1)
            expect(response.returns[1].updates).toEqual([{ dogs: "woof" }])
            expect(response.returns[1].status).toEqual("Draft")
          });
        });

        describe("Connection unsuccessful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            returnRequest = nock("http://cat.meow")
              .matchHeader("Content-Type", "application/json")
              .get("/project/1/returns")
              .socketDelay(2000);

            let gateway = new ReturnGateway(apiKeyGateway);
            response = await gateway.getReturns(1);
          });

          it("Returns success as false", () => {
            expect(response).toEqual({success: false});
          });
        });
      });

      describe("Given a return is not found", () => {
        it("Returns unsuccessful", async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          let returnRequest = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .get("/project/5/returns")
            .reply(404);
          let gateway = new ReturnGateway(apiKeyGateway);
          let response = await gateway.getReturns(5);
          expect(response).toEqual({ success: false });
        });
      });
    });
  });

  describe("#BaseReturnFor", () => {
    describe("Given a Return is found", () => {

      describe("Example one", () => {
        let returnRequest, response;
        describe("Connection successful", () => {
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            returnRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .get("/project/1/return")
            .reply(200, {
              baseReturn: { data: { some: "data" }, schema: { some: "schema" }, no_of_previous_returns: 1 }
            });
            let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
            response = await gateway.baseReturnFor(1);
          });

          it("Fetches the return from the API", () => {
            expect(returnRequest.isDone()).toBeTruthy();
          });

          it("Returns the response from the api", () => {
            expect(response.success).toEqual(true);
            expect(response.foundReturn.data).toEqual({ some: "data" });
            expect(response.foundReturn.schema).toEqual({ some: "schema" });
            expect(response.foundReturn.no_of_previous_returns).toEqual(1);
          });
        });

        describe("Connection unsuccessful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            returnRequest = nock("http://cat.meow")
              .matchHeader("Content-Type", "application/json")
              .get("/project/1/return")
              .socketDelay(2000)

            let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
            response = await gateway.baseReturnFor(1);
          });

          it("Returns success as false", () => {
            expect(response).toEqual({success: false})
          });
        });
      });

      describe("Example two", () => {
        let returnRequest, response;
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          returnRequest = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .get("/project/5/return")
            .reply(200, {
              baseReturn: { data: { cats: "meow" }, schema: { dogs: "woof" }, no_of_previous_returns: 7 }
            });
          let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
          response = await gateway.baseReturnFor(5);
        });

        it("Fetches the return from the API", () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          let expectedReturn = new Return({ cats: "meow" }, { dogs: "woof" });
          expect(response.success).toEqual(true);
          expect(response.foundReturn.data).toEqual({ cats: "meow" });
          expect(response.foundReturn.schema).toEqual({ dogs: "woof" });
          expect(response.foundReturn.no_of_previous_returns).toEqual(7);
        });
      });
    });

    describe("Given a return is not found", () => {
      it("Returns unsuccessful", async () => {
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        let returnRequest = nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/project/5/return")
          .reply(404);
        let gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        let response = await gateway.baseReturnFor(5);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Create", () => {
    describe("Example one", () => {
      describe("Connection successful", () => {
        let gateway;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        });

        it("Submits the data to the API", async () => {
          let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 1, data: { cats: "meow" } })
          .reply(200, { id: 1 });
          await gateway.create(1, { cats: "meow" });

          expect(createReturnRequest.isDone()).toBeTruthy();
        });

        it("Returns successful & the return id", async () => {
          let createReturnRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .post("/return/create", { project_id: 1, data: { cats: "meow" } })
            .reply(200, { id: 1 });

          let response = await gateway.create(1, { cats: "meow" });
          expect(response).toEqual({ success: true, returnId: 1 });
        });
      });

      describe("Connection unsuccessful", () => {
        let gateway, response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
          let createReturnRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .post("/return/create", { project_id: 1, data: { cats: "meow" } })
            .socketDelay(2000);

            response = await gateway.create(1, { cats: "meow" });
          });

        it("Returns success as false", () => {
          expect(response).toEqual({success: false})
        });
      });
    });

    describe("Example two", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it("Submits the data to the API", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(200, { id: 2 });
        await gateway.create(2, { dogs: "woof" });

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it("Returns successful & the return id", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(200, { id: 2 });
        let response = await gateway.create(2, { dogs: "woof" });
        expect(response).toEqual({ success: true, returnId: 2 });
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it("Returns unsuccessful", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(500);
        let response = await gateway.create(2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe("#Update", () => {
    describe("Example one", () => {
      describe("Connection successful", () => {
        let gateway;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
        });

        it("Submits the data to the API", async () => {
          let updateReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/update", {
            project_id: 9,
            return_id: 1,
            return_data: { cats: "meow" }
          })
          .reply(200);
          await gateway.update(9, 1, { cats: "meow" });

          expect(updateReturnRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          let updateReturnRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .post("/return/update", {
              project_id: 6,
              return_id: 1,
              return_data: { cats: "meow" }
            })
            .reply(200);

          let response = await gateway.update(6, 1, { cats: "meow" });
          expect(response).toEqual({ success: true });
        });
      });

      describe("Connection unsuccessful", () => {
        let gateway, updateReturnRequest, response;

        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          gateway = new ReturnGateway(apiKeyGateway, locationGateway);
          updateReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/update", {
            project_id: 6,
            return_id: 1,
            return_data: { cats: "meow" }
          })
          .socketDelay(2000);

          response = await gateway.update(6, 1, { cats: "meow" });
        });

        it("Returns success as false", () => {
          expect(response).toEqual({success: false});
        });
      });
    });

    describe("Example two", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it("Submits the data to the API", async () => {
        let updateReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/update", {
            project_id: 4,
            return_id: 2,
            return_data: { dogs: "woof" }
          })
          .reply(200);
        await gateway.update(4, 2, { dogs: "woof" });

        expect(updateReturnRequest.isDone()).toBeTruthy();
      });

      it("Returns successful", async () => {
        let updateReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/update", {
            project_id: 4,
            return_id: 2,
            return_data: { dogs: "woof" }
          })
          .reply(200);
        let response = await gateway.update(4, 2, { dogs: "woof" });
        expect(response).toEqual({ success: true });
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ReturnGateway(apiKeyGateway, locationGateway);
      });

      it("Returns unsuccessful", async () => {
        let updateReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/update", {
            project_id: 12,
            return_id: 2,
            return_data: { dogs: "woof" }
          })
          .reply(500);
        let response = await gateway.update(12, 2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });
});
