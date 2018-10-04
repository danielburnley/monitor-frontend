export default class CanAccessProject {
  constructor(tokenGateway, apiKeyGateway, projectGateway) {
    this.tokenGateway = tokenGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.projectGateway = projectGateway;
  }

  async execute(access_token, project_id) {
    //Instead of straight up getting the api key we should first test the api key in our cookie to see if we can use that to access it
    //We also need to save the new apikey
    let project = await this.projectGateway.findById(project_id);

    if (project.success) {
      return { valid: true, apiKey: this.apiKeyGateway.getApiKey().apiKey};
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
