export default class GetClaim {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let {success, foundClaim} = await this.claimGateway.findById(request.id, request.projectId);
    if (success) {
      presenter.presentClaim(foundClaim);
    } else {
      presenter.presentClaimNotFound();
    }
  }
}
