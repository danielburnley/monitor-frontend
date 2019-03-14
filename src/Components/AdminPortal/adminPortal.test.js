import React from "react";
import AdminPortal from ".";
import { shallow } from "enzyme";

describe("AdminPortal", () => {
  describe("A Superuser", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy, addUsersToProjectSpy, ffEnabled;
    beforeEach(() => {
      ffEnabled = process.env.REACT_APP_FF_OPTION_ENABLED
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn((presenter, request) => { presenter.userAddedSuccess()})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
          projectId={1}
          createProject={createProjectUseCaseSpy}
          addUsersToProject={addUsersToProjectSpy}
        />
      )
    });

    afterEach(() => {
      process.env.REACT_APP_FF_OPTION_ENABLED = undefined
    })

    it("Will display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(1);
    });

    describe("Creating a new project", () => {
      describe("With the default type", () => {
        beforeEach(() => {
          adminPortal
            .find("[data-test='create-project-name']")
            .simulate("change", { target: { value: "project 1" } });

          adminPortal
            .find("[data-test='create-project-bidId']")
            .simulate("change", { target: { value: "EAX/EBX/ECX" } });

          adminPortal
            .find("[data-test='user-email']").at(0)
            .simulate("change", { target: { value: "my_email@email.net" } });

          adminPortal
            .find("[data-test='user-role-la']").at(0)
            .simulate("change", { target: { value: "Homes England" } });

          adminPortal
            .find('[data-test="create-project-submit"]')
            .simulate("click")
        });

        it("Will call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), "project 1", "ac", "EAX/EBX/ECX")
        });

        it("Will call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1, [{ email: "my_email@email.net", role: "Homes England" }])
        });

        it("Will display a success message", async () => {
          expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
        });
      });

      describe("With a set type", () => {
        beforeEach(() => {
          adminPortal
            .find("[data-test='create-project-name']")
            .simulate("change", { target: { value: "name" } });

          adminPortal
            .find("[data-test='create-project-ac']")
            .simulate("change", { target: { value: "type" } });

          adminPortal
            .find("[data-test='create-project-bidId']")
            .simulate("change", { target: { value: "HUA/DHA/63278" } });

          adminPortal
            .find("[data-test='user-email']").at(0)
            .simulate("change", { target: { value: "email" } });

          adminPortal
            .find("[data-test='user-role-la']").at(0)
            .simulate("change", { target: { value: "Local Authority" } });

          adminPortal
            .find('[data-test="create-project-submit"]')
            .simulate("click")
        });

        it("Will find the ff option", () => {
          expect(adminPortal.find('[data-test="create-project-ff"]').length).toEqual(1)
        })

        it("Will call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), "name", "type", "HUA/DHA/63278")
        });

        it("Will call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1, [{ email: "email", role: "Local Authority" }])
        });

        it("Will display a success message", async () => {
          expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
        });
      });
    });

    describe("Adding a user to a project", () => {
      beforeEach(() => {
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
      });

      it("Will call the add users use case", async () => {
        expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 2, [{ email: "email", role: "Local Authority" }])
      });

      it("displays a success message", async () => {
        expect(adminPortal.find('[data-test="user-added"]').length).toEqual(1)
      });
    });
  });

  describe("Environment flag disabled", () => {
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

    it("Will not find the ff option", () => {
      expect(adminPortal.find('[data-test="create-project-ff"]').length).toEqual(0)
    })
  });

  describe("Another User", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Local"})) }
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'

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