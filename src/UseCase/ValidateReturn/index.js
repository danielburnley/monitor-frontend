export default class ValidateReturn {
  constructor(validationGateway) {
    this.validationGateway = validationGateway;
  }

  async execute(presenter, project_id, data) {
    let {valid, invalidPaths} = await this.validationGateway.validate(project_id, data);
    
    if (!valid) {
      await presenter.invalidateFields(invalidPaths);
    }
  }
}
