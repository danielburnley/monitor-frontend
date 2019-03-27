import nock from "nock";
import ClaimGateway from ".";

describe("Claim Gateway", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  let apiKeyGateway, locationGateway;

  describe("#validate", () => {
    describe("Example 1", () => {
      let validationRequest, response;
      let data = {
        IamAclaim: "give me money"
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
          .post('/claim/validate', {type, project_id, data})
          .reply(200, {valid: true, invalidPaths: [], prettyInvalidPaths: []});
        let gateway = new ClaimGateway(apiKeyGateway, locationGateway);

        response = await gateway.validate(project_id, data, type);
      });

      it("fetches validation from the API", () => {
        expect(validationRequest.isDone()).toBeTruthy();
      });

      it("claims a list of paths that were invalid", () => {
        expect(response).toEqual({
          invalidPaths: [],
          prettyInvalidPaths: [],
          valid: true
        });
      });
    });

    describe("Example 2", () => {
      let validationRequest, response;
      let data = {
        anotherclaim: "givememoremoney"
      };
      let type = "ac";
      let project_id = 1;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        locationGateway = {getRoot: () => 'https://example.com'};
        apiKeyGateway = {getApiKey: () => ({apiKey: 'megaSecret'})}
        validationRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .matchHeader('API_KEY', 'megaSecret')
          .post('/claim/validate',{type, project_id, data})
          .reply(200, {valid: false, invalidPaths: ['cats']});
        let gateway = new ClaimGateway(apiKeyGateway, locationGateway);

        response = await gateway.validate(project_id, data, type);
      });

      it("fetches validation from the API", () => {
        expect(validationRequest.isDone()).toBeTruthy();
      });

      it('claims a list of paths that were invalid', () => {
        expect(response).toEqual({invalidPaths: ['cats'], valid: false});
      });
    });
  });

  describe("#FindById", () => {
    describe("Given a claim is found", () => {
      let claimRequest, response;

      describe("Example one", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
          locationGateway = {getRoot: () => 'https://example.com'};
          apiKeyGateway = {getApiKey: () => ({apiKey: 'catz'})};
          claimRequest = nock('http://cat.meow')
            .matchHeader('Content-Type', 'application/json')
            .get('/claim/get?id=0&claimId=1')
            .reply(200, {data: {some: 'data'}, schema: {some: 'schema'}, status: 'Draft'});
          let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
          response = await gateway.findById(1, 0);
        });

        it("Fetches the claim from the API", () => {
          expect(claimRequest.isDone()).toBeTruthy();
        });

        it("claims the response from the api", () => {
          expect(response.success).toEqual(true);
          expect(response.foundClaim.data).toEqual({ some: "data" });
          expect(response.foundClaim.schema).toEqual({ some: "schema" });
          expect(response.foundClaim.status).toEqual("Draft");
        });
      });

      describe("Example two", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = 'http://dog.woof/';
          locationGateway = {getRoot: () => 'https://example.com'};
          apiKeyGateway = {getApiKey: () => ({apiKey: 'doggy'})};

          claimRequest = nock('http://dog.woof')
            .matchHeader('Content-Type', 'application/json')
            .get('/claim/get?id=6&claimId=5')
            .reply(200, {data: {cats: 'meow'}, schema: {dogs: 'woof'}, status: 'Submitted'});
          let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
          response = await gateway.findById(5, 6);
        });

        it("Fetches the claim from the API", () => {
          expect(claimRequest.isDone()).toBeTruthy();
        });

        it("returns the response from the api", () => {
          expect(response.success).toEqual(true);
          expect(response.foundClaim.data).toEqual({ cats: "meow" });
          expect(response.foundClaim.schema).toEqual({ dogs: "woof" });
          expect(response.foundClaim.status).toEqual("Submitted");
        });
      });
    });

    describe("Given a claim is not found", () => {
      it("returns unsuccessful", async () => {
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/claim/get?id=6&claimId=5")
          .reply(404);
        let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        let response = await gateway.findById(5, 6);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Submit", () => {
    describe("Example one", () => {
      let gateway, submitClaimRequest, response;

      beforeEach(async () => {
        locationGateway = {getRoot: () => 'https://frontend.space'};

        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        submitClaimRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/claim/submit', {project_id: 1, claim_id: 1, data: {cats: 'meow'}, url: 'https://frontend.space/project/1/claim/1'})
          .reply(200);
          response = await gateway.submit(1, 1, { cats: "meow" });
      });

      it('Submits the data to the API', async () => {
        expect(submitClaimRequest.isDone()).toBeTruthy();
      });

      it('returns successful & the claim id', async () => {
        expect(response).toEqual({success: true});
      });
    });

    describe("Example two", () => {
      let gateway, response, submitClaimRequest;

      beforeEach(async () => {
        locationGateway = {getRoot: () => 'https://cathost.net'};
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        submitClaimRequest = nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/claim/submit', {project_id: 255, claim_id: 2, data: {dogs: 'woof'}, url: 'https://cathost.net/project/255/claim/2'})
          .reply(200);
        response = await gateway.submit(255, 2, { dogs: "woof" });
      });

      it('Submits the data to the API', async () => {
        expect(submitClaimRequest.isDone()).toBeTruthy();
      });

      it('returns successful & the claim id', async () => {
        expect(response).toEqual({success: true});
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        locationGateway = {getRoot: () => 'https://cathost.net'};
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
      });

      it('returns unsuccessful', async () => {
        nock('http://cat.meow')
          .matchHeader('Content-Type', 'application/json')
          .post('/claim/submit', {project_id: 255, claim_id: 2, data: {dogs: 'woof'}, url: 'https://cathost.net/project/255/claim/2'})
          .reply(500);
        let response = await gateway.submit(255, 2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe("#Create", () => {
    describe("Example one", () => {
      let gateway, createClaimRequest, response;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        createClaimRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/create", { project_id: 1, data: { cats: "meow" } })
          .reply(200, { id: 1 });
        response = await gateway.create(1, { cats: "meow" });
      });

      it("Submits the data to the API", async () => {
        expect(createClaimRequest.isDone()).toBeTruthy();
      });

      it("returns successful & the claim id", async () => {
        expect(response).toEqual({ success: true, claimId: 1 });
      });
    });

    describe("Example two", () => {
      let gateway, createClaimRequest, response;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        createClaimRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(200, { id: 2 });
        response = await gateway.create(2, { dogs: "woof" });
      });

      it("Submits the data to the API", async () => {
        expect(createClaimRequest.isDone()).toBeTruthy();
      });

      it("claims successful & the claim id", async () => {
        expect(response).toEqual({ success: true, claimId: 2 });
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
      });

      it("returns unsuccessful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(500);
        let response = await gateway.create(2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe("#Update", () => {
    describe("Example one", () => {
      let gateway, updateClaimRequest, response;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        updateClaimRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/update", {
            project_id: 9,
            claim_id: 1,
            claim_data: { cats: "meow" }
          })
          .reply(200);
        response = await gateway.update(9, 1, { cats: "meow" });
      });

      it("Submits the data to the API", async () => {
        expect(updateClaimRequest.isDone()).toBeTruthy();
      });

      it("returns successful", async () => {
        expect(response).toEqual({ success: true });
      });
    });

    describe("Example two", () => {
      let gateway, response, updateClaimRequest;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        updateClaimRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/update", {
            project_id: 4,
            claim_id: 2,
            claim_data: { dogs: "woof" }
          })
          .reply(200);
        response = await gateway.update(4, 2, { dogs: "woof" });
      });

      it("Submits the data to the API", async () => {
        expect(updateClaimRequest.isDone()).toBeTruthy();
      });

      it("returns successful", async () => {
        expect(response).toEqual({ success: true });
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
        gateway = new ClaimGateway(apiKeyGateway, locationGateway);
      });

      it("returns unsuccessful", async () => {
        nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/claim/update", {
            project_id: 12,
            claim_id: 2,
            claim_data: { dogs: "woof" }
          })
          .reply(500);
        let response = await gateway.update(12, 2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      });
    });
  });

  describe("#getBaseClaimFor", () => {
    describe("Given a claim is returned", () => {
      let request, response;

      describe("Example one", () => {
        beforeEach(async () => {
          apiKeyGateway = {getApiKey: () => ({apiKey: 'catz'})};
          process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
          request = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .matchHeader('API_KEY', 'catz')
            .get("/project/1/claim")
            .reply(200, {
              baseClaim: { data: { some: "data" }, schema: { some: "schema" }}
            });
          let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
          response = await gateway.getBaseClaimFor(1);
        });

        it("Fetches the claim from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          expect(response.success).toEqual(true);
          expect(response.baseClaim.data).toEqual({ some: "data" });
          expect(response.baseClaim.schema).toEqual({ some: "schema" });
        });
      });

      describe("Example two", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          apiKeyGateway = {getApiKey: () => ({apiKey: 'doggy'})};
          request = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .matchHeader('API_KEY', 'doggy')
            .get("/project/5/claim")
            .reply(200, {
              baseClaim: { data: { cats: "meow" }, schema: { dogs: "woof" } }
            });
          let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
          response = await gateway.getBaseClaimFor(5);
        });

        it("Fetches the claim from the API", () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          expect(response.success).toEqual(true);
          expect(response.baseClaim.data).toEqual({ cats: "meow" });
          expect(response.baseClaim.schema).toEqual({ dogs: "woof" });
        });
      });
    });

    describe("Given a claim is not returned", () => {
      it("Returns unsuccessful", async () => {
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/project/5/claim")
          .reply(404);
        let gateway = new ClaimGateway(apiKeyGateway, locationGateway);
        let response = await gateway.getBaseClaimFor(5);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#getClaims", () => {
    describe("Given at least one claim is found", () => {
      describe("Example one", () => {
        describe("Connection successful", () => {
          let returnRequest, response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            returnRequest = nock("http://cat.meow")
              .matchHeader("Content-Type", "application/json")
              .get("/project/1/claims")
              .reply(200, {
                claims: [
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

            let gateway = new ClaimGateway(apiKeyGateway);
            response = await gateway.getClaims(1);
          });

          it("Fetches the return from the API", () => {
            expect(returnRequest.isDone()).toBeTruthy();
          });

          it("Returns a response from the api", () => {
            expect(response.success).toEqual(true)
            expect(response.claims[0].id).toEqual(3)
            expect(response.claims[0].project_id).toEqual(1)
            expect(response.claims[0].updates).toEqual([{ cats: "meow" }])
            expect(response.claims[0].status).toEqual("Submitted")
            expect(response.claims[1].id).toEqual(4)
            expect(response.claims[1].project_id).toEqual(1)
            expect(response.claims[1].updates).toEqual([{ dogs: "woof" }])
            expect(response.claims[1].status).toEqual("Draft")
          });
        });

        describe("Connection unsuccessful", () => {
          let response;
          beforeEach(async () => {
            process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
            nock("http://cat.meow")
              .matchHeader("Content-Type", "application/json")
              .get("/project/1/claims")
              .socketDelay(2000);

            let gateway = new ClaimGateway(apiKeyGateway);
            response = await gateway.getClaims(1);
          });

          it("Returns success as false", () => {
            expect(response).toEqual({success: false});
          });
        });
      });

      describe("Given no claims are found", () => {
        it("Returns unsuccessful", async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          let returnRequest = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .get("/project/5/claims")
            .reply(404);
          let gateway = new ClaimGateway(apiKeyGateway);
          let response = await gateway.getClaims(5);
          expect(response).toEqual({ success: false });
        });
      });
    });
  });
});
