export default class CreateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, name, type, bidId) {
    let {id, success} = await this.projectGateway.create(name, type, bidId);
    
    if (success) {
      presenter.creationSuccess(id.id);
    } else {
      presenter.creationFailure();
    }
  }
}
