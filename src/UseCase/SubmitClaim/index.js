export default class SubmitClaim {
  constructor(claimGateway) {
    this.claimGateway = claimGateway;
  }

  async execute(presenter, request) {
    let { success, id } = await this.claimGateway.submit(
      request.projectId,
      request.id,
      request.data
    );

    if (success) {
      presenter.submissionSuccessful(id);
    } else {
      presenter.submissionUnsuccessful();
    }
  }
}
