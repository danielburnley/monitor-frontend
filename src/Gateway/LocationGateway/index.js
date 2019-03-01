export default class LocationGateway {
  constructor(window_location) {
    this.window_location = window_location;
  }

  getRoot() {
    return this.window_location.origin;
  }

  getProjectURL(projectId) {
    let path = `/project/${projectId}`

    return this.window_location.origin + path
  }
};
