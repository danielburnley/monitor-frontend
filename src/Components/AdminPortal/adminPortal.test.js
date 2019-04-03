import React from "react";
import AdminPortal from ".";
import { mount, shallow } from "enzyme";

describe("AdminPortal", () => {
  describe("A Superuser", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy, addUsersToProjectSpy, ffEnabled, childrenSpy, userAddedToProject;
    beforeEach(() => {
      childrenSpy = jest.fn();
      ffEnabled = process.env.REACT_APP_FF_OPTION_ENABLED
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn(async (presenter, request) => { await presenter.userAddedSuccess(userAddedToProject)})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'

      adminPortal = mount(
        <AdminPortal
          getRole={userGatewaySpy}
          projectId={1}
          createProject={createProjectUseCaseSpy}
          addUsersToProject={addUsersToProjectSpy}
        >
          {childrenSpy}
        </AdminPortal>
      )
    });

    afterEach(() => {
      process.env.REACT_APP_FF_OPTION_ENABLED = undefined
    })

    it("Will display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(1);
    });

    describe("Creating a new project", () => {
      beforeEach(() => {
        userAddedToProject = 1;
      });
      describe("With the default type", () => {
        beforeEach(() => {
          adminPortal
            .find("[data-test='create-project-name']")
            .simulate("change", { target: { value: "project 1" } });

          adminPortal
            .find("[data-test='create-project-bidId']")
            .simulate("change", { target: { value: "EAX/EBX/ECX" } });

          adminPortal
            .find('[data-test="create-project-submit"]')
            .simulate("click")
        });

        it("Will call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), "project 1", "ac", "EAX/EBX/ECX")
        });

        it("Will call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a success message", async () => {
          expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
        });

        it("Will render children with the correct lastProjectUserAddedTo", async () => {
          expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: 1});
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
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a success message", async () => {
          expect(adminPortal.find('[data-test="project-created-message"]').length).toEqual(1)
        });

        it("Will render children with the correct lastProjectUserAddedTo", () => {
          expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: 1});
        });
      });
    });

    describe("Adding a user to a project", () => {
      beforeEach(() => {
        userAddedToProject = 2;

        adminPortal
          .find("[data-test='project-id']")
          .simulate("change", { target: { value: 2 } });

        adminPortal
          .find("[data-test='user-email']")
          .simulate("change", { target: { value: "email" } });

        adminPortal
          .find("[data-test='user-role-la']")
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

      it("Will render children with the correct lastProjectUserAddedTo", () => {
        expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: 2});
      });
    });
  });

  describe("Environment flag disabled", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy, addUsersToProjectSpy, childrenSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn((presenter, request) => { presenter.userAddedSuccess()})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Superuser"})) }
      childrenSpy = jest.fn();

      adminPortal = shallow(
        <AdminPortal
          getRole={userGatewaySpy}
          projectId={1}
          createProject={createProjectUseCaseSpy}
          addUsersToProject={addUsersToProjectSpy}
        >
          {childrenSpy}
        </AdminPortal>
      )
    });

    it("Will not find the ff option", () => {
      expect(adminPortal.find('[data-test="create-project-ff"]').length).toEqual(0)
    })
  });

  describe("Another User", () => {
    let adminPortal, userGatewaySpy, createProjectUseCaseSpy, childrenSpy;
    beforeEach(() => {
      childrenSpy = jest.fn();
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      userGatewaySpy = { execute: jest.fn(() => ({role: "Local"})) }
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'

      adminPortal = mount(
        <AdminPortal
          getRole={userGatewaySpy}
          createProject={createProjectUseCaseSpy}
          addUsersToProject={jest.fn()}
        >
          {childrenSpy}
        </AdminPortal>
      )
    });

    it("Will not display the admin portal", () => {
      expect(adminPortal.find('[data-test="admin"]').length).toEqual(0)
    });

    it("Will render children with no lastProjectUserAddedTo", () => {
      expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: null});
    });
  });
});
