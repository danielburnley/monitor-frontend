export default class CanAccessProject {
  constructor(tokenGateway, apiKeyGateway, userRoleGateway, ) {
    this.tokenGateway = tokenGateway;
    this.apiKeyGateway = apiKeyGateway;
    this.userRoleGateway = userRoleGateway;
  }

  async execute(access_token) {
    console.log(this.apiKeyGateway.getApiKey())
    if(this.apiKeyGateway.getApiKey().apiKey) {
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
