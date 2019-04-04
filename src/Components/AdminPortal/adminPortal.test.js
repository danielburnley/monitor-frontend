import React from "react";
import AdminPortal from ".";
import { mount, shallow } from "enzyme";


class TestAdminPortal {
  constructor(user, projectId, createProjectUseCase, addUsersToProject, childrenSpy) {
    this.page = mount(
      <AdminPortal
        getRole={{ execute: jest.fn(() => ({role: user})) }}
        projectId={projectId}
        createProject={createProjectUseCase}
        addUsersToProject={addUsersToProject}
      >
        {childrenSpy}
      </AdminPortal>
    );
  }

  visible = () => 
    this.page.find('[data-test="admin"]').length === 1

  addName = name =>
    this.page
      .find("[data-test='create-project-name']")
      .simulate("change", { target: { value: name } });

  addType = type => 
    this.page
      .find(`[data-test='create-project-${type}']`)
      .simulate("change", { target: { value: type } });
  addBid = ref => 
    this.page
      .find("[data-test='create-project-bidId']")
      .simulate("change", { target: { value: ref } });

  createProject = () =>
    this.page
      .find('[data-test="create-project-submit"]')
      .simulate("click")
      
  validationMessage = () =>
      this.page
        .find('[data-test="validation-message"]').length === 1
  
  successMessage = () => 
    this.page
      .find('[data-test="project-created-message"]').length === 1
  
  nameFieldValue = () => 
    this.page.find('[data-test="create-project-name"]').props().value

  bidFieldValue = () => 
    this.page.find('[data-test="create-project-bidId"]').props().value
  
  typeFieldValue = () => {
    if (this.page.find('[data-test="create-project-hif"]').props().checked) return 'hif';
    if (this.page.find('[data-test="create-project-ac"]').props().checked) return 'ac';
    if (this.page.find('[data-test="create-project-ff"]').props().checked) return 'ff';
    return "";
  }

  addId = id =>
    this.page
      .find("[data-test='project-id']")
      .simulate("change", { target: { value: id } });

  addEmail = email => 
    this.page
      .find("[data-test='user-email']")
      .simulate("change", { target: { value: email } });

  addRole = (role, prettyRole) =>
    this.page
      .find(`[data-test='user-role-${role}']`)
     .simulate("change", { target: { value: prettyRole } }); 
    
  ffTypeOption = () =>
    this.page  
      .find('[data-test="create-project-ff"]').length === 1

  addUser = () =>
    this.page
      .find('[data-test="add-user-submit"]')
      .simulate("click")

  idFieldValue = () => 
    this.page.find('[data-test="project-id"]').props().value

  emailFieldValue = () => 
    this.page.find('[data-test="user-email"]').props().value

  roleFieldValue = () => {
    if(this.page.find('[data-test="user-role-la"]').props().checked) return 'Local Authority';
    if(this.page.find('[data-test="user-role-he"]').props().checked) return 'Homes England';
    if(this.page.find('[data-test="user-role-su"]').props().checked) return 'Superuser';
    return "";
  }

  userAddedSuccess = () => 
    this.page.find('[data-test="user-added"]').length === 1
}

