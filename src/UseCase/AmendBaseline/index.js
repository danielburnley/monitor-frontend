export default class AmendBaseline {
  constructor(baselineGateway) {
    this.baselineGateway = baselineGateway
  }

  async execute(presenter, request) {
    let { success, baselineId, errors, timestamp } = await this.baselineGateway.amend(request.projectId, request.data, request.timestamp)

    if(success) {
      presenter.amendBaselineSuccess({ baselineId, errors, timestamp });
    } else {
      presenter.amendBaselineFailure();
    }
  }
}
