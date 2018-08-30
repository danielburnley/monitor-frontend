import fetch from 'isomorphic-fetch';
import ApiKey from '../../Domain/ApiKey';

export default class TokenGateway {
  async requestToken(email_address, project_id, url) {
    let response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}token/request`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',
          'API_KEY': window.apiKey},
        body: JSON.stringify({email_address, project_id, url}),
      },
    );
  }

  async getApiKey(access_token, project_id) {
    let response = await fetch(
      `${process.env.REACT_APP_HIF_API_URL}token/expend`,
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
