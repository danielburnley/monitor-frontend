import React from "react";
import Homepage from ".";
import { mount } from "enzyme";

describe("<Homepage>", () => {
  describe("Example one", () => {
    let getUserProjectsSpy, homepage, childrenSpy;
    describe("When loading the project list", () => {
      beforeEach(() => {
        getUserProjectsSpy = { execute: jest.fn() }
        childrenSpy = jest.fn()
        homepage = mount(
          <Homepage
            getUserProjects={getUserProjectsSpy}
            match={{params: {id: 2}}}
          >
            {() => {}}
          </Homepage>
        )
      });

      it("Sets loading to true", () => {
        expect(homepage.state().loading).toEqual(true);
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
          <Homepage
            getUserProjects={getUserProjectsSpy}
            match={{params: {id: 2}}}
          >
            {childrenSpy}
          </Homepage>
        )
      });

      it("Sets loading to false", () => {
        expect(homepage.state().loading).toEqual(false);
      });

      it("Holds the project list", () => {
        expect(homepage.state().projectList).toEqual([{aproject: "yes"}])
      });

      it("Renders its children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectList: [{aproject: "yes"}]
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
          <Homepage
            getUserProjects={getUserProjectsSpy}
            match={{params: {id: 4}}}
          >
            {() => {}}
          </Homepage>
        )
      });

      it("Sets loading to true", () => {
        expect(homepage.state().loading).toEqual(true);
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
          <Homepage
            getUserProjects={getUserProjectsSpy}
            match={{params: {id: 4}}}
          >
            {childrenSpy}
          </Homepage>
        )
      });

      it("Sets loading to false", () => {
        expect(homepage.state().loading).toEqual(false);
      });

      it("Holds the project list", () => {
        expect(homepage.state().projectList).toEqual([{project1: "yes"}, {project2: "NO"}])
      });

      it("Renders its children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectList: [{project1: "yes"}, {project2: "NO"}]
        });
      });
    });
  });
});