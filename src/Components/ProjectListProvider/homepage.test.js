import React from "react";
import ProjectListProvider from ".";
import { mount } from "enzyme";

describe("<ProjectListProvider>", () => {
  describe("Example one", () => {
    let getUserProjectsSpy, homepage, childrenSpy;
    describe("When loading the project list", () => {
      beforeEach(() => {
        getUserProjectsSpy = { execute: jest.fn() }
        childrenSpy = jest.fn()
        homepage = mount(
          <ProjectListProvider
            getUserProjects={getUserProjectsSpy}
            match={{params: {projectId: 2}}}
          >
            {() => {}}
          </ProjectListProvider>
        )
      });

      it("Sets loading to true", () => {
        expect(homepage.find('[data-test="loading"]').length).toEqual(1);
      });

      it("Calls the getUserProjects use case", () => {
        expect(getUserProjectsSpy.execute).toHaveBeenCalled();
      });
    });

    describe("When the project list has loaded", () => {
      beforeEach(() => {
        getUserProjectsSpy = { execute: (presenter, _) =>
          presenter.presentProjectList ([{aproject: "yes"}])
        }
        childrenSpy = jest.fn()
        homepage = mount(
          <ProjectListProvider
            getUserProjects={getUserProjectsSpy}
            match={{params: {projectId: 2}}}
          >
            {childrenSpy}
          </ProjectListProvider>
        )
      });

      it("Sets loading to false", () => {
        expect(homepage.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes its children the project list from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectList: [{aproject: "yes"}]
        });
      });
    });

    describe("When the lastProjectUserAddedTo prop changes", () => {
      beforeEach(() => {
        let getUserProjectCallCount = 0;
        getUserProjectsSpy = { execute: (presenter, _) => {
            if (getUserProjectCallCount === 0) {
              presenter.presentProjectList([{aproject: "yes"}]);
            } else if (getUserProjectCallCount === 1) {
              presenter.presentProjectList([{aproject: "yes"}, {anotherproject: "yes"}]);
            }
            getUserProjectCallCount += 1;
          }
        }
        childrenSpy = jest.fn()
        homepage = mount(
          <ProjectListProvider
            lastProjectUserAddedTo={null}
            getUserProjects={getUserProjectsSpy}
            match={{params: {projectId: 2}}}
          >
            {childrenSpy}
          </ProjectListProvider>
        )
      });

      it("Fetches the new projects when lastProjectUserAddedTo is updated", () => {
        homepage.setProps({lastProjectUserAddedTo: 3});
        expect(childrenSpy).toHaveBeenCalledWith({
          projectList: [{aproject: "yes"}, {anotherproject: "yes"}]
        });
      });
    });
  });

  describe("Example two", () => {
    let getUserProjectsSpy, homepage, childrenSpy;
    describe("When loading the project list", () => {
      beforeEach(() => {
        getUserProjectsSpy = { execute: jest.fn() }
        childrenSpy = jest.fn()
        homepage = mount(
          <ProjectListProvider
            getUserProjects={getUserProjectsSpy}
            match={{params: {projectId: 4}}}
          >
            {() => {}}
          </ProjectListProvider>
        )
      });

      it("Sets loading to true", () => {
        expect(homepage.find('[data-test="loading"]').length).toEqual(1);
      });

      it("Calls the getUserProjects use case", () => {
        expect(getUserProjectsSpy.execute).toHaveBeenCalled();
      });
    });

    describe("When the project list has loaded", () => {
      beforeEach(() => {
        getUserProjectsSpy = { execute: (presenter, _) =>
          presenter.presentProjectList ([{project1: "yes"}, {project2: "NO"}])
        }
        childrenSpy = jest.fn()
        homepage = mount(
          <ProjectListProvider
            getUserProjects={getUserProjectsSpy}
            match={{params: {projectId: 4}}}
          >
            {childrenSpy}
          </ProjectListProvider>
        )
      });

      it("Sets loading to false", () => {
        expect(homepage.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes its children the project list from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectList: [{project1: "yes"}, {project2: "NO"}]
        });
      });
    });
  });
});
