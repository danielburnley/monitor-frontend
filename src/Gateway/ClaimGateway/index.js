import fetch from 'isomorphic-fetch';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ClaimGateway {
  constructor(apiKeyGateway, locationGateway) {
    this.locationGateway = locationGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.env = runtimeEnv();
  }

  async getClaims(projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${projectId}/claims`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    ).catch(() => ({ ok: false }));

    if (!rawResponse.ok) return {success: false};

    let response = await rawResponse.json();
    let claims = response.claims;

    return {success: true, claims: claims};
  }

  async findById(id, projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}claim/get?id=${projectId}&claimId=${id}`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    );
    if (rawResponse.ok) {
      let foundClaim = await rawResponse.json();
      return {success: true, foundClaim};
    } else {
      return {success: false};
    }
  }

  async getBaseClaimFor(projectId) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}project/${projectId}/claim`,
      {
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
      },
    );
    if (rawResponse.ok) {
      let response = await rawResponse.json();
      return {success: true, baseClaim: response.baseClaim};
    } else {
      return {success: false};
    }
  }

  async create(project_id, data) {
    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}claim/create`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({project_id, data}),
      },
    );

    if (rawResponse.ok) {
      let jsonResponse = await rawResponse.json();
      return {success: true, claimId: jsonResponse.id};
    } else {
      return {success: false};
    }
  }

  async update(project_id, claim_id, claim_data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}claim/update`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({project_id, claim_id, claim_data}),
      },
    );

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }

  async submit(project_id, claim_id, data) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}claim/submit`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({
          project_id,
          claim_id,
          data,
          url: `${await this.locationGateway.getRoot()}/project/${project_id}/claim/${claim_id}`
        }),
      },
    );

    if (response.ok) {
      return {success: true};
    } else {
      return {success: false};
    }
  }

  async validate(project_id, data, type) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}claim/validate`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': this.apiKeyGateway.getApiKey().apiKey},
        body: JSON.stringify({type, project_id, data}),
      },
    ).catch(() => ({ ok: false }));;

    if (response.ok) {
      let response_json = await response.json();
      return {
        valid: response_json.valid,
        invalidPaths: response_json.invalidPaths,
        prettyInvalidPaths: response_json.prettyInvalidPaths,
        success: true
      }
    } else {
      return {success: false};
    }
  }
}
