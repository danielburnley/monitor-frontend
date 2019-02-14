import fetch from 'isomorphic-fetch';
import ApiKey from '../../Domain/ApiKey';
import runtimeEnv from '@mars/heroku-js-runtime-env'
import UserRole from '../../Domain/UserRole';

export default class TokenGateway {
  constructor() {
    this.env = runtimeEnv()
  }

  async requestToken(email_address, url) {
    await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/request`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email_address, url}),
      },
    );
  }

  async getAccess(access_token) {
    let response = await fetch(
      `${this.env.REACT_APP_HIF_API_URL}token/expend`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({access_token}),
      },
    );

    if (response.ok) {
      let json_response = await response.json();
      return {
        apiKey: new ApiKey(json_response.apiKey),
        userRole: new UserRole(json_response.role)
      }
    } else {
      return null
    }
  }
}
