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
    type: 'object',
    properties: {
      cat: {
        type: 'object',
        properties: {
          catA: {
            type: 'object',
            properties: {
              catB: {
                type: 'string'
              }
            }
          }
        }
      }
    }
  };

  describe('disables buttons while project updating hasnt completed', () => {
    it('example 1', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {{}}
          schema = {schema}
        />);
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wait();
      expect(wrap.find('[data-test="disabled-submit-project-button"]').length).toEqual(1);
      expect(wrap.find('[data-test="disabled-update-project-button"]').length).toEqual(1);
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(0);
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(0);
    });

    it('example 2', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => {})};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {{}}
          schema = {schema}
        />);
      wrap.find('[data-test="update-project-button"]').simulate("click");
      await wait();
      expect(wrap.find('[data-test="disabled-submit-project-button"]').length).toEqual(1);
      expect(wrap.find('[data-test="disabled-update-project-button"]').length).toEqual(1);
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(0);
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(0);
    });
  });

  describe('calls the submit project use case', () => {
    it('example 1', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {{}}
          schema = {schema}
        />);
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      expect(submitProjectSpy.execute).toBeCalledWith(expect.anything(), 1);
    });

    it('example 2', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 9}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), 'cashews');
      wrap.find('[data-test="submit-project-button"]').simulate("click");
      expect(submitProjectSpy.execute).toBeCalledWith(expect.anything(), 9);
    });
  });

  describe('calls the update project use case', () => {
    it('example 1', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 9}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {{}}
          schema = {schema}
        />);

      await wait();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), 9, {});
    });

    it('example 2', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await updateFormField(wrap.find('input[type="text"]'), 'cashews');
      await wrap.update();
      wrap.find('[data-test="update-project-button"]').simulate("click");
      expect(updateProjectSpy.execute).toBeCalledWith(expect.anything(), 1, {cat: {catA: {catB: "cashews"}}});
    });
  });



  describe('success message', () => {
    it('shows only the success message', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await wrap.find('[data-test="submit-project-button"]').simulate("click");
      await wrap.update();
      expect(wrap.find('[data-test="project-create-success"]').length).toEqual(1);
      expect(wrap.find('[data-test="parent-form"]').length).toEqual(0);
      expect(wrap.find('[data-test="submit-project-button"]').length).toEqual(0);
      expect(wrap.find('[data-test="update-project-button"]').length).toEqual(0);
    });

    it('doesnt show the success message', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          submitProject = {submitProjectSpy}
          data = {data}
          schema = {schema}
          updateProject = {updateProjectSpy}
        />);

      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-create-success"]').length).toEqual(0);
    });
  });

  describe('draft saved message', () => {
    it('shows the draft saved message', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          updateProject = {updateProjectSpy}
          submitProject = {submitProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(1);
    });

    it('doesnt show the draft saved message', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          submitProject = {submitProjectSpy}
          updateProject = {updateProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(0);
    });

    it('clears the draft saved message after something is entered', async () => {
      let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
      let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

      let wrap = mount(<NewProjectPage
          match={{params: {id: 1}}}
          submitProject = {submitProjectSpy}
          updateProject = {updateProjectSpy}
          data = {data}
          schema = {schema}
        />);

      await wait();
      await wrap.find('[data-test="update-project-button"]').simulate("click");
      await updateFormField(wrap.find('input[type="text"]'), 'cashews');

      await wrap.update();
      expect(wrap.find('[data-test="project-update-success"]').length).toEqual(0);
    });
  });

  it('clear the draft saved message after something is submitted', async () => {
    let submitProjectSpy = { execute: jest.fn(async (presenter, id) => {presenter.creationSuccess(id);}) };
    let updateProjectSpy = { execute: jest.fn(async (presenter, id) => (presenter.projectUpdated(id)))};

    let wrap = mount(<NewProjectPage
        match={{params: {id: 1}}}
        submitProject = {submitProjectSpy}
        updateProject = {updateProjectSpy}
        data = {data}
        schema = {schema}
      />);

    await wait();
    await wrap.find('[data-test="update-project-button"]').simulate("click");
    await wrap.find('[data-test="submit-project-button"]').simulate("click");

    await wrap.update();
    expect(wrap.find('[data-test="project-update-success"]').length).toEqual(0);
  });
});
