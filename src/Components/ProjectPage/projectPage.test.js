import React from "react";
import ProjectPage from ".";
import { shallow } from "enzyme";

describe("<ProjectPage>", () => {
  let page, getProjectSpy, childrenSpy;

  describe("Example one", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        getProjectSpy = { execute: jest.fn() };
        page = shallow(
          <ProjectPage match={{ params: { id: "1" } }} getProject={getProjectSpy}>
            {() => {}}
          </ProjectPage>
        );
      });

      it("Calls the getProject usecase when loaded", () => {
        expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "1"
        });
      });

      it("Sets loading to true when first mounted", () => {
        expect(page.state().loading).toEqual(true);
      });
    });

    describe("When the project is loaded and is of status draft", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { meow: true },
              schema: { hello: "hi" },
              status: 'Draft'
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.state().loading).toEqual(false);
      });

      it("Holds the formData when the project is presented", () => {
        expect(page.state().formData).toEqual({ meow: true });
      });

      it("Holds the formSchema when the project is presented", () => {
        expect(page.state().formSchema).toEqual({ hello: "hi" });
      });

      it("Holds the projectStatus when the project is presented", () => {
        expect(page.state().projectStatus).toEqual('Draft');
      });

      it("Renders null", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Draft",
          formData: { meow: true },
          formSchema: { hello: "hi" }
        });
      });
    });
  });

  describe("Example two", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        getProjectSpy = { execute: jest.fn() };
        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {() => {}}
          </ProjectPage>
        );
      });
      it("Calls the getProject usecase when loaded", () => {
        expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "2"
        });
      });

      it("Sets loading to true when first mounted", () => {
        expect(page.state().loading).toEqual(true);
      });
    });

    describe("When the project is loaded", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { woof: false },
              schema: { goodbye: "see ya" },
              status: "Submitted"
            })
        };

        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage match={{ params: { id: "2" } }} getProject={getProjectSpy}>
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.state().loading).toEqual(false);
      });

      it("Holds the formData when the project is presented", () => {
        expect(page.state().formData).toEqual({ woof: false });
      });

      it("Holds the formSchema when the project is presented", () => {
        expect(page.state().formSchema).toEqual({ goodbye: "see ya" });
      });

      it("Holds the projectStatus when the project is presented", () => {
        expect(page.state().projectStatus).toEqual('Submitted');
      });

      it("Renders the children with the formData and schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Submitted",
          formData: { woof: false },
          formSchema: { goodbye: "see ya" }
        });
      });
    });
  });
});
