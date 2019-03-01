export default class CreateClaim {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let { success, claimId } = await this.claimGateway.create(
      request.projectId,
      request.data
    );

    if (success) {
      presenter.creationSuccessful(claimId);
    } else {
      presenter.creationUnsuccessful();
    }
  }
}

