export default class SubmitProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenterSpy, id) {
    let {success} = await this.projectGateway.submit(id);

    if (success) {
      presenterSpy.creationSuccess(id);
    } else {
      presenterSpy.creationFailure();
    }
  }
}
