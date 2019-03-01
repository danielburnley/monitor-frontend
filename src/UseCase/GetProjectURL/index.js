export default class GetProjectURL {
  constructor(locationGateway) {
    this.locationGateway = locationGateway
  }

  execute = () => {
    return this.locationGateway.getProjectURL()
  }
}