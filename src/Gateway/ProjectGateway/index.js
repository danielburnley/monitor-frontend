import Project from "../../Domain/Project";
import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class ProjectGateway {
  constructor(apiKeyGateway) {
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async findById(id) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/find?id=${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        }
      }
    );
    if (rawResponse.ok) {
      let projectResponse = await rawResponse.json();
      let foundProject = new Project(
        projectResponse.data,
        projectResponse.schema,
        projectResponse.status
      );
      return { success: true, foundProject };
    } else {
      return { success: false };
    }
  }

  async submit(project_id) {
    let response = await fetch(`${this.env.REACT_APP_HIF_API_URL}project/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        API_KEY: this.apiKeyGateway.getApiKey().apiKey
      },
      body: JSON.stringify({
        project_id
      })
    });
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async update(project_id, project_data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({ project_id, project_data })
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  }
}
