import React from "react";
import AdminPortal from ".";
import { shallow } from "enzyme";


async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function load(page) {
  await waitForRequestToFinish();
  page.update();
}

describe("AdminPortal", () => {
  describe("A Superuser", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }

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

    describe("Creating a new project", () => {
      it("Will call the create project use case with details upon submit", () => {
        adminPortal
          .find("[data-test='create-project-name']")
          .simulate("change", { target: { value: "name" } });

        adminPortal
          .find("[data-test='create-project-type']")
          .simulate("change", { target: { value: "type" } });

        adminPortal
          .find('[data-test="create-project-submit"]')
          .simulate("click")

        expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), { name: "name", type: "type" })
      });

      it("Will save the new project id to state and displays success message", async () => {
        adminPortal
          .find("[data-test='create-project-name']")
          .simulate("change", { target: { value: "name" } });

        adminPortal
          .find("[data-test='create-project-type']")
          .simulate("change", { target: { value: "type" } });

        adminPortal
          .find('[data-test="create-project-submit"]')
          .simulate("click")

        await load(adminPortal)

        expect(adminPortal.state().id).toEqual(1)
        expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
      });
    });
  });

  describe("Another User", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Local"})) }

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
          createProject={createProjectUseCaseSpy}
        />
      )
    });

    it("Will not display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(0)
    });
  });
});