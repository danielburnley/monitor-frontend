import React from "react";
import ProjectPage from ".";
import { shallow } from "enzyme";

describe("<ProjectPage>", () => {
  let page, getProjectSpy, childrenSpy, generateNewProjectUISchemaSpy, UISchema;

  describe("Example one", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        getProjectSpy = { execute: jest.fn() };
        generateNewProjectUISchemaSpy = {
          execute: (data, flag) => ({})
        }
        page = shallow(
          <ProjectPage
            match={{ params: { id: "1" } }}
            getProject={getProjectSpy}
          >
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
        UISchema = {};
        generateNewProjectUISchemaSpy = {
          execute: (data, flag) => ({})
        }

        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { meow: true },
              schema: { hello: "hi" },
              status: 'Draft',
              type: 'hif',
              timestamp: "56789"
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage
            match={{ params: { id: "2" } }}
            getProject={getProjectSpy}
            generateUISchema={generateNewProjectUISchemaSpy}
          >
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
        expect(page.state().projectStatus).toEqual("Draft");
      });

      it("Holds the timestamp when the project is presented", () => {
        expect(page.state().timestamp).toEqual("56789")
      });

      it("Holds th uischema as an empty hash", () => {
        expect(page.state().formUiSchema).toEqual({});
      });

      it("Holds the type when the project is presented", () => {
        expect(page.state().projectType).toEqual('hif');
      });

      it("Renders null", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Draft",
          formData: { meow: true },
          formSchema: { hello: "hi" },
          formUiSchema: UISchema,
          projectType: 'hif',
          timestamp: "56789"
        });
      });
    });
  });

  describe("Example two", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        UISchema = {};
        getProjectSpy = { execute: jest.fn() };

        generateNewProjectUISchemaSpy = {
          execute: jest.fn()
        };

        page = shallow(
          <ProjectPage
            match={{ params: { id: "2" } }}
            getProject={getProjectSpy}
            generateUISchema={generateNewProjectUISchemaSpy}
          >
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
              status: "Submitted",
              type: 'ac',
              timestamp: "0345"
            })
        };

        childrenSpy = jest.fn();

        generateNewProjectUISchemaSpy = {
          execute: (data) => ({hi: "yes"})
        };

        page = shallow(
          <ProjectPage
            match={{ params: { id: "2" } }}
            getProject={getProjectSpy}
            generateUISchema={generateNewProjectUISchemaSpy}
          >
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
        expect(page.state().projectStatus).toEqual("Submitted");
      });

      it("Holds the projectType when the project is presented", () => {
        expect(page.state().projectType).toEqual('ac');
      });

      it("Holds the timestamp when the project is presented", () => {
        expect(page.state().timestamp).toEqual("0345")
      });

      it("Renders the children with the formData and schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Submitted",
          formData: { woof: false },
          formSchema: { goodbye: "see ya" },
          projectType: 'ac',
          formUiSchema: {hi: "yes"},
          timestamp: "0345"
        });
      });
    });
  });

  describe("When project is in LA Draft status", () => {
    describe("Example 1", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { heya: "Bye" },
              schema: { laReadOnly: true, title: "Heya" },
              status: "LA Draft"
            })
        };

        generateNewProjectUISchemaSpy = {
          execute: (data, flag) => ({ heya: { "ui:disabled": true } })
        };


        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage
            match={{ params: { id: "2" } }}
            generateUISchema={generateNewProjectUISchemaSpy}
            getProject={getProjectSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Holds the Ui Schema for read only objects", () => {
        expect(page.state().formUiSchema).toEqual({
          heya: { "ui:disabled": true }
        });
      });

      it("Renders the children with the Ui schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "LA Draft",
          formData: { heya: "Bye" },
          formSchema: { laReadOnly: true, title: "Heya" },
          formUiSchema: { heya: { "ui:disabled": true } }
        });
      });
    });

    describe("Example 2", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { hi: "Bye" },
              schema: {
                hi: { laReadOnly: true, title: "Heya" },
                bye: { title: "Boo" }
              },
              status: "LA Draft"
            })
        };

        generateNewProjectUISchemaSpy = {
          execute: (data, flag) => ({ bye: { "ui:disabled": true } })
        };

        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage
            match={{ params: { id: "2" } }}
            generateUISchema={generateNewProjectUISchemaSpy}
            getProject={getProjectSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });
      it("Holds the UI Schema for read only objects", () => {
        expect(page.state().formUiSchema).toEqual({
          bye: { "ui:disabled": true }
        });
      });

      it("Renders the children with the Ui schema populated from the state", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "LA Draft",
          formData: { hi: "Bye" },
          formSchema: {
            hi: { laReadOnly: true, title: "Heya" },
            bye: { title: "Boo" }
          },
          formUiSchema: { bye: { "ui:disabled": true } }
        });
      });
    });
  });
});
