export default class ValidateProject {
  constructor(validationGateway) {
    this.validationGateway = validationGateway;
  }

  async execute(presenter, type, data) {
    let { valid, prettyInvalidPaths } = await
    this.validationGateway.validate(type, data);

    if(!valid) {
      presenter.invalidateFields(prettyInvalidPaths);
    }
  }
}
