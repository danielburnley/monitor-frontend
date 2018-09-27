import GenerateReadOnlySchema from '../../UseCase/GenerateReadOnlySchema';
import GenerateUISchema from '../../UseCase/GenerateUISchema';
import React from "react";
import ReturnPage from ".";
import { shallow, mount } from "enzyme";

function submitReturn(form) {
  form.find('[data-test="submit-return-button"]').simulate("click");
}

function saveReturn(form) {
  form.find('[data-test="save-return-button"]').simulate("click");
}

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate('change', {target: {value}});
  await wait();
}

class getReturnStub {
  async execute(presenter, request) {
    await presenter.presentReturn({
      status: 'Draft',
      data: {cathouse: {cathouse: 'cat'}},
      schema: {
        type: 'object',
        properties: {
          cathouse: {
            type: 'object',
            title: 'cathouse',
            properties: {
              cathouse: {
                type: 'string',
                readonly: true
              }
            }
          }
        }
      }
    });
  }
}
class getBaseReturnStub {
  async execute(presenter, request) {
    await presenter.presentReturn({
      status: 'Draft',
      data: {},
      schema: {
        type: 'object',
        properties: {
          cathouse: {
            type: 'object',
            title: 'cathouse',
            properties: {
              cathouse: {
                type: 'string',
                readonly: true
              }
            }
          }
        }
      }
    });
  }
}
describe('ReturnPage', () => {
  describe('valid form ', () => {
    let validateReturnSpy, createReturnSpy, updateReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn(() => {})};
      submitReturnSpy = {execute: jest.fn(async (presenter) => {await presenter.submissionSuccessful(1);})};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
    });

    describe('nothing has been submitted', () => {
      it('does not show any messages', async () => {
        let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};

        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);
        await wait();

        expect(wrap.find("[data-test='save-return-button']").length).toEqual(1);
        expect(wrap.find("[data-test='submit-return-button']").length).toEqual(1);

        expect(wrap.find("[data-test='disabled-save-return-button']").length).toEqual(0);
        expect(wrap.find("[data-test='disabled-submit-return-button']").length).toEqual(0);

        expect(wrap.find("[data-test='validationError']").length).toEqual(0);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
      });
    });

    describe('saving', () => {
      it('it disables the save button until it finishes saving', async () => {
        let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};

        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "Meow");
        await saveReturn(wrap);
        await wait();

        expect(wrap.find("[data-test='save-return-button']").length).toEqual(0);
        expect(wrap.find("[data-test='submit-return-button']").length).toEqual(0);

        expect(wrap.find("[data-test='disabled-save-return-button']").length).toEqual(1);
        expect(wrap.find("[data-test='disabled-submit-return-button']").length).toEqual(1);
      });

      it('shows a success message', async () => {
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "Meow");
        await saveReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: "Meow"}});
        expect(wrap.find("[data-test='validationError']").length).toEqual(0);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(1);
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
      });

      it('hides the success message after data entry resumes', async () => {
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("input[type='text']").first();
        await updateFormField(input, "Meow");
        await saveReturn(wrap);
        await updateFormField(input, "Cats");
        wrap.update();

        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationWarning']").length).toEqual(0);
      });
    });

    describe('submitting', () => {
      it('it disables the save button until it finishes saving', async () => {
        let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};

        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "Meow");
        await submitReturn(wrap);
        await wait();

        expect(wrap.find("[data-test='save-return-button']").length).toEqual(0);
        expect(wrap.find("[data-test='submit-return-button']").length).toEqual(0);

        expect(wrap.find("[data-test='disabled-save-return-button']").length).toEqual(1);
        expect(wrap.find("[data-test='disabled-submit-return-button']").length).toEqual(1);
      });

      it('submits', async () => {
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "cat");
        await submitReturn(wrap);
        await wait();
        wrap.update();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: 'cat'}});
        expect(submitReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), { returnId: 1, data: { cathouse: { cathouse: 'cat' } } });
        expect(wrap.find("[data-test='validationError']").length).toEqual(0);
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(1);
        expect(wrap.find("[data-test='return']").length).toEqual(0);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
      });
    });
  });

  describe('invalid form', () => {
    let validateReturnSpy, createReturnSpy, updateReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn((presenter, formdata) => { presenter.invalidateFields([['catHouse',0,'catHouse']])})};
      submitReturnSpy = {execute: jest.fn()};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
    });

    describe('submitting', () => {
      it('prevents submission', async () => {
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await submitReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}});
        expect(submitReturnSpy.execute).not.toHaveBeenCalled();
        expect(wrap.find("[data-test='validationError']").length).toEqual(1);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationError']").text()).toEqual("Error: This return could not be submitted because the following fields were missing: Cat House → Item 1 → Cat House");
      });
    });

    describe('saving', () => {
      it('shows a validation warning', async () => {
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={new GenerateUISchema()}
                generateSubmittedSchema={new GenerateReadOnlySchema()}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await saveReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}});
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationWarning']").length).toEqual(1);
        expect(wrap.find("[data-test='validationWarning']").text()).toEqual("Warning: You will not be able to submit this return until the following fields are filled in: Cat House → Item 1 → Cat House");
      });
    });
  });
});
