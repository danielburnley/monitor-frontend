import Project from "../../Domain/Project";
import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class UserGateway {
  constructor(apiKeyGateway) {
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async getProjects() {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}user/projects`,
      {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        }
      }
    );
    if (rawResponse.ok) {
      let response = await rawResponse.json();
      let projectList = response.project_list.map(project => 
        new Project({}, null, project.status, project.type, null, project.name, project.id)
      );
      return { success: true, projectList };
    } else {
      return { success: false };
    }
  }
}