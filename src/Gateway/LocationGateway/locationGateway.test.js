import LocationGateway from '.';

describe('Location Gateway', () => {
  let gateway;
  //Make it take a window location object in the constructor
  describe('Example 1', () => {
    beforeEach(async () => {
      let window_location_stub = {origin: "https://frontend.net"}
      gateway = new LocationGateway(window_location_stub);
    });

    it('gets the root', async () => {
      expect(await gateway.getRoot()).toEqual("https://frontend.net")
    });
  });

  describe('Example 2', () => {
    beforeEach(async () => {
      let window_location_stub = {origin: "http://origin.space"}
      gateway = new LocationGateway(window_location_stub);
    });

    it('gets the root', async () => {
      expect(await gateway.getRoot()).toEqual("http://origin.space")
    });
  });
});
