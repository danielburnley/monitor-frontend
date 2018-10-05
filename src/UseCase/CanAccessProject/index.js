export default class CanAccessProject {
  constructor(tokenGateway, apiKeyGateway, projectGateway) {
    this.tokenGateway = tokenGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.projectGateway = projectGateway;
  }

  async execute(access_token, project_id) {
    let project = await this.projectGateway.findById(project_id);

    if (project.success) {
      return { valid: true, apiKey: this.apiKeyGateway.getApiKey().apiKey };
    } else {
      let receivedApiKey = await this.tokenGateway.getApiKey(access_token, project_id);
      if (receivedApiKey === null) {
        return { valid: false }
      } else {
        this.apiKeyGateway.setApiKey(receivedApiKey.apiKey);
        return { valid: true, apiKey: receivedApiKey.apiKey}
      }
    }
  }
}
