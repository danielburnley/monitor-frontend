export default class CanAccessProject {
  constructor(tokenGateway, apiKeyGateway, userRoleGateway, projectGateway) {
    this.tokenGateway = tokenGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.userRoleGateway = userRoleGateway;
    this.projectGateway = projectGateway;
  }

  async execute(access_token, project_id) {
    let project = await this.projectGateway.findById(project_id);

    if (project.success) {
      return {
        valid: true,
        apiKey: this.apiKeyGateway.getApiKey().apiKey,
        userRole: this.userRoleGateway.getUserRole().userRole
      };
    } else {
      let receivedApiKey = await this.tokenGateway.getAccess(access_token);
      if (receivedApiKey === null) {
        return { valid: false }
      } else {
        this.apiKeyGateway.setApiKey(receivedApiKey.apiKey.apiKey);
        this.userRoleGateway.setUserRole(receivedApiKey.userRole.userRole);
        return {
          valid: true,
          apiKey: receivedApiKey.apiKey.apiKey,
          userRole: receivedApiKey.userRole.userRole
        }
      }
    }
  }
}
