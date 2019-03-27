export default class GetClaims {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let { success, claims } = await this.claimGateway.getClaims(
      request.projectId
    );
    if (success) {
      presenter.presentClaims(claims);
    } else {
      presenter.presentClaimsNotFound();
    }
  }
}
