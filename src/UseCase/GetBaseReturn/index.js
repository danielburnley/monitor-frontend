export default class GetBaseReturnForProject {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  execute(presenter, request) {
    let { success, foundReturn } = this.returnGateway.baseReturnFor(request.projectId);
    if(success) {
      presenter.presentReturn(foundReturn)
    } else {
      presenter.presentReturnNotFound()
    }
  }
}
