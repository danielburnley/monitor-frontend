import fetch from "isomorphic-fetch";
import runtimeEnv from "@mars/heroku-js-runtime-env";

export default class BaselineGateway {
  constructor(apiKeyGateway) {
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async submit(baseline_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}baseline/submit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        },
        body: JSON.stringify({
          baseline_id
        })
      }
    ).catch(() => ({ ok: false }));

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false };
    }
  }

  async amend(project_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}baseline/amend`,
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
    ).catch(() => ({ ok: false }))

    if (response.ok) {
      let rawResponse = await response.json();
      return {
        success: true,
        baselineId: rawResponse.baselineId,
        errors: rawResponse.errors
      }
    } else {
      return { success: false }
    }
  }

  async getAllBaselines(project_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${project_id}/baselines`,
      {
        headers: {
          "Content-Type": "application/json",
          API_KEY: this.apiKeyGateway.getApiKey().apiKey
        }
      }
    ).catch(() => ({ ok: false }))

    if (response.ok) {
      let rawResponse = await response.json();
      return {
        success: true,
        baselines: rawResponse.baselines
      }
    } else {
      return { success: false }
    }
  }
}
