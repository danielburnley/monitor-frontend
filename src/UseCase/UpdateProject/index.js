export default class UpdateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, id, projectData, timestamp) {
    let {success, errors} = await this.projectGateway.update(id, projectData, timestamp);
    if (success) {
      presenter.projectUpdated(errors);
    } else {
      presenter.projectNotUpdated();
    }
  }
}
