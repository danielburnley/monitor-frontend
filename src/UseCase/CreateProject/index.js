export default class CreateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, name, type) {
    let {id, success} = await this.projectGateway.create(name, type);
    if (success) {
      presenter.creationSuccess(id.id);
    } else {
      presenter.creationFailure();
    }
  }
}
