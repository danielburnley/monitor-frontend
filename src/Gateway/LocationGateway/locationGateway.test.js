import LocationGateway from '.';

describe('Location Gateway', () => {
  let gateway;
  //Make it take a window location object in the constructor
  describe("getRoot", () => {
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

  describe("getProjectURL", () => {
    describe("In a project", () => {
      describe('Example 1', () => {
        beforeEach(async () => {
          let window_location_stub = {pathname: "/project/4/return/5", origin: "https://frontend.net"}
          gateway = new LocationGateway(window_location_stub);
        });
    
        it('gets the project url', async () => {
          expect(await gateway.getProjectURL(12)).toEqual("https://frontend.net/project/12")
        });
      });
    
      describe('Example 2', () => {
        beforeEach(async () => {
          let window_location_stub = {pathname: "/project/5/baseline", origin: "http://origin.space"}
          gateway = new LocationGateway(window_location_stub);
        });
    
        it('gets the project url', async () => {
          expect(await gateway.getProjectURL(5)).toEqual("http://origin.space/project/5")
        });
      });
    });
  });
});
