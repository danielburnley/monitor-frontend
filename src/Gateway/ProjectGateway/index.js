import Project from "../../Domain/Project";
import Infrastructure from "../../Domain/Infrastructure";
import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class ProjectGateway {
  constructor(apiKeyGateway, locationGateway) {
    this.apiKeyGateway = apiKeyGateway;
    this.locationGateway = locationGateway;
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
    ).catch(() => ({ ok: false }));

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
    ).catch(() => ({ ok: false }));

    if (rawResponse.ok) {
      let response = await rawResponse.json();
      let infrastructures = response.infrastructures;
      let compiled_infras = [];
      Object.values(infrastructures).forEach(infrastructures => {
        infrastructures.forEach(infrastructure =>
          compiled_infras.push(new Infrastructure(infrastructure))
        );
      });

      return { success: true, infrastructures: compiled_infras };
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
    ).catch(() => ({ ok: false }));

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
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      let rawResponse = await response.json();
      return {
        success: true,
        errors: rawResponse.errors,
        new_timestamp: rawResponse.timestamp
      };
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
        body: JSON.stringify({ project_id, type, data })
      }
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      let response_json = await response.json();
      return {
        success: true,
        valid: response_json.valid,
        prettyInvalidPaths: response_json.prettyInvalidPaths,
        invalidPaths: response_json.invalidPaths
      };
    } else {
      return { success: false };
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
        body: JSON.stringify({ name, type, bid_id })
      }
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      let response_json = await response.json();
      return {
        success: true,
        id: response_json.projectId
      };
    } else {
      return { success: false };
    }
  }

  async addUser(project_id, users) {
    let users_to_add;

    if (users === undefined) {
      users_to_add = { users: [{ self: true }] };
    } else {
      users_to_add = { users };
    }

    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${project_id}/add_users`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify(users_to_add)
      }
    ).catch(() => ({ ok: false }));

    if (response.ok) return { success: true };
    return { success: false };
  }

  async overview({ projectId }) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${projectId}/overview`,
      {
        headers: { "Content-Type": "application/json", API_KEY: this.apiKey() }
      }
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      let jsonResponse = await response.json();
      return { success: true, overview: jsonResponse };
    } else {
      return { success: false };
    }
  }

  apiKey() {
    return this.apiKeyGateway.getApiKey().apiKey;
  }
}
