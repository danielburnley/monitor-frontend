export default class CreateReturn {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, formData) {
    let {id, status} = await this.projectGateway.create(formData);
    if (status === "success")
    {
      presenter.creationSuccess(id);
    } else {
      presenter.creationFailure();
    }
  }
}
