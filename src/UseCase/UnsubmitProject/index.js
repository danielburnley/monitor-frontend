export default class UnsubmitProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenterSpy, id) {
    if (!process.env.REACT_APP_BACK_TO_BASELINE) return
    let {success} = await this.projectGateway.unsubmit(id);

    if (success) {
      presenterSpy.unsubmitSuccess(id);
    } else {
      presenterSpy.unsubmitFailure();
    }
  }
}
