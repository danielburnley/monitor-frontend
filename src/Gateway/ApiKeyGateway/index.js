import fetch from 'isomorphic-fetch';
import runtimeEnv from '@mars/heroku-js-runtime-env';

export default class ApiKeyGateway {
  constructor(apiKeyGateway) {
    this.env = runtimeEnv();
    this.apiKeyGateway = apiKeyGateway;
  }

  async check(project_id = null) {
    let apikey = this.apiKeyGateway.getApiKey().apiKey;

    let rawResponse = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}apikey/check`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': apikey},
        body: JSON.stringify({project_id}),
      }
    )
    .catch((e) => {
      return { ok: false, timedout: true };
    });

    if (rawResponse.ok) {
      let response = await rawResponse.json();
      return {success: true, valid: true, email: response.email, role: response.role};
    } else if (rawResponse.timedout) {
      return {success: false };
    } else {
      return {success: true, valid: false};
    }
  }
}
