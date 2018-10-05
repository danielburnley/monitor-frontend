import fetch from 'isomorphic-fetch';
import ApiKey from '../../Domain/ApiKey';
import runtimeEnv from '@mars/heroku-js-runtime-env'

export default class TokenGateway {
  constructor() {
    this.env = runtimeEnv()
  }

  async requestToken(email_address, project_id, url) {
    await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/request`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email_address, project_id, url}),
      },
    );
  }

  async getApiKey(access_token, project_id) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/expend`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({access_token, project_id}),
      },
    );

    if (response.ok) {
      return new ApiKey((await response.json()).apiKey)
    } else {
      return null
    }
  }
}
