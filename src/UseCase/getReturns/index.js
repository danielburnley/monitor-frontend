export default class GetReturns {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let x = await this.returnGateway.getReturns(
      request.projectId
    );
    let { success, returns } = x
    if (success) {
      presenter.presentReturns({data: returns});
    } else {
      presenter.presentReturnNotFound();
    }
  }
}
