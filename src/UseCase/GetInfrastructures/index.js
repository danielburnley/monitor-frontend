
export default class GetInfrastructures {
  constructor(projectGateway) {
    this.projectGateway = projectGateway
  }

  execute = async (presenter, projectId) => {
    let response = await this.projectGateway.getInfrastructures(projectId)
    if (response.success) {
      let infrastructures = response.infrastructures.map(infrastructure => infrastructure.data)
      presenter.presentInfrastructures(infrastructures)
    } else {
      presenter.presentProjectNotFound()
    }
  }
}