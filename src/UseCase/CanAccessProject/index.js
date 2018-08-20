export default class CanAccessProject {
  constructor(tokenGateway) {
    this.tokenGateway = tokenGateway;
  }

  async execute(access_token) {
    let receivedApiKey = await this.tokenGateway.getApiKey(access_token);
    if (receivedApiKey === null) {
      return { valid: false }
    } else {
      return { valid: true, apiKey: receivedApiKey.apiKey}
    }
  }
}
