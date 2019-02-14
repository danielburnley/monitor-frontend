export default class GetUserProjects {
  constructor(userGateway) {
    this.userGateway = userGateway
  }

  async execute(presenter) {
    let gatewayResponse = await this.userGateway.getProjects()
    if(gatewayResponse.success) {
      presenter.presentProjectList(gatewayResponse.projectList);
    } else {
      presenter.presentProjectListNotFound();
    }
  }
}