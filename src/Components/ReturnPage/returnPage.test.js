import GenerateDisabledUISchema from '../../UseCase/GenerateDisabledUISchema';
import React from "react";
import ReturnPage from ".";
import { mount } from "enzyme";


async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

class getReturnStub {
  constructor(type='ac', data, schema, status = "Draft") {
    this.type = type;
    this.data = data;
    this.status = status;
    this.schema = schema;
  }

  async execute(presenter, request) {
    await presenter.presentReturn({
      type: this.type,
      status: this.status,
      data: this.data,
      schema: this.schema,
      no_of_previous_returns: 7
    });
  }
}

class getBaseReturnStub {
  constructor(type='ac', data = {}, schema) {
    this.type = type;
    this.data = data;
    this.schema = schema;
  }
  async execute(presenter, request) {
    await presenter.presentReturn({
      type: this.type,
      status: 'Draft',
      data: this.data,
      schema: this.schema,
      no_of_previous_returns: 7
    });
  }
}

describe('ReturnPage', () => {
  let childrenSpy = jest.fn();

  describe("while waiting for the use case to respond", () => {
    it("doesn't display anything ", async () => {
      let documentGatewayDummy = jest.fn()

      let wrap = mount(<ReturnPage
              match={{ params: { projectId: 1, returnId: 1 } }}
              generateUISchema={ jest.fn() }
              generateSubmittedSchema={jest.fn()}
              history={[]}
              getReturn={{execute: jest.fn()}}
              getBaseReturn={jest.fn()}
              documentGateway={documentGatewayDummy}
              getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
            >{childrenSpy}</ReturnPage>);

      expect(wrap.find('[data-test="loading"]').length).toEqual(1)
    });
  });

  describe("Passes data from the correct usecase to it's children", () => {
    describe("Return ID is present and status is draft", () => {
      describe("Example 1", () => {
        it("Passes data from the get return use case and generate UI schema", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {cathouse: {cathouse: 'cat'}};
          let schema = {
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
          };
          let generateUISchema = {execute: jest.fn((data, no_of_previous_returns) => ({myUiSchema: "UI"}))};
          let generateSubmittedSchemaSpy = { execute: jest.fn(schema => ({iAmSubmitted: "You'll never change me now"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 1, returnId: 1 } }}
                  generateUISchema={ generateUISchema }
                  generateSubmittedSchema={generateSubmittedSchemaSpy}
                  history={[]}
                  getReturn={new getReturnStub("ac", data, schema)}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
                >{childrenSpy}</ReturnPage>);

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "ac",
            uiSchema: {myUiSchema: "UI"},
            status: "Draft"
          })
        });
      })

      describe("Example 2", () => {
        it("Passes data from the get return use case and generate UI schema", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {doghouse: {doghouse: 'dog'}};
          let schema = {
            type: 'object',
            properties: {
              doghouse: {
                type: 'object',
                title: 'doghouse',
                properties: {
                  dogs: {
                    type: 'string',
                    readonly: true
                  }
                }
              }
            }
          };
          let childrenSpy = jest.fn()
          let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({anotherUiSchema: "UI v.2"}))};
          let generateDisabledUISchemaSpy = { execute: jest.fn(schema => ({iAmAlsoSubmitted: "Mayb eyou can change me"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 6, returnId: 1 } }}
                  generateUISchema={ generateUISchemaSpy }
                  generateSubmittedSchema={generateDisabledUISchemaSpy}
                  history={[]}
                  getReturn={new getReturnStub("hif", data, schema)}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
                >
                {childrenSpy}
                </ReturnPage>
                );

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "hif",
            uiSchema: {anotherUiSchema: "UI v.2"},
            status: "Draft"
          })
        });
      });
    });

    describe("Return ID is present and status is submitted", () => {
      describe("Example 1", () => {
        it("Passes data from the get return use case and generate submitted ui schema", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {cathouse: {cathouse: 'cat'}};
          let schema = {
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
          };
          let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({myUiSchema: "UI"}))};
          let generateSubmittedSchemaSpy = { execute: jest.fn(schema => ({iAmSubmitted: "You'll never change me now"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 1, returnId: 1 } }}
                  generateUISchema={ generateUISchemaSpy }
                  generateSubmittedSchema={generateSubmittedSchemaSpy}
                  history={[]}
                  getReturn={new getReturnStub("ac", data, schema, "Submitted")}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
                >{childrenSpy}</ReturnPage>);

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "ac",
            uiSchema: {iAmSubmitted: "You'll never change me now"},
            status: "Submitted"
          })
        });
      })

      describe("Example 2", () => {
        it("Passes data from the get return use case and generate submitted ui schema", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {doghouse: {doghouse: 'dog'}};
          let schema = {
            type: 'object',
            properties: {
              doghouse: {
                type: 'object',
                title: 'doghouse',
                properties: {
                  dogs: {
                    type: 'string',
                    readonly: true
                  }
                }
              }
            }
          };
          let childrenSpy = jest.fn()
          let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({anotherUiSchema: "UI v.2"}))};
          let generateDisabledUISchemaSpy = { execute: jest.fn(schema => ({iAmAlsoSubmitted: "Mayb eyou can change me"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 6, returnId: 1 } }}
                  generateUISchema={ generateUISchemaSpy }
                  generateSubmittedSchema={generateDisabledUISchemaSpy}
                  history={[]}
                  getReturn={new getReturnStub("hif", data, schema, "Submitted")}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
                >
                {childrenSpy}
                </ReturnPage>
                );

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "hif",
            uiSchema: {iAmAlsoSubmitted: "Mayb eyou can change me"},
            status: "Submitted"
          })
        });
      });
    });

    describe("A Homes England User", () => {
      describe("Example 1", () => {
        it("Passes data from the get return use case and generate Homes England return UI schema use case", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {cathouse: {cathouse: 'cat'}};
          let schema = {
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
          };
          let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({myUiSchema: "UI"}))};
          let generateSubmittedSchemaSpy = { execute: jest.fn(schema => ({myUiSchema: "UI"}))};
          let generateHEReturnUISchema = { execute: jest.fn(schema => ({IamHE: "You'll never change me now"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 1, returnId: 1 } }}
                  generateUISchema={ generateUISchemaSpy }
                  generateSubmittedSchema={generateSubmittedSchemaSpy}
                  generateHEReturnUISchema={generateHEReturnUISchema}
                  history={[]}
                  getReturn={new getReturnStub("ac", data, schema, "Draft")}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                >{childrenSpy}</ReturnPage>);

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "ac",
            uiSchema: {IamHE: "You'll never change me now"},
            status: "Draft"
          })
        });
      })

      describe("Example 2", () => {
        it("Passes data from the get return use case and generate Homes England return UI schema use case", async () => {
          let documentGatewayDummy = jest.fn()
          let data = {doghouse: {doghouse: 'dog'}};
          let schema = {
            type: 'object',
            properties: {
              doghouse: {
                type: 'object',
                title: 'doghouse',
                properties: {
                  dogs: {
                    type: 'string',
                    readonly: true
                  }
                }
              }
            }
          };
          let childrenSpy = jest.fn()
          let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({anotherUiSchema: "UI v.2"}))};
          let generateDisabledUISchemaSpy = { execute: jest.fn(schema => ({anotherUiSchema: "UI v.2"}))};
          let generateHEReturnUISchema = { execute: jest.fn(schema => ({iamaheuser: "not allowed to edit"}))};
          let wrap = mount(<ReturnPage
                  match={{ params: { projectId: 6, returnId: 1 } }}
                  generateUISchema={ generateUISchemaSpy }
                  generateSubmittedSchema={generateDisabledUISchemaSpy}
                  generateHEReturnUISchema={generateHEReturnUISchema}
                  history={[]}
                  getReturn={new getReturnStub("hif", data, schema, "Draft")}
                  getBaseReturn={new getBaseReturnStub()}
                  documentGateway={documentGatewayDummy}
                  getRole={{execute: jest.fn(()=> ({role: "Homes England"}))}}
                >
                {childrenSpy}
                </ReturnPage>
                );

          await wait();
          expect(childrenSpy).toHaveBeenCalledWith({
            data: data,
            schema: schema,
            type: "hif",
            uiSchema: {iamaheuser: "not allowed to edit"},
            status: "Draft"
          })
        });
      });
    });

    describe("Return ID is not present", () => {
      it("Passes data from the get base return use case", async () => {
        let documentGatewayDummy = jest.fn()
        let data = {projectName: "My project"};
        let schema = {
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
        };
        let generateUISchema = {execute: jest.fn((data, no_of_previous_returns) => ({myUiSchema: "UI"}))};
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchema);
        let wrap = mount(<ReturnPage
                match={{ params: { projectId: 1} }}
                generateUISchema={ generateUISchema }
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                getReturn={jest.fn()}
                getBaseReturn={new getBaseReturnStub("ac", data, schema)}
                documentGateway={documentGatewayDummy}
                getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
              >{childrenSpy}
              </ReturnPage>);

        await wait();
        expect(childrenSpy).toHaveBeenCalledWith({
          data: data,
          schema: schema,
          type: "ac",
          uiSchema: {myUiSchema: "UI"},
          status: "Draft"
        })
      });

      it("Example 2", async () => {
        let documentGatewayDummy = jest.fn()
        let data = {doghouse: {doghouse: 'dog'}};
        let schema = {
          type: 'object',
          properties: {
            doghouse: {
              type: 'object',
              title: 'doghouse',
              properties: {
                dogs: {
                  type: 'string',
                  readonly: true
                }
              }
            }
          }
        };
        let childrenSpy = jest.fn()
        let generateUISchemaSpy = {execute: jest.fn((data, no_of_previous_returns) => ({anotherUiSchema: "UI v.2"}))};
        let generateDisabledUISchema = new GenerateDisabledUISchema(generateUISchemaSpy);
        let wrap = mount(<ReturnPage
                match={{ params: { projectId: 6} }}
                generateUISchema={ generateUISchemaSpy }
                generateSubmittedSchema={generateDisabledUISchema}
                history={[]}
                getReturn={jest.fn()}
                getBaseReturn={new getBaseReturnStub("hif", data, schema)}
                documentGateway={documentGatewayDummy}
                getRole={{execute: jest.fn(()=> ({role: "Local Authority"}))}}
              >
              {childrenSpy}
              </ReturnPage>
              );

        await wait();
        expect(childrenSpy).toHaveBeenCalledWith({
          data: data,
          schema: schema,
          type: "hif",
          uiSchema: {anotherUiSchema: "UI v.2"},
          status: "Draft"
        })
      });
    });
  });
});
