export default class SubmitBaseline {
  constructor(baselinGateway) {
    this.baselinGateway = baselinGateway
  }

  async execute(presenterSpy, id) {
    let {success} = await this.baselinGateway.submit(id);

    if (success) {
      presenterSpy.submissionSuccessful(id);
    } else {
      presenterSpy.submissionUnsuccessful();
    }
  }
}
