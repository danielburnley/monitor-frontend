export default class AmendBaseline {
  constructor(baselineGateway) {
    this.baselineGateway = baselineGateway
  }

  execute(presenter, request) {
    let { success, baselineId, errors, timestamp } = this.baselineGateway.amend(request.projectId, request.data, request.timestamp)

    if(success) {
      presenter.amendProjectSuccess({ baselineId, errors, timestamp });
    } else {
      presenter.amendProjectFailure();
    }
  }
}
