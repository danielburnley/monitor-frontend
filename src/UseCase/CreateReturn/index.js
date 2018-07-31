export default class CreateReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.submit(
      request.projectId,
      request.data
    );

    if (success) {
      presenter.submissionSuccessful(returnId);
    } else {
      presenter.submissionUnsuccessful();
    }
  }
}
