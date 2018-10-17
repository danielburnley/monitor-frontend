import NewProjectPage from ".";
import React from "react";
import { mount } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate("change", { target: { value } });
  await wait();
}

describe("NewProjectPage", () => {
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

  describe("disables buttons while project updating hasnt completed", () => {
    it("example 1", async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {}) };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
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
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => {}) };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
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

  describe("calls the submit project use case", () => {
    it("example 1", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
        />
      );
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();

      expect(submitProjectSpy.execute).toBeCalledWith(expect.anything(), 1);
    });

    it("example 2", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 9 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await updateFormField(wrap.find('input[type="text"]'), "cashews");
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      expect(submitProjectSpy.execute).toBeCalledWith(expect.anything(), 9);
    });
  });

  describe("calls the update project use case", () => {
    it("example 1", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 9 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={{}}
          schema={schema}
        />
      );

      await wait();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), 9, {});
    });

    it("example 2", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "cashews");
      await wrap.update();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), 1, {
        cat: { catA: { catB: "cashews" } }
      });
    });
  });

  describe("call the validate project use case when updating a project", () => {
    it("Example 1", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          projectType={"hif"}
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "hi");
      await wrap.update();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(validateProjectSpy.execute).toBeCalledWith(
        expect.anything(),
        "hif",
        { cat: { catA: { catB: "hi" } } }
      );
    });

    it("Example 2", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          projectType={"ac"}
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "Meow");
      await wrap.update();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(validateProjectSpy.execute).toBeCalledWith(
        expect.anything(),
        "ac",
        { cat: { catA: { catB: "Meow" } } }
      );
    });
  });

  describe("call the validate project use case when submitting a project", () => {
    it("Example 1", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          projectType={"hif"}
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "hi");
      await wrap.update();
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      expect(validateProjectSpy.execute).toBeCalledWith(
        expect.anything(),
        "hif",
        { cat: { catA: { catB: "hi" } } }
      );
    });

    it("Example 2", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          projectType={"ac"}
          match={{params: {id: 1}}}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), "bye");
      await wrap.update();
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      expect(validateProjectSpy.execute).toBeCalledWith(
        expect.anything(),
        "ac",
        { cat: { catA: { catB: "bye" } } }
      );
    });
  });

  describe("validation warning message", () => {
    describe("Example 1", () => {
      it("shows yellow warning upon update", async () => {
        let submitProjectSpy = { execute: jest.fn(async () => {}) };
        let updateProjectSpy = { execute: jest.fn(async () => {}) };
        let validateProjectSpy = {
          execute: jest.fn(async presenter => {
            await presenter.invalidateFields([["less", "cats"]]);
          })
        };

        let wrap = mount(
          <NewProjectPage
            match={{ params: { id: 1 } }}
            projectType={"hey"}
            updateProject={updateProjectSpy}
            submitProject={submitProjectSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
          />
        );

        await wait();
        await wrap
          .find('[data-test="update-project-button"]')
          .simulate("click");
        await wrap.update();
        expect(wrap.find('[data-test="validationWarning"]').length).toEqual(1);
        expect(wrap.find('[data-test="validationWarning"]').text()).toContain(
          "less → cats"
        );
      });
    });

    describe("Example 2", () => {
      it("shows yellow warning upon update", async () => {
        let submitProjectSpy = { execute: jest.fn(async () => {}) };
        let updateProjectSpy = { execute: jest.fn(async () => {}) };
        let validateProjectSpy = {
          execute: jest.fn(async presenter => {
            await presenter.invalidateFields([["no", "more", "cats"]]);
          })
        };

        let wrap = mount(
          <NewProjectPage
            match={{ params: { id: 1 } }}
            projectType={"hey"}
            updateProject={updateProjectSpy}
            submitProject={submitProjectSpy}
            validateProject={validateProjectSpy}
            data={data}
            schema={schema}
          />
        );

        await wait();
        await wrap
          .find('[data-test="update-project-button"]')
          .simulate("click");
        await wrap.update();
        expect(wrap.find('[data-test="validationWarning"]').length).toEqual(1);
        expect(wrap.find('[data-test="validationWarning"]').text()).toContain(
          "no → more → cats"
        );
      });
    });
  });

  describe("validation Error Message", () => {
    it("shows red error upon submitting", async () => {
      let submitProjectSpy = { execute: jest.fn(async () => {}) };
      let updateProjectSpy = { execute: jest.fn(async () => {}) };
      let validateProjectSpy = {
        execute: jest.fn(async presenter => {
          await presenter.invalidateFields([[]]);
        })
      };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          projectType={"hey"}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wrap.update();
      expect(wrap.find('[data-test="validationError"]').length).toEqual(1);
      expect(submitProjectSpy.execute).not.toBeCalled();
    });
  });

  describe("success message", () => {
    it("shows only the success message", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async presenter => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
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
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(
        0
      );
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(
        0
      );
      expect(wrap.find('[data-test="validationError"]').length).toEqual(0);
    });

    it("doesnt show the success message", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
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
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          updateProject={updateProjectSpy}
          submitProject={submitProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        1
      );
      expect(wrap.find('[data-test="validationWarning"]').length).toEqual(0);
    });

    it("doesnt show the draft saved message", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          submitProject={submitProjectSpy}
          updateProject={updateProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        0
      );
    });

    it("clears the draft saved message after something is entered", async () => {
      let submitProjectSpy = {
        execute: jest.fn(async (presenter, id) => {
          presenter.creationSuccess(id);
        })
      };
      let updateProjectSpy = {
        execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
      };
      let validateProjectSpy = { execute: jest.fn(async () => {}) };

      let wrap = mount(
        <NewProjectPage
          match={{ params: { id: 1 } }}
          submitProject={submitProjectSpy}
          updateProject={updateProjectSpy}
          validateProject={validateProjectSpy}
          data={data}
          schema={schema}
        />
      );

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await updateFormField(wrap.find('input[type="text"]'), "cashews");

      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(
        0
      );
    });
  });

  it("clear the draft saved message after something is submitted", async () => {
    let submitProjectSpy = {
      execute: jest.fn(async (presenter, id) => {
        presenter.creationSuccess(id);
      })
    };
    let updateProjectSpy = {
      execute: jest.fn(async (presenter, id) => presenter.projectUpdated(id))
    };
    let validateProjectSpy = { execute: jest.fn(async () => {}) };

    let wrap = mount(
      <NewProjectPage
        match={{ params: { id: 1 } }}
        submitProject={submitProjectSpy}
        updateProject={updateProjectSpy}
        validateProject={validateProjectSpy}
        data={data}
        schema={schema}
      />
    );

    await wait();
    await wrap.find('[data-test="update-project-button"]').simulate("click");
    await wrap.find('[data-test="submit-project-button"]').simulate("click");

    await wrap.update();
    expect(wrap.find('[data-test="project-update-success"]').length).toEqual(0);
  });
});
