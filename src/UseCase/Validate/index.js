export default class Validate {
  constructor(validationGateway) {
    this.validationGateway = validationGateway;
  }

  async execute(presenter, project_id, type, data) {
    let {success, valid, prettyInvalidPaths } =
      await this.validationGateway.validate(project_id, type, data);

    if (success)
    {
      if (valid) {
        await presenter.validationSuccessful();
      } else {
        await presenter.invalidateFields(prettyInvalidPaths);
      }
    }
    else
    {
      await presenter.validationUnsuccessful();
    }
  }
}
