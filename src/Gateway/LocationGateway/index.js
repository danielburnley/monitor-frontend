export default class LocationGateway {
  constructor(window_location) {
    this.window_location = window_location;
  }

  async getRoot() {
    return this.window_location.origin;
  }
};
