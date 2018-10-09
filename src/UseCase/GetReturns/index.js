export default class GetReturns {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, returns } = await this.returnGateway.getReturns(
      request.projectId
    );
    if (success) {
      presenter.presentReturns({ data: returns });
    } else {
      presenter.presentReturnNotFound();
    }
  }
}
