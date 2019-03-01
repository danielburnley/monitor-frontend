export default class UpdateClaim {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let { success, id } = await this.claimGateway.update(
      request.projectId,
      request.id,
      request.data
    );

    if (success) {
      presenter.updateSuccessful(id);
    } else {
      presenter.updateUnsuccessful();
    }
  }
}
