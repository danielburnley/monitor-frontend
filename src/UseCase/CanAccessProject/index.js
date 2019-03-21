export default class CanAccessProject {
  constructor(tokenGateway, apiKeyCookieGateway, userRoleGateway, apiKeyGateway) {
    this.tokenGateway = tokenGateway;
    this.apiKeyCookieGateway = apiKeyCookieGateway;
    this.userRoleGateway = userRoleGateway;
    this.apiKeyGateway = apiKeyGateway;
  }

  async execute(access_token, project_id) {
    let apikey_info = await this.apiKeyGateway.check(project_id);

    if (apikey_info.valid) {
      let userRole = apikey_info.role;
      this.userRoleGateway.setUserRole(userRole);

      return {
        valid: true,
        apiKey: this.apiKeyCookieGateway.getApiKey().apiKey,
        userRole
      };
    } else {
      let receivedApiKey = await this.tokenGateway.getAccess(access_token);
      if (receivedApiKey === null) {
        return { valid: false }
      } else {
        this.apiKeyCookieGateway.setApiKey(receivedApiKey.apiKey.apiKey);
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
