export default class UpdateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, id, projectData, timestamp) {
    let {success, errors, new_timestamp} = await this.projectGateway.update(id, projectData, timestamp);
    if (success) {
      presenter.projectUpdated(errors, new_timestamp);
    } else {
      presenter.projectNotUpdated();
    }
  }
}
