export default class GetBaseClaim {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let { success, baseClaim } = await this.claimGateway.getBaseClaimFor(request.projectId);
    if (success) {
      presenter.presentClaim(baseClaim)
    } else {
      presenter.presentClaimNotFound()
    }
  }
}
