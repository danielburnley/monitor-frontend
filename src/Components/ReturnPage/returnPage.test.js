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

describe('ReturnPage', () => {
  describe('valid form ', () => {
    let validateReturnSpy, createReturnSpy, getReturnSpy, updateReturnSpy, getBaseReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn()};
      submitReturnSpy = {execute: jest.fn(() => {execute: (presenter, request) => {presenter.submissionSuccessful(1);}})};
      createReturnSpy = {execute: jest.fn(() => {execute: (presenter, request) => {presenter.creationSuccessful(1);}})};
      getReturnSpy = {execute: jest.fn(() => {execute: (presenter, request) => {presenter.updateSuccessful(1);}})};
      updateReturnSpy = {execute: jest.fn()};
      getBaseReturnSpy = {execute: jest.fn()};
    });

    describe('saving', () => {
      it('doesnt show a validation error', async () => {
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
                getReturn={{execute: (presenter, request) => {presenter.presentReturn({ //This needs to be a fake so it can cope with state change
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
              }}}
                getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
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
                });}}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "Meow");
        await saveReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: "Meow"}});
        expect(wrap.find(".alert-danger").length).toEqual(0);
      });
    });

    describe('submitting', () => {
      it('permits submission', async () => {
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
                getReturn={{execute: (presenter, request) => {presenter.presentReturn({ //This needs to be a fake so it can cope with state change
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
              }}}
                getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
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
                });}}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "cat");
        await submitReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {cathouse: 'cat'}});
        expect(submitReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), { returnId: 1, data: { cathouse: { cathouse: 'cat' } } });
        expect(wrap.find(".alert-danger").length).toEqual(0);
      });
    });

  });

  describe('invalid form', () => {
    let validateReturnSpy, createReturnSpy, getReturnSpy, updateReturnSpy, getBaseReturnSpy, submitReturnSpy;
    beforeEach(() => {
      validateReturnSpy = {execute: jest.fn(async (presenter, formdata) => { await presenter.invalidateFields([['cathouse','cat']])})};
      submitReturnSpy = {execute: jest.fn()};
      createReturnSpy = {execute: jest.fn((presenter, request) => {presenter.creationSuccessful(1);})};
      getReturnSpy = {execute: jest.fn()};
      updateReturnSpy = {execute: jest.fn((presenter, request) => {presenter.updateSuccessful(1);})};
      getBaseReturnSpy = {execute: jest.fn()};
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
                getReturn={{execute: (presenter, request) => {presenter.presentReturn({ //This needs to be a fake so it can cope with state change
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
              }}}
                getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
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
                });}}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await submitReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}});
        expect(submitReturnSpy.execute).not.toHaveBeenCalled();
        expect(wrap.find(".alert-danger").length).toEqual(1);
      });
    });

    describe('saving', () => {
      it('shows a validation error', async () => {
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
                getReturn={{execute: (presenter, request) => {presenter.presentReturn({ //This needs to be a fake so it can cope with state change
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
              }}}
                getBaseReturn={{execute: (presenter, request) => {presenter.presentReturn({
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
                });}}}
              />);

        let input = wrap.find("[type='text'] input").first();
        await updateFormField(input, "");
        await saveReturn(wrap);
        await wait();
        expect(validateReturnSpy.execute).toHaveBeenCalledWith(expect.anything(), projectId, {cathouse: {}});
        expect(wrap.find(".alert-danger").length).toEqual(1);
      });
    });
  });
});