describe("AdminPortal", () => {
  describe("A Superuser", () => {
    let adminPortal, createProjectUseCaseSpy, addUsersToProjectSpy, ffEnabled, childrenSpy, userAddedToProject;
    beforeEach(() => {
      childrenSpy = jest.fn();
      ffEnabled = process.env.REACT_APP_FF_OPTION_ENABLED
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn(async (presenter, request) => { await presenter.userAddedSuccess(userAddedToProject)})}
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'

      adminPortal = new TestAdminPortal("Superuser", 1, createProjectUseCaseSpy, addUsersToProjectSpy, childrenSpy)
    });

    afterEach(() => {
      process.env.REACT_APP_FF_OPTION_ENABLED = undefined
    })

    it("Will display the admin portal", () => {
      expect(adminPortal.visible()).toEqual(true);
    });

    describe("Creating a new project", () => {
      beforeEach(() => {
        userAddedToProject = 1;
      });
      describe("With all information present", () => {
        beforeEach(() => {
          adminPortal.addName("project 1")
          adminPortal.addType("hif")
          adminPortal.addBid("EAX/EBX/ECX")
          adminPortal.createProject()
        });

        it("Will call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).toHaveBeenCalledWith(expect.anything(), "project 1", "hif", "EAX/EBX/ECX")
        });

        it("Will call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a success message", async () => {
          expect(adminPortal.successMessage()).toEqual(true)
        });

        it("Will clear the text in the form", async () => {
          expect(adminPortal.nameFieldValue()).toEqual("")
          expect(adminPortal.bidFieldValue()).toEqual("")
          expect(adminPortal.typeFieldValue()).toEqual("")
        });

        it("Will render children with the correct lastProjectUserAddedTo", async () => {
          expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: 1});
        });
      });

      describe("Missing project type", () => {
        beforeEach(() => {
          adminPortal.addName("name")
          adminPortal.addBid("HUA/DHA/63278")
          adminPortal.createProject()
        });

        it("Will not call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).not.toHaveBeenCalled()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.nameFieldValue()).toEqual("name")
          expect(adminPortal.bidFieldValue()).toEqual("HUA/DHA/63278")
        });
      });

      describe("Missing project name", () => {
        beforeEach(() => {
          adminPortal.addType("ac")
          adminPortal.addBid("HUA/DHA/63278")
          adminPortal.createProject()
        });

        it("Will not call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).not.toHaveBeenCalled()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.typeFieldValue()).toEqual("ac")
          expect(adminPortal.bidFieldValue()).toEqual("HUA/DHA/63278")
        });
      });

      describe("Missing Bid ID", () => {
        beforeEach(() => {
          adminPortal.addType("ac")
          adminPortal.addName("Name")
          adminPortal.createProject()
        });

        it("Will not call the create project use case with details upon submit", () => {
          expect(createProjectUseCaseSpy.execute).not.toHaveBeenCalled()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.nameFieldValue()).toEqual("Name")
          expect(adminPortal.typeFieldValue()).toEqual("ac")
        });
      });
    });

    describe("Adding a user to a project", () => {
      describe("With all inofrmation present", () => {
        beforeEach(() => {
          userAddedToProject = 2;
          adminPortal.addId(2)
          adminPortal.addEmail("email")
          adminPortal.addRole("la", "Local Authority")
          adminPortal.addUser()
        });
  
        it("Will call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), 2, [{ email: "email", role: "Local Authority" }])
        });
  
        it("displays a success message", async () => {
          expect(adminPortal.userAddedSuccess()).toEqual(true)
        });
  
        it("clears the text after project created", async () => {
          expect(adminPortal.idFieldValue()).toEqual("")
          expect(adminPortal.emailFieldValue()).toEqual("")
          expect(adminPortal.roleFieldValue()).toEqual("")
        });
  
        it("Will render children with the correct lastProjectUserAddedTo", () => {
          expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: 2});
        });
      });

      describe("Missing project ID", () => {
        beforeEach(() => {
          userAddedToProject = 2;
          adminPortal.addEmail("email")
          adminPortal.addRole("la", "Local Authority")
          adminPortal.addUser()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.emailFieldValue()).toEqual("email")
          expect(adminPortal.roleFieldValue()).toEqual("Local Authority")
        });
      });

      describe("Missing user role", () => {
        beforeEach(() => {
          userAddedToProject = 2;

          adminPortal.addId(2)
          adminPortal.addEmail("email")
          adminPortal.addUser()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.idFieldValue()).toEqual(2)
          expect(adminPortal.emailFieldValue()).toEqual("email")
        });
      });

      describe("Missing user email", () => {
        beforeEach(() => {
          userAddedToProject = 2;
          adminPortal.addId(2)
          adminPortal.addRole("la", "Local Authority")
          adminPortal.addUser()
        });

        it("Will not call the add users use case", async () => {
          expect(addUsersToProjectSpy.execute).not.toHaveBeenCalledWith(expect.anything(), 1)
        });

        it("Will display a validation message", async () => {
          expect(adminPortal.validationMessage()).toEqual(true)
        });

        it("Will not clear the text in the form", async () => {
          expect(adminPortal.idFieldValue()).toEqual(2)
          expect(adminPortal.roleFieldValue()).toEqual("Local Authority")
        });
      });
    });
  });

  describe("Environment flag disabled", () => {
    let adminPortal, createProjectUseCaseSpy, addUsersToProjectSpy, childrenSpy;
    beforeEach(() => {
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      addUsersToProjectSpy = { execute: jest.fn((presenter, request) => { presenter.userAddedSuccess()})}
      childrenSpy = jest.fn();

      adminPortal = new TestAdminPortal("Superuser", 1, createProjectUseCaseSpy, jest.fn(), childrenSpy)
    });

    it("Will not find the ff option", () => {
      expect(adminPortal.ffTypeOption()).toEqual(false)
    })
  });

  describe("Another User", () => {
    let adminPortal, createProjectUseCaseSpy, childrenSpy;
    beforeEach(() => {
      childrenSpy = jest.fn();
      createProjectUseCaseSpy = { execute: jest.fn((presenter, request) => { presenter.creationSuccess(1)})}
      process.env.REACT_APP_FF_OPTION_ENABLED = 'yes'
      adminPortal = new TestAdminPortal("Local Authority", 1, createProjectUseCaseSpy, jest.fn(), childrenSpy)
    });

    it("Will not display the admin portal", () => {
      expect(adminPortal.visible()).toEqual(false)
    });

    it("Will render children with no lastProjectUserAddedTo", () => {
      expect(childrenSpy).toHaveBeenCalledWith({lastProjectUserAddedTo: null});
    });
  });
});
