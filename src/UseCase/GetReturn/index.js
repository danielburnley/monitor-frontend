export default class GetReturn {
  constructor(returnGateway) {
    this.returnGateway = returnGateway;
  }

  execute(presenter, request) {
    let {success, foundReturn} = this.returnGateway.findById(request.id);
    if (success) {
      presenter.presentReturn(foundReturn);
    } else {
      presenter.presentReturnNotFound();
    }
  }
}
