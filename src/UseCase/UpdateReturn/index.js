export default class UpdateReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.update(
      request.projectId,
      request.returnId,
      request.data
    );

    if (success) {
      presenter.updateSuccessful(returnId);
    } else {
      presenter.updateUnsuccessful();
    }
  }
}
