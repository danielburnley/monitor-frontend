export default class RequestToken {
  constructor(requestTokenGateway) {
    this.requestTokenGateway = requestTokenGateway
  }

  execute(email_address, address) {
    this.requestTokenGateway.requestToken(email_address, address)
  }
}
