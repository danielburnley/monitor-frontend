export default class GetBaseReturnForProject {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  async execute(presenter, request) {
    let { success, foundReturn } = await this.returnGateway.baseReturnFor(request.projectId);
    if (success) {
      presenter.presentReturn(foundReturn)
    } else {
      presenter.presentReturnNotFound()
    }
  }
}
