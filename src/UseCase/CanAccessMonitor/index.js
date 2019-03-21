export default class CanAccessMonitor {
  constructor(tokenGateway, apiKeyStorageGateway, userRoleGateway, apiKeyGateway) {
    this.tokenGateway = tokenGateway;
    this.apiKeyStorageGateway = apiKeyStorageGateway;
    this.userRoleGateway = userRoleGateway;
    this.apiKeyGateway = apiKeyGateway;
  }

  async execute(access_token) {
    let apiKey = this.apiKeyStorageGateway.getApiKey().apiKey;
    if(apiKey) {
      let apikey_info = await this.apiKeyGateway.check();
      let userRole = apikey_info.role;
      this.userRoleGateway.setUserRole(userRole);

      return {
        valid: true,
        apiKey,
        userRole
      };
    } else {
      let receivedApiKey = await this.tokenGateway.getAccess(access_token);
      if (receivedApiKey === null) {
        return { valid: false }
      } else {
        this.apiKeyStorageGateway.setApiKey(receivedApiKey.apiKey.apiKey);
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
