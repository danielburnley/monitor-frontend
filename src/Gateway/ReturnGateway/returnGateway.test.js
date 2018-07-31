import nock from "nock";
import ReturnGateway from ".";

describe("Return Gateway", () => {
  afterEach(() => {
    nock.cleanAll();
  });

  describe("#FindById", () => {
    describe("Given a Return is found", () => {
      let returnRequest, response;

      describe("Example one", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
          returnRequest = nock("http://cat.meow")
            .matchHeader("Content-Type", "application/json")
            .get("/return/get?id=1")
            .reply(200, { some: "data" });
          let gateway = new ReturnGateway();
          response = await gateway.findById(1);
        });

        it("Fetches the return from the API", () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          expect(response).toEqual({
            success: true,
            foundReturn: { some: "data" }
          });
        });
      });

      describe("Example two", () => {
        beforeEach(async () => {
          process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
          let returnRequest = nock("http://dog.woof")
            .matchHeader("Content-Type", "application/json")
            .get("/return/get?id=5")
            .reply(200, { other: "things" });
          let gateway = new ReturnGateway();
          response = await gateway.findById(5);
        });

        it("Fetches the return from the API", () => {
          expect(returnRequest.isDone()).toBeTruthy();
        });

        it("Returns the response from the api", () => {
          expect(response).toEqual({
            success: true,
            foundReturn: { other: "things" }
          });
        });
      });
    });

    describe("Given a return is not found", () => {
      it("Returns unsuccessful", async () => {
        process.env.REACT_APP_HIF_API_URL = "http://dog.woof/";
        let returnRequest = nock("http://dog.woof")
          .matchHeader("Content-Type", "application/json")
          .get("/return/get?id=5")
          .reply(404);
        let gateway = new ReturnGateway();
        let response = await gateway.findById(5);
        expect(response).toEqual({ success: false });
      });
    });
  });

  describe("#Submit", () => {
    describe("Example one", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ReturnGateway();
      });

      it("Submits the data to the API", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 1, data: { cats: "meow" } })
          .reply(200, { id: 1 });
        await gateway.submit(1, { cats: "meow" });

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it("Returns successful & the return id", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 1, data: { cats: "meow" } })
          .reply(200, { id: 1 });
        let response = await gateway.submit(1, { cats: "meow" });
        expect(response).toEqual({ success: true, returnId: 1 });
      });
    });

    describe("Example two", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ReturnGateway();
      });

      it("Submits the data to the API", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(200, { id: 2 });
        await gateway.submit(2, { dogs: "woof" });

        expect(createReturnRequest.isDone()).toBeTruthy();
      });

      it("Returns successful & the return id", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(200, { id: 2 });
        let response = await gateway.submit(2, { dogs: "woof" });
        expect(response).toEqual({ success: true, returnId: 2 });
      });
    });

    describe("With an unsuccessful response", () => {
      let gateway;

      beforeEach(async () => {
        process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
        gateway = new ReturnGateway();
      });

      it("Returns unsuccessful", async () => {
        let createReturnRequest = nock("http://cat.meow")
          .matchHeader("Content-Type", "application/json")
          .post("/return/create", { project_id: 2, data: { dogs: "woof" } })
          .reply(500);
        let response = await gateway.submit(2, { dogs: "woof" });

        expect(response.success).toBeFalsy();
      }); 
    });
  });
});
