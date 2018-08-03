export default class CreateReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returnId } = await this.returnGateway.create(
      request.projectId,
      request.data
    );

    if (success) {
      presenter.creationSuccessful(returnId);
    } else {
      presenter.creationUnsuccessful();
    }
  }
}

