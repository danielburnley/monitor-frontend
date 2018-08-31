export default class RequestToken {
  constructor(requestTokenGateway) {
    this.requestTokenGateway = requestTokenGateway
  }

  execute(email_address, project_id, address) {
    this.requestTokenGateway.requestToken(email_address, project_id, address)
  }
}
