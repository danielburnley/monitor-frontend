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
  describe('submitting an valid form', () => {
    it('permits submission', async () => {
      let validateReturnSpy = {execute: jest.fn(async (presenter, formdata) => {})};
      let submitReturnSpy = {execute: jest.fn(async (presenter, request) => {})}
      let createReturnSpy = {execute: jest.fn()};
      let getReturnSpy = {execute: jest.fn()};
      let updateReturnSpy = {execute: jest.fn()};
      let getBaseReturnSpy = {execute: jest.fn()};

      let projectId = 1;
      let wrap = mount(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={new GenerateUISchema()}
              generateSubmittedSchema={new GenerateReadOnlySchema()}
              history={[]}
              createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
              submitReturn={submitReturnSpy}
              updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
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

  describe('submitting an invalid form', () => {
    it('prevents submission', async () => {
      let validateReturnSpy = {execute: jest.fn(async (presenter, formdata) => { await presenter.invalidateFields([['cathouse','cat']])})};
      let submitReturnSpy = {execute: jest.fn(async (presenter, projectId, formData) => {})}
      let createReturnSpy = {execute: jest.fn()};
      let getReturnSpy = {execute: jest.fn()};
      let updateReturnSpy = {execute: jest.fn()};
      let getBaseReturnSpy = {execute: jest.fn()};

      let projectId = 1;
      let wrap = mount(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={new GenerateUISchema()}
              generateSubmittedSchema={new GenerateReadOnlySchema()}
              history={[]}
              createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
              submitReturn={submitReturnSpy}
              updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
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

  describe('saving an invalid form', () => {
    it('shows a validation error', async () => {
      let validateReturnSpy = {execute: jest.fn((presenter, formdata) => {presenter.invalidateFields([['cathouse','cathouse']])})};
      let createReturnSpy = {execute: jest.fn()};
      let getReturnSpy = {execute: jest.fn()};
      let updateReturnSpy = {execute: jest.fn()};
      let getBaseReturnSpy = {execute: jest.fn()};

      let projectId = 1;
      let wrap = mount(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={new GenerateUISchema()}
              generateSubmittedSchema={new GenerateReadOnlySchema()}
              history={[]}
              createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
              submitReturn={{execute: (presenter, request) => {presenter.submissionSuccessful(1);}}}
              updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
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

  describe('saving an valid form', () => {
    it('doesnt show a validation error', async () => {
      let validateReturnSpy = {execute: jest.fn((presenter, formdata) => {})};
      let createReturnSpy = {execute: jest.fn()};
      let getReturnSpy = {execute: jest.fn()};
      let updateReturnSpy = {execute: jest.fn()};
      let getBaseReturnSpy = {execute: jest.fn()};

      let projectId = 1;
      let wrap = mount(<ReturnPage
              validateReturn={validateReturnSpy}
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={new GenerateUISchema()}
              generateSubmittedSchema={new GenerateReadOnlySchema()}
              history={[]}
              createReturn={{execute: (presenter, request) => {presenter.creationSuccessful(1);}}}
              submitReturn={{execute: (presenter, request) => {presenter.submissionSuccessful(1);}}}
              updateReturn={{execute: (presenter, request) => {presenter.updateSuccessful(1);}}}
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
});
