import nock from "nock";

class APISimulator {
  constructor(url) {
    this.url = url;
  }

  getBaseline(type, projectSchema) {
    let response = {projectSchema};
    let baselineRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get(`/baseline/${type}`);
    return new APIResponse(baselineRequest, response);
  }
  createProject(data, id) {
    let response = {id};
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/create", data);

      return new APIResponse(projectRequest, response);
  }

  updateProject(project_data, project_id, response = {errors: []}, timestamp = "0") {
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .persist()
      .post("/project/update", {project_id: ""+project_id, project_data, timestamp});

    return new APIResponse(projectRequest, response);
  }

  validateProject(project_id, type, data, response) {
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/validate", {project_id: ""+project_id, type, data});

    return new APIResponse(projectRequest, response);
  }

  submitProject(project_id) {
    let response = { };
    let projectRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/project/submit", { url: `${window.location.origin}/project/${project_id}`, project_id: ""+project_id});

    return new APIResponse(projectRequest, response);
  }

  getProject(schema, data, status, type, timestamp = 0) {
    let response = { schema, data, status, type, timestamp };
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
      .get("/return/get?id=0&returnId=1");
    return new APIResponse(returnRequest, response);
  }

  getReturns(data = {}) {
    let response = data;
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/project/0/returns");
    return new APIResponse(returnRequest, response);
  }

  getUserProjects(project_list = []) {
    let response = { project_list } ;
    let returnRequest = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .get("/user/projects");
    return new APIResponse(returnRequest, response);
  }

  expendEmptyTokenForProject() {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/token/expend", {});

    return new APIResponse(request, { apiKey: "abc", role: "Homes England" });
  }

  expendToken(access_token, role = "Homes England") {
    let request = nock(this.url)
      .matchHeader("Content-Type", "application/json")
      .post("/token/expend", { access_token });

    return new APIResponse(request, { apiKey: "abc", role: "Homes England" });
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
