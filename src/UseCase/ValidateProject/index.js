export default class ValidateProject {
  constructor(validationGateway) {
    this.validationGateway = validationGateway;
  }

  async execute(presenter, project_id, type, data) {
    let { valid, prettyInvalidPaths } = await
    this.validationGateway.validate(project_id, type, data);

    if(!valid) {
      presenter.invalidateFields(prettyInvalidPaths);
    }
  }
}
