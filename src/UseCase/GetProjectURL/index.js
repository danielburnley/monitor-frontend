export default class GetProjectURL {
  constructor(locationGateway) {
    this.locationGateway = locationGateway
  }

  execute = (projectID) => {
    return this.locationGateway.getProjectURL(projectID)
  }
}