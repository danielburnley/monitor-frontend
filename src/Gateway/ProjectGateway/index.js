import Project from "../../Domain/Project";
import Infrastructure from "../../Domain/Infrastructure";
import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class ProjectGateway {
  constructor(apiKeyGateway, locationGateway) {
    this.apiKeyGateway = apiKeyGateway;
    this.locationGateway = locationGateway
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
        projectResponse.status,
        projectResponse.type,
        projectResponse.timestamp
      );
      return { success: true, foundProject };
    } else {
      return { success: false };
    }
  }

  async getInfrastructures(projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${projectId}/infrastructures`,
      {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        }
      }
    );
    if (rawResponse.ok) {
      let response = await rawResponse.json();
      let infrastructures = response.infrastructures.map(infrastructure => (
        new Infrastructure(infrastructure)
      ))
      return { success: true, infrastructures: infrastructures};
    } else {
      return { success: false };
    }
  }

  async submit(project_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({
          url: `${await this.locationGateway.getRoot()}/project/${project_id}`,
          project_id
        })
      }
    );
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async unsubmit(project_id) {
    if(!process.env.REACT_APP_BACK_TO_BASELINE) return
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/unsubmit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({
          project_id
        })
      }
    );
    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async update(project_id, project_data, timestamp) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/update`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({ project_id, project_data, timestamp })
      }
    );

    if (response.ok) {
      let rawResponse  = await response.json();
      return { success: true, errors: rawResponse.errors, new_timestamp: rawResponse.timestamp};
    } else {
      return { success: false };
    }
  }

  async validate(project_id, type, data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/validate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({project_id, type, data })
      }
    );

    if (response.ok) {
      let response_json = await response.json();
      return {
        valid: response_json.valid,
        prettyInvalidPaths: response_json.prettyInvalidPaths,
        invalidPaths: response_json.invalidPaths,
      };
    }
  }

  async create(name, type, bid_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({name, type, bid_id})
      }
    );

    if (response.ok) {
      let response_json = await response.json();
      return {
        success: true,
        id: response_json.projectId
      };
    } else {
      return { success: false }
    }
  }

  async addUser(project_id, users) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${project_id}/add_users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({users})
      }
    );

    if (response.ok) return { success: true };
    return { success: false }
  }
}
