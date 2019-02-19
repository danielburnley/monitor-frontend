import React from "react";
import { mount } from "enzyme";
import InfrastructureAdditionPage from ".";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Infrastructure Addition page", () => {
  let component, getProjectUseCase, updateProjectUseCase;

  describe("Example 1", () => {
    beforeEach(async () => {
      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => presenter.presentProject({
            schema: {
              type: "object",
              properties: {
                infrastructures: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      information: {
                        type: "string"
                      }
                    }
                  }
                },
                other: {
                  type: "object",
                  properties: {
                    value: {
                      type: "string"
                    }
                  }
                }
              }
            },
            data: {
              infrastructures: [
                {information: "Value"}
              ],
              other: {
                value: "data"
              }
            }
          })
        )
      };

      updateProjectUseCase= {execute: jest.fn(async (presenter, id) => { await presenter.projectUpdated(id) })}

      component = mount(<
        InfrastructureAdditionPage
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { id: 3, type: 'ff' } }}
      />);

      await component.update();
    });

    it("Displays a form with only infrastructures", () => {
      expect(component.find("Form").props().schema).toEqual(
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              information: {
                type: "string"
              }
            }
          }
        }
      );

      expect(component.find("Form").props().formData).toEqual(
        [
          {information: "Value"}
        ]
      );
    });

    it("Calls the getProject use case", () => {
      expect(getProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), {id: 3});
    });
  });

  describe("Example 2", () => {
    beforeEach(async () => {
      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => await presenter.presentProject({
            schema: {
              type: 'object',
              properties: {
                infrastructures: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      name: {
                        type: "string"
                      },
                      information: {
                        type: "string"
                      }
                    }
                  }
                },
                extra: {
                  type: "object",
                  properties: {
                    misc: {
                      type: "string"
                    }
                  }
                }
              }
            },
            data: {
              infrastructures: [
                {name: "Alex"},
                {information: "Extra"}
              ],
              extra: {
                misc: "Some data"
              }
            }
          })
        )
      };

      updateProjectUseCase= {execute: jest.fn((presenter, id) => { presenter.projectUpdated(id) })}

      component = mount(<
        InfrastructureAdditionPage
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { id: 1, type: 'ff' } }}
      />);

      await component.update();
    });

    it("Displays a form with only infrastructures", () => {
      expect(component.find("Form").props().schema).toEqual(
        {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: {
                type: "string"
              },
              information: {
                type: "string"
              }
            }
          }
        }
      );

      expect(component.find("Form").props().formData).toEqual(
        [
          {name: "Alex"},
          {information: "Extra"}
        ]
      );
    });

    it("Calls the getProject use case", () => {
      expect(getProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), {id: 1});
    });
  });
});
