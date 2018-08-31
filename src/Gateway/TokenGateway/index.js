import fetch from 'isomorphic-fetch';
import ApiKey from '../../Domain/ApiKey';
import runtimeEnv from '@mars/heroku-js-runtime-env'

export default class TokenGateway {
  constructor() {
    this.env = runtimeEnv()
  }
  async requestToken(email_address, url) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/request`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': window.apiKey},
        body: JSON.stringify({email_address, url}),
      },
    );
  }

  async getApiKey(access_token) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/expend`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({access_token}),
      },
    );

    if (response.ok) {
      return new ApiKey((await response.json()).apiKey)
    } else {
      return null
    }
  }
}
