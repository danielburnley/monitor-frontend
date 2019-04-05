export default class UpdateProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, request) {
    let {success, errors, new_timestamp} = await this.projectGateway.update(request.projectId, request.data, request.timestamp);

    if (success) {
      await presenter.projectUpdated(errors, new_timestamp);
    } else {
      await presenter.projectNotUpdated();
    }
  }
}
