export default class AddUsersToProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, projectId, users) {
    let {success} = await this.projectGateway.addUser(projectId, users);
    if (success) {
      presenter.userAddedSuccess();
    } else {
      presenter.userAddedFailure();
    }
  }
}
