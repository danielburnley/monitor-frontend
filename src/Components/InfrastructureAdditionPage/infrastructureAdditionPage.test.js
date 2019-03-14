import React from "react";
import { mount } from "enzyme";
import InfrastructureAdditionPage from ".";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("Infrastructure Addition page", () => {
  let component, getProjectUseCase, updateProjectUseCase, history, generateInfrastructureUISchemaUseCase;

  describe("Example 1", () => {
    beforeEach(async () => {
      history = ["/project/6", "/project/3/infrastructures"];
      generateInfrastructureUISchemaUseCase = {
        execute: jest.fn(() => (
          {
            "ui:options": {
              addable: true,
              removable: true
            }
          }
        )
      )};

      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => {
            presenter.presentProject({
              timestamp: 746841600,
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
          }
        )
      };

      updateProjectUseCase= {execute: jest.fn(async (presenter, id) => { await presenter.projectUpdated("", 13) })}

      component = mount(<
        InfrastructureAdditionPage
        generateInfrastructureUISchema={generateInfrastructureUISchemaUseCase}
        history={history}
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { projectId: 3, type: 'ff' } }}
      />);

      await component.update();
    });

    it("Calls the generateInfrastructureUISchema use case", () => {
      expect(generateInfrastructureUISchemaUseCase.execute).toHaveBeenCalled();
    });

    it("Passes the InfrastructureUISchema to the form", () => {
      expect(component.find("Form").props().uiSchema).toEqual({
        "ui:options": {
          addable: true,
          removable: true
        }
      });
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

    describe("When submitted", () => {
      it("Navigates away", async () => {
        component.find("Form").simulate("submit");
        await wait();
        await component.update();
        expect(history).toEqual(["/project/6", "/project/3/infrastructures", "/project/3"]);
      });

      it("Calls the updateProject", async () => {
        component.find("Form").simulate("submit");
        await wait();
        await component.update();

        expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 3, {
          infrastructures: [
            {information: "Value"}
          ],
          other: {
            value: "data"
          }
        }, 746841600);
      });

      it("With edited data", async () => {
        component.find("input").at(0).simulate("change", {target: {value: "cat"}});
        component.find("Form").simulate("submit");
        await wait();
        await component.update();

        expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 3, {
          infrastructures: [
            {information: "cat"}
          ],
          other: {
            value: "data"
          }
        }, 746841600);
      });
    });
  });

  describe("Example 2", () => {
    beforeEach(async () => {
      history = ["/project/1/infrastructures"];
      generateInfrastructureUISchemaUseCase = {
        execute: jest.fn(() => {
          return {
            "ui:options": {
              addable: true,
              removable: true
            }
          }
        }
      )};

      getProjectUseCase = {
        execute: jest.fn(
          async (presenter) => {
            await presenter.presentProject(
              {
                timestamp: 1119003331,
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
              }
            )
          }
        )
      };

      updateProjectUseCase= {execute: jest.fn(async (presenter, id) => { await presenter.projectUpdated("", 15) })}

      component = mount(<
        InfrastructureAdditionPage
        generateInfrastructureUISchema={generateInfrastructureUISchemaUseCase}
        history={history}
        getProject={getProjectUseCase}
        updateProject={updateProjectUseCase}
        match={{ params: { projectId: 1, type: 'ff' } }}
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


    describe("When submitted", () => {
      it("Navigates away", async () => {
        component.find("Form").simulate("submit");
        await wait();
        await component.update();
        expect(history).toEqual(["/project/1/infrastructures", "/project/1"]);
      });

      it("Calls the updateProject", async () => {
        component.find("Form").simulate("submit");
        await wait();
        await component.update();

        expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 1, {
          infrastructures: [
            {name: "Alex"},
            {information: "Extra"}
          ],
          extra: {
            misc: "Some data"
          }
        }, 1119003331);
      });

      it("With edited data", async () => {
        component.find("input").at(0).simulate("change", {target: {value: "dog"}});
        component.find("Form").simulate("submit");
        await wait();
        await component.update();

        expect(updateProjectUseCase.execute).toHaveBeenCalledWith(expect.anything(), 1, {
          infrastructures: [
            {name: "dog"},
            {information: "Extra"}
          ],
          extra: {
            misc: "Some data"
          }
        }, 1119003331);
      });
    });
  });
});
