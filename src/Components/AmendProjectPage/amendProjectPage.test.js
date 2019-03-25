import AmendProjectPage from ".";
import React from "react";
import { mount, shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 10));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("AmendProjectPage", () => {
  let getProjectURLUsecase = { execute: jest.fn((projectId) => "https:/mydomain/project/5") }
  let data = {
    cat: {
      catA: {
        catB: "Unedited"
      }
    }
  };
  let schema = {
    type: "object",
    properties: {
      cat: {
        type: "object",
        properties: {
          catA: {
            type: "object",
            properties: {
              catB: {
                type: "string"
              }
            }
          }
        }
      }
    }
  };

  it("Calls the get user role use case", () => {
    let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
    mount(
      <AmendProjectPage
        projectURL={getProjectURLUsecase}
        match={{params: {baselineId: 6}}}
        documentGateway={jest.fn()}
        projectId = {1}
        updateProject={{}}
        submitBaseline={{}}
        validateProject={ { execute: () => null } }
        data={{}}
        schema={schema}
        getRole={userRoleUseCaseSpy}
      />
    )
    expect(userRoleUseCaseSpy.execute).toBeCalled()
  });

  it("Passes the document gateway to the parent form", () => {
    let documentGatewayDummy = jest.fn();
    let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
    let wrap = shallow(
      <AmendProjectPage
        projectURL={getProjectURLUsecase}
        documentGateway={documentGatewayDummy}
        projectId={1}
        match={{params: {baselineId: 8}}}
        updateProject={{}}
        submitBaseline={{}}
        validateProject={ { execute: () => null } }
        data={{}}
        schema={schema}
        getRole={userRoleUseCaseSpy}
      />
    );

    expect(
      wrap.find({ "data-test": "project-form" }).props().documentGateway
    ).toEqual(documentGatewayDummy);
  });

  describe("Passes the project id", () => {
    it("Example 1", () => {
      let documentGatewayDummy = jest.fn();
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let wrap = shallow(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          documentGateway={documentGatewayDummy}
          projectId={6}
          match={{params: {baselineId: 8}}}
          getInfrastructures={"get me some infrastructures"}
          updateProject={{}}
          submitBaseline={{}}
          validateProject={ { execute: () => null } }
          data={{}}
          schema={schema}
          getRole={userRoleUseCaseSpy}
        />
      );

      expect(
        wrap.find({ "data-test": "project-form" }).props().formContext
      ).toEqual({projectId: 6, getInfrastructures: "get me some infrastructures"});
    });

    it("Example 2", () => {
      let documentGatewayDummy = jest.fn();
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let wrap = shallow(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          documentGateway={documentGatewayDummy}
          projectId={8}
          match={{params: {baselineId: 8}}}
          updateProject={{}}
          getInfrastructures={"infras"}
          submitBaseline={{}}
          validateProject={ { execute: () => null } }
          data={{}}
          schema={schema}
          getRole={userRoleUseCaseSpy}
        />
      );

      expect(
        wrap.find({ "data-test": "project-form" }).props().formContext
      ).toEqual({projectId: 8, getInfrastructures: "infras"});
    });
  });

  describe("disables buttons while project updating hasnt completed", () => {
    describe("In Homes England draft mode", () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };

      it("example 1", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {presenter.submissionSuccessful(id)}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => {presenter.projectUpdated({errors: []})})
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="submit-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });

      it("example 2", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {}) };
        let updateProjectSpy = { execute: jest.fn(async (presenter, request) => {}) };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });
    });

    describe("In Superuser draft mode", () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Superuser"})) };

      it("example 1", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {presenter.submissionSuccessful(id)}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => {presenter.projectUpdated({errors: []})})
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}            
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="submit-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });

      it("example 2", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {}) };
        let updateProjectSpy = { execute: jest.fn(async (presenter, request) => {}) };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });
    });

    describe("In LA draft mode", () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };

      it("example 1", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {presenter.submissionSuccessful(id)}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => {presenter.projectUpdated({errors: []})})
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });

      it("example 2", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {}) };
        let updateProjectSpy = { execute: jest.fn(async (presenter, request) => {}) };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(1);
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          0
        );
      });
    });
  });

  describe("shows the buttons", () => {
    describe("In Homes England draft mode", () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };

      it("example 1", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {presenter.submissionSuccessful(id)}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => {presenter.projectUpdated({errors: []})})
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );

        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          1
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          1
        );
      });

      it("example 2", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {}) };
        let updateProjectSpy = { execute: jest.fn(async (presenter, request) => {}) };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );

        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          1
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          1
        );
      });
    });

    describe("In LA draft mode", () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };

      it("example 1", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {presenter.submissionSuccessful(id)}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => {presenter.projectUpdated({baselineId: request.projectId})})
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            match={{params: {baselineId: 8}}}
            projectId={1}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );

        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(0);
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          1
        );
      });

      it("example 2", async () => {
        let submitBaselineSpy = { execute: jest.fn(async (presenter, id) => {}) };
        let updateProjectSpy = { execute: jest.fn(async (presenter, request) => {}) };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            getRole={userRoleUseCaseSpy}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={{}}
            schema={schema}
          />
        );

        expect(
          wrap.find('[data-test="disabled-update-project-button"]').length
        ).toEqual(0);
        expect(
          wrap.find('[data-test="disabled-submit-project-button"]').length
        ).toEqual(0);
        expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
          0
        );
        expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
          1
        );
      });
    });
  });

  describe("calls the submit and updates project use cases", () => {
    it("example 1", async () => {
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({baselineId: request.projectId}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          timestamp={"1234"}
        />
      );
      let request = {projectId: 1, data: {}, timestamp: "1234"}
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);
      expect(submitBaselineSpy.execute).toBeCalledWith(expect.anything(), 8);
    });

    it("example 2", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={9}
          match={{params: {baselineId: 9}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          timestamp={"789"}
        />
      );

      await updateFormField(wrap.find('input[type="text"]'), "cashews");
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      let request = { projectId: 9, data: {"cat": {"catA": {"catB": "cashews"}}}, timestamp: "789"}
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);
      expect(submitBaselineSpy.execute).toBeCalledWith(expect.anything(), 9);
    });
  });

  describe("calls the update project use case", () => {
    it("example 1", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: [], timestamp: "45"}))
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={9}
          match={{params: {baselineId: 8}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          timestamp={"12345"}
        />
      );

      await wait();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      await wait();
      let request = {projectId: 9, data: {}, timestamp: "12345"}
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);
    });

    it("example 2", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: [], timestamp: "65"}))
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          timestamp={"now"}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "cashews");
      await wrap.update();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      await wait();
      let request = {projectId: 1, data: { cat: { catA: { catB: "cashews" }  } }, timestamp:"now"}
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);
    });
  });

  describe("Validating the project", () => {
    describe("when updating a project", () => {
      it("Example 1", async () => {
        let submitBaselineSpy = {
          execute: jest.fn(async (presenter, id) => {
            presenter.submissionSuccessful(id);
          })
        };
        let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectType={"hif"}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            getRole={userRoleUseCaseSpy}
            status={"LA Draft"}
          />
        );

        await wait();
        await updateFormField(wrap.find('input[type="text"]'), "hi");
        await wrap.update();
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(validateProjectSpy.execute).toBeCalledWith(
          expect.anything(),
          1,
          "hif",
          { cat: { catA: { catB: "hi" } } }
        );
      });

      it("Example 2", async () => {
        let submitBaselineSpy = {
          execute: jest.fn(async (presenter, id) => {
            presenter.submissionSuccessful(id);
          })
        };
        let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectType={"ac"}
            projectId={6}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            getRole={userRoleUseCaseSpy}
            status={"LA Draft"}
          />
        );

        await wait();
        await updateFormField(wrap.find('input[type="text"]'), "Meow");
        await wrap.update();
        wrap.find('[data-test="update-project-button"]').simulate("click");
        await wait();
        expect(validateProjectSpy.execute).toBeCalledWith(
          expect.anything(),
          6,
          "ac",
          { cat: { catA: { catB: "Meow" } } }
        );
      });
    });

    describe("when submitting the project", () => {
      it("Example 1", async () => {
        let submitBaselineSpy = {
          execute: jest.fn(async (presenter, id) => {
            presenter.submissionSuccessful(id);
          })
        };
        let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectType={"hif"}
            projectId={1}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            getRole={userRoleUseCaseSpy}
            status={"LA Draft"}
          />
        );

        await wait();
        await updateFormField(wrap.find('input[type="text"]'), "hi");
        await wrap.update();
        wrap.find('[data-test="submit-project-button"]').simulate("click");
        await wait();
        expect(validateProjectSpy.execute).toBeCalledWith(
          expect.anything(),
          1,
          "hif",
          { cat: { catA: { catB: "hi" } } }
        );
      });

      it("Example 2", async () => {
        let submitBaselineSpy = {
          execute: jest.fn(async (presenter, id) => {
            presenter.submissionSuccessful(id);
          })
        };
        let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
        };
        let validateProjectSpy = { execute: jest.fn(async () => {}) };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectType={"ac"}
            projectId={6}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            getRole={userRoleUseCaseSpy}
            status={"LA Draft"}
          />
        );

        await wait();
        await updateFormField(wrap.find('input[type="text"]'), "Meow");
        await wrap.update();
        wrap.find('[data-test="submit-project-button"]').simulate("click");
        await wait();
        expect(validateProjectSpy.execute).toBeCalledWith(
          expect.anything(),
          6,
          "ac",
          { cat: { catA: { catB: "Meow" } } }
        );
      });
    });
  });

  describe("validation warning message", () => {
    describe("Example 1", () => {
      let submitBaselineSpy = { execute: jest.fn(async () => {}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []})) };
      let validateProjectSpy = {
        execute: jest.fn(async presenter => {
          await presenter.invalidateFields([["less", "cats"]]);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };

      it("shows warning upon update if in draft state", async () => {
        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectId={1}
            projectType={"hey"}
            match={{params: {baselineId: 8}}}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            status={"LA Draft"}
            getRole={userRoleUseCaseSpy}
            UiSchema={{}}
          />
        );

        await wait();
        await wrap
          .find('[data-test="update-project-button"]')
          .simulate("click");
        await wait();
        await wrap.update();
        expect(wrap.find('[data-test="validationWarning"]').length).toEqual(1);
        expect(wrap.find('[data-test="validationWarning"]').text()).toContain(
          "less → cats"
        );
      });
    });

    describe("Example 2", () => {
      it("shows warning upon update", async () => {
        let submitBaselineSpy = { execute: jest.fn(async () => {}) };
        let updateProjectSpy = {
          execute: jest.fn(async (presenter, request) =>
            presenter.projectUpdated({errors: []})
          )
        };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };


        let validateProjectSpy = {
          execute: jest.fn(async presenter => {
            await presenter.invalidateFields([["no", "more", "cats"]]);
          })
        };

        let wrap = mount(
          <AmendProjectPage
            projectURL={getProjectURLUsecase}
            projectId={1}
            match={{params: {baselineId: 8}}}
            projectType={"hey"}
            updateProject={updateProjectSpy}
            submitBaseline={submitBaselineSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
            getRole={userRoleUseCaseSpy}
            status={"Draft"}
          />
        );

        await wait();
        await wrap
          .find('[data-test="update-project-button"]')
          .simulate("click");
        await wait();
        await wrap.update();
        expect(wrap.find('[data-test="validationWarning"]').length).toEqual(1);
        expect(wrap.find('[data-test="validationWarning"]').text()).toContain(
          "no → more → cats"
        );
      });
    });
  });

  describe("Initial draft success message", () => {
    it("shows only the success message", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async presenter => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          status={"Draft"}
        />
      );

      await wait();
      await wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="parent-form"]').length).toEqual(0);
      expect(wrap.find('[data-test="project-create-success"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="share-project-link"]').length).toEqual(1)
      expect(wrap.find('[data-test="project-url"]').text()).toEqual("https:/mydomain/project/5")
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
        0
      );
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
        0
      );
    });
  });

  describe("success message", () => {
    it("shows only the success message", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
      let validateProjectSpy = { execute: jest.fn(async presenter => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          status={"LA Draft"}
        />
      );

      await wait();
      await wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="parent-form"]').length).toEqual(0);
      expect(wrap.find('[data-test="project-create-success"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="share-project-link"]').length).toEqual(1)
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
        0
      );
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
        0
      );
      expect(wrap.find('[data-test="validationError"]').length).toEqual(0);
    });

    it("doesnt show the success message", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
          updateProject={updateProjectSpy}
        />
      );

      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-create-success"]').length).toEqual(
        0
      );
    });
  });

  describe("draft saved message", () => {
    it("shows the draft saved message", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          match={{params: {baselineId: 8}}}
          projectId={1}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          getRole={userRoleUseCaseSpy}
          schema={schema}
        />
      );

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="validationWarning"]').length).toEqual(0);
    });

    it("doesnt show the draft saved message", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          submitBaseline={submitBaselineSpy}
          updateProject={updateProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          getRole={userRoleUseCaseSpy}
        />
      );

      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        0
      );
    });

    it("clears the draft saved message after something is entered", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.submissionSuccessful(id);
        })
      };
      let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Local Authority"})) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => await presenter.projectUpdated({errors: []}))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          submitBaseline={submitBaselineSpy}
          updateProject={updateProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          getRole={userRoleUseCaseSpy}
          schema={schema}
        />
      );

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await wait();
      await wrap.update();
      await updateFormField(wrap.find('input[type="text"]'), "cashews");
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        0
      );
    });
  });

  describe("Overwriting data error", () => {
    let submitBaselineSpy = { execute: jest.fn(async () => {}) };
    let validateProjectSpy = {
      execute: jest.fn(async presenter => {
        await presenter.invalidateFields([["less", "cats"]]);
      })
    };
    let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };

    it("shows warning upon update if in draft state", async () => {
      let updateProjectSpy = { execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: ["incorrect_timestamp"]})) };
      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          projectType={"hey"}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          status={"Draft"}
          getRole={userRoleUseCaseSpy}
          UiSchema={{}}
        />
      );

      await wait();
      await wrap
        .find('[data-test="update-project-button"]')
        .simulate("click");
      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="overwriting-error"]').length).toEqual(1);
    });

    it("Does not show warning upon submission after being updated", async () => {
      let updateProjectSpy = { execute: jest.fn(async (presenter, request) => presenter.projectUpdated({errors: [""], timestamp: 11})) };
      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          projectId={1}
          match={{params: {baselineId: 8}}}
          projectType={"hey"}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
          status={"Draft"}
          getRole={userRoleUseCaseSpy}
          UiSchema={{}}
          timestamp={10}
        />
      );

      await wait();
      await wrap
        .find('[data-test="update-project-button"]')
        .simulate("click");
      await wait();
      await wrap.update();
      let request = {projectId: 1, data: data, timestamp: 10}
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);

      await wrap
        .find('[data-test="submit-project-button"]')
        .simulate("click");
      await wait();
      await wrap.update();
      request = {projectId: 1, data: data, timestamp: 11}
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), request);
    });
  });

  describe("Unsuccessful message", () => {
    let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };

    it("Reenables the save and submit buttons if submission failed", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => { await presenter.submissionUnsuccessful() })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => {})
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          getRole={userRoleUseCaseSpy}
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
        />
      );

      await wrap.find('[data-test="submit-project-button"]').simulate('click');
      await wait();
      await wrap.update();

      expect(
        wrap.find('[data-test="disabled-update-project-button"]').length
      ).toEqual(0);
      expect(
        wrap.find('[data-test="disabled-submit-project-button"]').length
      ).toEqual(0);
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
        1
      );
      expect(wrap.find("[data-test='submitted-button-error']").length).toEqual(1);
    });

    it("Reenables the save and submit buttons if saving failed", async () => {
      let submitBaselineSpy = {
        execute: jest.fn(async (presenter, id) => {})
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, request) => { await presenter.projectNotUpdated() })
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <AmendProjectPage
          projectURL={getProjectURLUsecase}
          getRole={userRoleUseCaseSpy}
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitBaseline={submitBaselineSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
        />
      );

      await wrap.find('[data-test="update-project-button"]').simulate('click');
      await wait();
      await wrap.update();

      expect(
        wrap.find('[data-test="disabled-update-project-button"]').length
      ).toEqual(0);
      expect(
        wrap.find('[data-test="disabled-submit-project-button"]').length
      ).toEqual(0);
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
        1
      );
      expect(wrap.find("[data-test='save-button-error']").length).toEqual(1);
    });
  });

  it("clears the draft saved message after something is submitted", async () => {
    let submitBaselineSpy = {
      execute: jest.fn((presenter, id) => {
        presenter.submissionSuccessful(id);
      })
    };
    let userRoleUseCaseSpy = { execute: jest.fn(() => ({role: "Homes England"})) };
    let updateProjectSpy = {
      execute: jest.fn((presenter, request) => presenter.projectUpdated({errors: []}))
    };
    let validateProjectSpy = { execute: jest.fn(() => {}) };

    let wrap = mount(
      <AmendProjectPage
        projectURL={getProjectURLUsecase}
        projectId={1}
        match={{params: {baselineId: 1}}}
        submitBaseline={submitBaselineSpy}
        updateProject={updateProjectSpy}
        validateProject={validateProjectSpy}
        data={data}
        getRole={userRoleUseCaseSpy}
        schema={schema}
      />
    );

    await wait();
    await wrap.find('[data-test="update-project-button"]').simulate("click");
    await wait();
    await wrap.update();
    await wrap.find('[data-test="submit-project-button"]').simulate("click");
    await wait();
    await wrap.update();
    expect(wrap.find('[data-test="project-update-success"]').length).toEqual(0);
  });
});
