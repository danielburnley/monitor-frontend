export default class ValidateReturn {
  constructor(validationGateway, presenter) {
    this.validationGateway = validationGateway;
    this.presenter = presenter;
  }
  execute(schema) {
    let {valid, invalid_paths} = this.validationGateway.validate(schema);
    this.presenter.invalidateFields(invalid_paths);
  }
}
