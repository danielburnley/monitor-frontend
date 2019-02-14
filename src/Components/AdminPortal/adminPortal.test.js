import React from "react";
import AdminPortal from ".";
import { shallow } from "enzyme";


describe("AdminPortal", () => {
  describe("A Superuser", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy;
    beforeEach(() => {
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }
      createProjectUseCaseSpy = jest.fn()

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
          createProject={createProjectUseCaseSpy}
        />
      )
    });

    it("Will display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(1);
    });
  });

  describe("Another User", () => {
    let adminPortal, userGatewaySpy;
    beforeEach(() => {
      userGatewaySpy = { execute: jest.fn(() => ({role: "Local"})) }

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
        />
      )
    });

    it("Will display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(0)
    });
  });
});