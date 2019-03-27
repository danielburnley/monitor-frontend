export default class UpdateSubmittedReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.update(
      request.projectId,
      request.id,
      request.data
    );

    if (success) {
      presenter.updateSubmittedSuccessful(returnId);
    } else {
      presenter.updateSubmittedUnsuccessful();
    }
  }
}
