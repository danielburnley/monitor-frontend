
export default class GetInfrastructures {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  execute = async (presenter, projectId) => {
    let response = await this.projectGateway.getInfrastructures(projectId)
    if (response.success) {
      presenter.presentInfrastructures(response.infrastructures)
    } else {
      presenter.presentProjectNotFound()
    }
  }
}