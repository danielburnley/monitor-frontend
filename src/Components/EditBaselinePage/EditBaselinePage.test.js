import React from "react";
import EditBaselinePage from ".";
import { shallow } from "enzyme";

describe("<EditBaselinePage>", () => {
  let page, getProjectSpy, getBaselinesSpy, childrenSpy, generateUISchemaSpy, generateDisabledUISchemaSpy, UISchema;

  beforeEach(() => {
    generateUISchemaSpy = {
      execute: (data, flag) => ({})
    }

    generateDisabledUISchemaSpy = {
      execute: (data, flag) => ({})
    }
  })

  describe("Example one", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        getBaselinesSpy = { execute: jest.fn() };
        getProjectSpy = { execute: jest.fn() };

        page = shallow(
          <EditBaselinePage
            match={{ params: { projectId: "1", baselineId: "7" } }}
            getProject={getProjectSpy}
            getBaselines={getBaselinesSpy}
          >
            {() => {}}
          </EditBaselinePage>
        );
      });

      it("Calls the getProject usecase", () => {
        expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "1"
        });
      });

      it("Calls the getBaselines usecase", () => {
        expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
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
        getProjectSpy = {
          execute: (presenter, _) =>
            presenter.presentProject({
              schema: { hello: "hi" },
              type: 'hif'
            })
        }
        getBaselinesSpy = {
          execute: (presenter, _) =>
            presenter.presentBaselines([{
              data: { meow: true },
              version: 3,
              status: 'Draft',
              timestamp: 1234,
              id: 7
            }])
        };
        childrenSpy = jest.fn();

        page = shallow(
          <EditBaselinePage
            match={{ params: { projectId: "2", baselineId: "7" } }}
            getProject={getProjectSpy}
            getBaselines={getBaselinesSpy}
            generateUISchema={generateUISchemaSpy}
            generateSubmittedUiSchema={generateDisabledUISchemaSpy}
          >
            {childrenSpy}
          </EditBaselinePage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes the data, schema, status, timestamp and type from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          formData: { meow: true },
          formSchema: { hello: "hi" },
          baselineStatus: 'Draft',
          formUiSchema: UISchema,
          timestamp: 1234,
          projectType: 'hif'
        });
      });
    });

    describe("When the location changes", () => {
      describe("When loading the project", () => {
        beforeEach(() => {
          getBaselinesSpy = { execute: jest.fn() };
          getProjectSpy = { execute: jest.fn() };

          page = shallow(
            <EditBaselinePage
              match={{ params: { projectId: "1", baselineId: "7" } }}
              getProject={getProjectSpy}
              getBaselines={getBaselinesSpy}
            >
              {() => {}}
            </EditBaselinePage>
          );

          page.setProps({
            location: "/project/9/baseline/2",
            match: { params: { projectId: "9", baselineId: "2" } }
          });
        });

        it("Calls the getProject usecase", () => {
          expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            id: "9"
          });
        });

        it("Calls the getBaseline usecase", () => {
          expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            id: "9"
          });
        });
      });
    });
  });

  describe("Example two", () => {
    describe("When loading the project", () => {
      beforeEach(() => {
        UISchema = {};
        getBaselinesSpy = { execute: jest.fn() };
        getProjectSpy = { execute: jest.fn() };

        page = shallow(
          <EditBaselinePage
            match={{ params: { projectId: "2", baselineId: 9 } }}
            getProject={getProjectSpy}
            getBaselines={getBaselinesSpy}
            generateUISchema={generateUISchemaSpy}
            generateSubmittedUiSchema={generateDisabledUISchemaSpy}
          >
            {() => {}}
          </EditBaselinePage>
        );
      });
      it("Calls the getProject usecase when loaded", () => {
        expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
          id: "2"
        });
      });

      it("Calls the getBaselines usecase when loaded", () => {
        expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
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
              schema: { goodbye: "see ya" },
              type: 'ac'
            })
        }
        getBaselinesSpy = {
          execute: (presenter, _) =>
            presenter.presentBaselines([{
              data: { woof: false },
              version: 5,
              status: 'Draft',
              timestamp: 45,
              id: 9
            }])
        };

        childrenSpy = jest.fn();

        generateUISchemaSpy = {
          execute: (data) => ({hi: "yes"})
        };

        page = shallow(
          <EditBaselinePage
            match={{ params: { projectId: "2", baselineId: '9' } }}
            getProject={getProjectSpy}
            getBaselines={getBaselinesSpy}
            generateUISchema={generateUISchemaSpy}
            generateSubmittedUiSchema={generateDisabledUISchemaSpy}
          >
            {childrenSpy}
          </EditBaselinePage>
        );
      });

      it("Sets loading to false when the project is presented", () => {
        expect(page.find('[data-test="loading"]').length).toEqual(0);
      });

      it("Passes the data, schema, status, timestamp and type from the use case", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          formData: { woof: false },
          baselineStatus: 'Draft',
          formSchema: { goodbye: "see ya" },
          projectType: 'ac',
          timestamp: 45,
          formUiSchema: {hi: "yes"}
        });
      });
    });

    describe("When the location changes", () => {
      describe("When loading the project", () => {
        beforeEach(() => {
          getBaselinesSpy = { execute: jest.fn() };
          getProjectSpy = { execute: jest.fn() };

          page = shallow(
            <EditBaselinePage
              match={{ params: { projectId: "2", baselineId: "9" } }}
              getProject={getProjectSpy}
              getBaselines={getBaselinesSpy}
            >
              {() => {}}
            </EditBaselinePage>
          );

          page.setProps({
            location: "/project/9/baseline/2",
            match: { params: { projectId: "3", baselineId: "6" } }
          });
        });

        it("Calls the getProject usecase", () => {
          expect(getProjectSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            id: "3"
          });
        });

        it("Calls the getBaseline usecase", () => {
          expect(getBaselinesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
            id: "3"
          });
        });
      });
    });
  });
});
