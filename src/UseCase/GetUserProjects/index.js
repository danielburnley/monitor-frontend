
export default class GetUserProjects {
  constructor(userGateway) {
    this.userGateway = userGateway
  }

  async execute(presenter) {
    let { success, projectList } = this.userGateway.getProjects()
    if(success) {
      presenter.presentProjectList(projectList)
    }
  }
}