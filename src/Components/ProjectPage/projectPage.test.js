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
            match={{ params: { projectId: "1" } }}
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

      it("Sets loading to true when first mounted", async () => {
        expect(page.find('[data-test="loading"]').length).toEqual(1);
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
            match={{ params: { projectId: "2" } }}
            getProject={getProjectSpy}
            generateUISchema={generateNewProjectUISchemaSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes the data, schema, status, timestamp and type from the use case", () => {
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

    describe("When project status is submitted", () => {
      let generateSubmittedUiSchemaSpy;
      beforeEach(() => {
        UISchema = {};
        generateSubmittedUiSchemaSpy = {
          execute: (data) => ({readonly: true})
        }

        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { meow: true },
              schema: { hello: "hi" },
              status: 'Submitted',
              type: 'hif',
              timestamp: "56789"
            })
        };
        childrenSpy = jest.fn();

        page = shallow(
          <ProjectPage
            match={{ params: { projectId: "2" } }}
            getProject={getProjectSpy}
            generateSubmittedUiSchema={generateSubmittedUiSchemaSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });
      
      it("passes the correct uischema to it's children ", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Submitted",
          formData: { meow: true },
          formSchema: { hello: "hi" },
          formUiSchema: {readonly: true},
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
            match={{ params: { projectId: "2" } }}
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

      it("Sets loading to true when first mounted", async () => {
        expect(page.find('[data-test="loading"]').length).toEqual(1);
      });
    });

    describe("When the project is loaded", () => {
      beforeEach(() => {
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              data: { woof: false },
              schema: { goodbye: "see ya" },
              status: "Draft",
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
            match={{ params: { projectId: "2" } }}
            getProject={getProjectSpy}
            generateUISchema={generateNewProjectUISchemaSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes the data, schema, status, timestamp and type from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          projectStatus: "Draft",
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
            match={{ params: { projectId: "2" } }}
            generateUISchema={generateNewProjectUISchemaSpy}
            getProject={getProjectSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Renders the children with the Ui schema returned from the usecase", () => {
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
            match={{ params: { projectId: "2" } }}
            generateUISchema={generateNewProjectUISchemaSpy}
            getProject={getProjectSpy}
          >
            {childrenSpy}
          </ProjectPage>
        );
      });

      it("Renders the children with the Ui schema returned from the usecase", () => {
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
