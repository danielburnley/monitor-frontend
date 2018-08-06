export default class SubmitReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.submit(
      request.returnId,
      request.data
    );

    if (success) {
      presenter.submissionSuccessful(returnId);
    } else {
      presenter.submissionUnsuccessful();
    }
  }
}
