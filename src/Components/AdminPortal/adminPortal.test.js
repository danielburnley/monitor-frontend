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
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy, addUsersToProjectSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn((presenter, request) => { presenter.userAddedSuccess()})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
          projectId={1}
          createProject={createProjectUseCaseSpy}
          addUsersToProject={addUsersToProjectSpy}
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

        expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), "name", "type")
      });

      it("Will call the add users use case", async () => {
        adminPortal
          .find("[data-test='create-project-name']")
          .simulate("change", { target: { value: "name" } });

        adminPortal
          .find("[data-test='create-project-type']")
          .simulate("change", { target: { value: "type" } });

        adminPortal
          .find("[data-test='user-email']").at(0)
          .simulate("change", { target: { value: "email" } });

        adminPortal
          .find("[data-test='user-role-la']").at(0)
          .simulate("change", { target: { value: "Local Authority" } });

        adminPortal
          .find('[data-test="create-project-submit"]')
          .simulate("click")

        await load(adminPortal)
        
        expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1, [{ email: "email", role: "Local Authority" }])
      });

      it("Will save the new project id to state and displays success message", async () => {
        adminPortal
          .find("[data-test='create-project-name']")
          .simulate("change", { target: { value: "name" } });

        adminPortal
          .find("[data-test='create-project-type']")
          .simulate("change", { target: { value: "type" } });

        adminPortal
          .find("[data-test='user-email']").at(0)
          .simulate("change", { target: { value: "email" } });

        adminPortal
          .find("[data-test='user-role-la']").at(0)
          .simulate("change", { target: { value: "Local Authority" } });

        adminPortal
          .find('[data-test="create-project-submit"]')
          .simulate("click")

        await load(adminPortal)

        expect(adminPortal.state().id).toEqual(1)
        expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
      });
    });

    describe("Adding a user to a project", () => {
      it("Will call the add users use case", async () => {
        adminPortal
          .find("[data-test='project-id']")
          .simulate("change", { target: { value: 2 } });

        adminPortal
          .find("[data-test='user-email']").at(1)
          .simulate("change", { target: { value: "email" } });

        adminPortal
          .find("[data-test='user-role-la']").at(1)
          .simulate("change", { target: { value: "Local Authority" } });

        adminPortal
          .find('[data-test="add-user-submit"]')
          .simulate("click")

        await load(adminPortal)
        
        expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 2, [{ email: "email", role: "Local Authority" }])
      });

      it("displays a success message", async () => {
        adminPortal
          .find("[data-test='project-id']")
          .simulate("change", { target: { value: 2 } });

        adminPortal
          .find("[data-test='user-email']").at(1)
          .simulate("change", { target: { value: "email" } });

        adminPortal
          .find("[data-test='user-role-la']").at(1)
          .simulate("change", { target: { value: "Local Authority" } });

        adminPortal
          .find('[data-test="add-user-submit"]')
          .simulate("click")

        await load(adminPortal)

        expect(adminPortal.state().id).toEqual(2)
        expect(adminPortal.find('[data-test="user-added"]').length).toEqual(1)
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
          addUsersToProject={jest.fn()}
        />
      )
    });

    it("Will not display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(0)
    });
  });
});