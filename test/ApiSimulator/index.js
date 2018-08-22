import nock from "nock";

class APISimulator {
  constructor(url) {
    this.url = url;
  }

  getProject(schema, data) {
    let response = { schema, data };
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/find?id=0");
    return new APIResponse(projectRequest, response);
  }

  getBaseReturn(schema = {}, data = {}) {
    let response = { baseReturn: { schema, data } };
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/0/return");
    return new APIResponse(returnRequest, response);
  }

  getReturn(schema = {}, data = {}) {
    let response = { schema, data };
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/return/get?id=0");
    return new APIResponse(returnRequest, response);
  }

  expendToken(token) {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/token/expend", { access_token: token });

    return new APIResponse(request, { apiKey: "abc" });
  }
}

class APIResponse {
  constructor(request, response = {}) {
    this.request = request;
    this.response = response;
  }

  successfully(status = 200) {
    this.request.reply(status, this.response);
  }

  unsuccessfully() {
    this.request.reply(500);
  }

  unauthorised() {
    this.request.reply(401);
  }
}

export default APISimulator;
