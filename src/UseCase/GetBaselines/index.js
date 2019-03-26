export default class GetBaselines {
  constructor(baselineGateway) {
    this.baselineGateway = baselineGateway
  }

  async execute(presenter, request) {
    let {success, baselines} = await this.baselineGateway.getAllBaselines(request.id)
    if(success) {
      presenter.presentBaselines(baselines)
    } else {
      presenter.presentBaselinesNotFound()
    }
  }
}
