export default class GetProject {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  execute(presenter, request) {
    let {success, foundProject} = this.projectGateway.findById(request.id)
    if(success) {
      presenter.presentProject(foundProject)
    } else {
      presenter.presentProjectNotFound()
    }
  }
}

