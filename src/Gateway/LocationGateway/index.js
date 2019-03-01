export default class LocationGateway {
  constructor(window_location) {
    this.window_location = window_location;
  }

  getRoot() {
    return this.window_location.origin;
  }

  getProjectURL() {
    let path;
    if (this.window_location.pathname.substr(1,7) !== "project" ) {
      path = "/"
    } else {
      let projectId = this.window_location.pathname.substr(9, 1)
      path = `/project/${projectId}`
    }

    return this.window_location.origin + path
  }
};
