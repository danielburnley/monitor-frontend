import GetRole from ".";

describe("GetRole", () => {
  it("Calls the user role gateway", () => {
    let cookieUserRoleSpy = {
      getUserRole: jest.fn(() => ({userRole: "Homes England"}))
    }
    let useCase = new GetRole(cookieUserRoleSpy);
    useCase.execute();
    expect(cookieUserRoleSpy.getUserRole).toHaveBeenCalled();
  });

  describe("Example 1", () => {
    it("Returns the user role", () => {
      let cookieUserRoleSpy = {
        getUserRole: jest.fn(() => ({userRole: "Homes England"}))
      }
      let useCase = new GetRole(cookieUserRoleSpy);
      expect(useCase.execute().role).toEqual("Homes England")
    });
  });

  describe("Example 2", () => {
    it("Returns the user role", () => {
      let cookieUserRoleSpy = {
        getUserRole: jest.fn(() => ({userRole: "Local Authority"}))
      }
      let useCase = new GetRole(cookieUserRoleSpy);
      expect(useCase.execute().role).toEqual("Local Authority")
    });
  });
});