export default class Logout {
  constructor(cookieApiKeyGateway) {
    this.cookieApiKeyGateway = cookieApiKeyGateway;
  }

  execute(presenter) {
    this.cookieApiKeyGateway.clear();
    presenter.userLoggedOut();
  }
}
