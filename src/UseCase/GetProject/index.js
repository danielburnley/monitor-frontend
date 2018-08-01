export default class GetProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  async execute(presenter, request) {
    let {success, foundProject} = await this.projectGateway.findById(request.id)
    if(success) {
      presenter.presentProject(foundProject)
    } else {
      presenter.presentProjectNotFound()
    }
  }
}
