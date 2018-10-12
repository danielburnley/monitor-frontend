export default class UpdateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, id, projectData) {
    let {success} = await this.projectGateway.update(id, projectData);
    if (success) {
      presenter.projectUpdated();
    } else {
      presenter.projectNotUpdated();
    }
  }
}
