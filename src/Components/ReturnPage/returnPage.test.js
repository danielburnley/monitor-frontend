import GenerateDisabledUISchema from '../../UseCase/GenerateDisabledUISchema';
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

class getSubmittedReturnStub {
  constructor(type='ac') {
    this.type = type;
  }

  async execute(presenter, request) {
    await presenter.presentReturn({
      type: this.type,
      status: 'Submitted',
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

class getReturnStub {
  constructor(type='ac') {
    this.type = type;
  }

  async execute(presenter, request) {
    await presenter.presentReturn({
      type: this.type,
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
      },
      no_of_previous_returns: 7
    });
  }
}
class getBaseReturnStub {
  constructor(type='ac') {
    this.type = type;
  }
  async execute(presenter, request) {
    await presenter.presentReturn({
      type: this.type,
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
      },
      no_of_previous_returns: 7
    });
  }
}

describe('ReturnPage', () => {
  describe('already submitted form', () => {
    let validateReturnSpy, createReturnSpy, updateReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn(() => {})};
      submitReturnSpy = {execute: jest.fn(async (presenter) => {await presenter.submissionSuccessful(1);})};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
    });

    it('does not show any messages', async () => {
      let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};

      let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
      let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
      let projectId = 1;
      let wrap = mount(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={ generateUISchema }
              generateSubmittedSchema={ generateDisabledUISchema }
              history={[]}
              createReturn={createReturnSpy}
              submitReturn={submitReturnSpy}
              updateReturn={unresolvingUpdateReturnStub}
              getReturn={new getSubmittedReturnStub()}
              getBaseReturn={new getBaseReturnStub()}
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            />);
      await wait();

      expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
      expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
      expect(wrap.find("[data-test='validationError']").length).toEqual(0);

    });
  });

  describe('valid form ', () => {
    let validateReturnSpy, createReturnSpy, updateReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn(() => {})};
      submitReturnSpy = {execute: jest.fn(async (presenter) => {await presenter.submissionSuccessful(1);})};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
    });

    it("Passes the document gateway to the return form", async () => {
      let documentGatewayDummy = jest.fn()
      let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
      let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
      let wrap = shallow(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={ generateUISchema }
              generateSubmittedSchema={generateDisabledUISchema}
              history={[]}
              createReturn={createReturnSpy}
              submitReturn={submitReturnSpy}
              updateReturn={()=>{}}
              getReturn={new getReturnStub()}
              getBaseReturn={new getBaseReturnStub()}
              documentGateway={documentGatewayDummy}
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            />);

      await wait();
      expect(wrap.find({'data-test': 'return-form'}).props().documentGateway).toEqual(documentGatewayDummy)
    });

    describe("Passes the project id to the return form", () => {
      it("Example 1", async () => {
        let documentGatewayDummy = jest.fn()
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let wrap = shallow(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={ generateUISchema }
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={()=>{}}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                documentGateway={documentGatewayDummy}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />);

        await wait();
        expect(wrap.find({'data-test': 'return-form'}).props().projectId).toEqual(1)
      });

      it("Example 2", async () => {
        let documentGatewayDummy = jest.fn()
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let wrap = shallow(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 6, returnId: 1 } }}
                generateUISchema={ generateUISchema }
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={()=>{}}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                documentGateway={documentGatewayDummy}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />);

        await wait();
        expect(wrap.find({'data-test': 'return-form'}).props().projectId).toEqual(6)
      });
    });

    describe("nothing has been submitted", () => {
      it("does not show any messages", async () => {
        let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
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
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let projectId = 1;

        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
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

      describe('shows a success message', () => {
        it('example 1', async () => {
          let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
          let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
          let projectId = 1;

          let wrap = mount(<ReturnPage
                  validateReturn={validateReturnSpy}
                  match={{ params: { projectId: 1, returnId: 1 } }}
                  generateUISchema={generateUISchema}
                  generateSubmittedSchema={generateDisabledUISchema}
                  history={[]}
                  createReturn={createReturnSpy}
                  submitReturn={submitReturnSpy}
                  updateReturn={updateReturnSpy}
                  getReturn={new getReturnStub()}
                  getBaseReturn={new getBaseReturnStub()}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                />);

          let input = wrap.find("[type='text'] input").first();
          await updateFormField(input, "Meow");
          await saveReturn(wrap);
          await wait();
          expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: "Meow"}}, 'ac');
          expect(wrap.find("[data-test='validationError']").length).toEqual(0);
          expect(wrap.find("[data-test='saveSuccess']").length).toEqual(1);
          expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
        });

        it('example 2', async () => {
          let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
          let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
          let projectId = 1;

          let wrap = mount(<ReturnPage
                  validateReturn={validateReturnSpy}
                  match={{ params: { projectId: 1, returnId: 1 } }}
                  generateUISchema={generateUISchema}
                  generateSubmittedSchema={generateDisabledUISchema}
                  history={[]}
                  createReturn={createReturnSpy}
                  submitReturn={submitReturnSpy}
                  updateReturn={updateReturnSpy}
                  getReturn={new getReturnStub('hif')}
                  getBaseReturn={new getBaseReturnStub('hif')}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                />);

          let input = wrap.find("[type='text'] input").first();
          await updateFormField(input, "Meow");
          await saveReturn(wrap);
          await wait();
          expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: "Meow"}}, 'hif');
          expect(wrap.find("[data-test='validationError']").length).toEqual(0);
          expect(wrap.find("[data-test='saveSuccess']").length).toEqual(1);
          expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
        });
      });

      it('hides the success message after data entry resumes', async () => {
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let projectId = 1;

        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
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
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let unresolvingUpdateReturnStub = {execute: jest.fn(() => {execute: async (presenter, request) => {await new Promise(resolve => setTimeout(resolve, 14159265358));}})};

        let projectId = 1;
        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={unresolvingUpdateReturnStub}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
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

      describe('permits submission', () => {
        it('example 1', async () => {
          let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
          let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
          let projectId = 9;

          let wrap = mount(<ReturnPage
                  validateReturn={validateReturnSpy}
                  match={{ params: { projectId: 9, returnId: 1 } }}
                  generateUISchema={generateUISchema}
                  generateSubmittedSchema={generateDisabledUISchema}
                  history={[]}
                  createReturn={createReturnSpy}
                  submitReturn={submitReturnSpy}
                  updateReturn={updateReturnSpy}
                  getReturn={new getReturnStub()}
                  getBaseReturn={new getBaseReturnStub()}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                />);

          let input = wrap.find("[type='text'] input").first();
          await updateFormField(input, "cat");
          await submitReturn(wrap);
          await wait();
          wrap.update();
          expect(submitReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), { projectId: 9, returnId: 1, data: { cathouse: { cathouse: 'cat' } } });
          expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: 'cat'}}, 'ac');
          expect(wrap.find("[data-test='validationError']").length).toEqual(0);
          expect(wrap.find("[data-test='submitSuccess']").length).toEqual(1);
          expect(wrap.find("[data-test='return']").length).toEqual(0);
          expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        });

        it('example 1', async () => {
          let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
          let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
          let projectId = 9;

          let wrap = mount(<ReturnPage
                  validateReturn={validateReturnSpy}
                  match={{ params: { projectId: 9, returnId: 1 } }}
                  generateUISchema={generateUISchema}
                  generateSubmittedSchema={generateDisabledUISchema}
                  history={[]}
                  createReturn={createReturnSpy}
                  submitReturn={submitReturnSpy}
                  updateReturn={updateReturnSpy}
                  getReturn={new getReturnStub('hif')}
                  getBaseReturn={new getBaseReturnStub('hif')}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                />);

          let input = wrap.find("[type='text'] input").first();
          await updateFormField(input, "cat");
          await submitReturn(wrap);
          await wait();
          wrap.update();
          expect(submitReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), { projectId: 9, returnId: 1, data: { cathouse: { cathouse: 'cat' } } });
          expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: 'cat'}}, 'hif');
          expect(wrap.find("[data-test='validationError']").length).toEqual(0);
          expect(wrap.find("[data-test='submitSuccess']").length).toEqual(1);
          expect(wrap.find("[data-test='return']").length).toEqual(0);
          expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        });
      });
    });
  });

  describe('invalid form', () => {
    let validateReturnSpy, createReturnSpy, updateReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn((presenter, formdata) => { presenter.invalidateFields([['Cat House','Cat House']])})};
      submitReturnSpy = {execute: jest.fn()};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
    });

    describe('submitting', () => {
      it('prevents submission', async () => {
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let projectId = 1;

        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await submitReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}}, 'ac');
        expect(submitReturnSpy.execute).not.toHaveBeenCalled();
        expect(wrap.find("[data-test='validationError']").length).toEqual(1);
        expect(wrap.find("[data-test='saveSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationError']").text()).toEqual("Error: This return could not be submitted because the following fields were missing: Cat House → Cat House");
      });
    });

    describe('saving', () => {
      it('shows a validation warning', async () => {
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let projectId = 1;
        let returnId = 1;

        let wrap = mount(<ReturnPage
                validateReturn={validateReturnSpy}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={createReturnSpy}
                submitReturn={submitReturnSpy}
                updateReturn={updateReturnSpy}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await saveReturn(wrap);
        await wait();
        expect(updateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), {projectId, returnId, data: {cathouse: {}}});
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}}, 'ac');
        expect(wrap.find("[data-test='submitSuccess']").length).toEqual(0);
        expect(wrap.find("[data-test='validationWarning']").length).toEqual(1);
        expect(wrap.find("[data-test='validationWarning']").text()).toEqual("Warning: You will not be able to submit this return until the following fields are filled in: Cat House → Cat House");
      });
    });
  });

  describe('When editing a form', () => {
    describe('Before creation', () => {
      it('Does keeps the state as "Draft"', async () => {
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);

        let wrap = mount(<ReturnPage
                validateReturn={() => {}}
                match={{ params: { projectId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={()=>{}}
                submitReturn={()=>{}}
                updateReturn={() => {}}
                getReturn={new getReturnStub()}
                getBaseReturn={new getBaseReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
              />);
        await wait();

        wrap.find('ReturnForm').props().onChange({})

        expect(wrap.state().status).toEqual("Draft")
      });
    });

    describe('After creation', () => {
      it('Updates the state to editing', async () => {
        let generateUISchema = new GenerateUISchema({ getUserRole: () => ({userRole: ""}) });
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);

        let wrap = mount(<ReturnPage
                validateReturn={() => {}}
                match={{ params: { projectId: 1, returnId: 1 } }}
                generateUISchema={generateUISchema}
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                createReturn={()=>{}}
                submitReturn={()=>{}}
                updateReturn={() => {}}
                getReturn={new getReturnStub()}
                getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                getBaseReturn={new getBaseReturnStub()}
              />);
        await wait();

        wrap.find('ReturnForm').props().onChange({})

        expect(wrap.state().status).toEqual("Editing")
      });
    });
  });
});
