export default class ValidateReturn {
  constructor(validationGateway) {
    this.validationGateway = validationGateway;
  }

  async execute(presenter, project_id, data, type) {
    let {valid, prettyInvalidPaths} = await this.validationGateway.validate(project_id, data, type);

    if (!valid) {
      await presenter.invalidateFields(prettyInvalidPaths);
    }
  }
}
