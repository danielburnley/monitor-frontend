export default class CanAccessProject {
  constructor(tokenGateway) {
    this.tokenGateway = tokenGateway;
  }

  async execute(access_token, project_id) {
    let receivedApiKey = await this.tokenGateway.getApiKey(access_token, project_id);
    if (receivedApiKey === null) {
      return { valid: false }
    } else {
      return { valid: true, apiKey: receivedApiKey.apiKey}
    }
  }
}
