import GenerateNewProjectUISchema from ".";

describe("GenerateNewProjectSchema", () => {
  describe("Generating LA Draft UI Schema", () => {
    describe("With a single item", () => {
      describe("Example 1", () => {
        let schema = {
          properties: {
            a: {
              type: "string",
              laReadOnly: true
            }
          }
        };
        let generateUISchema = {
          execute: jest.fn(schema => {
            return { a: { generalprop: true } };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return { a: { "ui:disabled": true } };
          })
        };

        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schema", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            a: { "ui:disabled": true, generalprop: true }
          });
        });
      });

      describe("Example 2", () => {
        let schema = {
          properties: {
            b: {
              type: "integer",
              laReadOnly: true
            }
          }
        };
        let generateUISchema = {
          execute: jest.fn(schema => {
            return { b: { cats: false } };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return { b: { "ui:disabled": true } };
          })
        };

        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schema", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            b: { "ui:disabled": true, cats: false }
          });
        });
      });
    });
    describe("With no UI properties", () => {
      it("returns an empty hash", () => {
        let schema = { properties: { c: { type: "string" } } };
        let generateUISchema = {
          execute: jest.fn(schema => {
            return {};
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn(schema => {
            return {};
          })
        };
        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        expect(generateNewProjectUISchema.execute(schema, "LA Draft")).toEqual(
          {}
        );
      });
    });
    describe("With an array", () => {
      describe("Example 1", () => {
        let schema = {
          propperties: {
            b: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  c: { type: "string" }
                }
              }
            }
          }
        };

        let generateUISchema = {
          execute: jest.fn(schema => {
            return {
              b: {
                items: { "ui:field": "horizontal" },
                "ui:options": {
                  addable: true,
                  orderable: false,
                  removable: true
                }
              }
            };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return {};
          })
        };
        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schema", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            b: {
              "ui:options": {
                addable: true,
                orderable: false,
                removable: true
              },
              items: { "ui:field": "horizontal" }
            }
          });
        });
      });

      describe("Example 2", () => {
        let schema = {
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                horizontal: true,
                properties: {
                  b: {
                    type: "object",
                    properties: {
                      d: { type: "string", laReadOnly: true }
                    }
                  },
                  c: { type: "string", base: true }
                }
              }
            }
          }
        };

        let generateUISchema = {
          execute: jest.fn(schema => {
            return {
              a: {
                "ui:options": {
                  addable: true,
                  orderable: false,
                  removable: true
                },
                items: {
                  "ui:field": "horizontal",
                  c: { "ui:field": "base" }
                }
              }
            };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return {
              a: {
                "ui:options": {
                  addable: false,
                  orderable: false,
                  removable: false
                },
                items: {
                  b: {
                    d: { "ui:disabled": "true" }
                  }
                }
              }
            };
          })
        };
        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schema", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            a: {
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              },
              items: {
                "ui:field": "horizontal",
                b: {
                  d: { "ui:disabled": "true" }
                },
                c: { "ui:field": "base" }
              }
            }
          });
        });
      });
    });
    describe("With a nested object", () => {
      describe("Example 1", () => {
        let schema = {
          properties: {
            a: {
              type: "object",
              properties: {
                b: {
                  type: "array",
                  items: {
                    horizontal: true,
                    type: "object",
                    properties: {
                      c: { type: "string", laReadOnly: true }
                    }
                  }
                }
              }
            }
          }
        };

        let generateUISchema = {
          execute: jest.fn(schema => {
            return {
              a: {
                b: {
                  items: { "ui:field": "horizontal" },
                  "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false
                  }
                }
              }
            };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return {
              a: {
                b: {
                  items: { c: { "ui:disabled": true } },
                  "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false
                  }
                }
              }
            };
          })
        };
        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schemas", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            a: {
              b: {
                "ui:options": {
                  addable: false,
                  orderable: false,
                  removable: false
                },
                items: { "ui:field": "horizontal", c: { "ui:disabled": true } }
              }
            }
          });
        });
      });
    });
    describe("An array with different UI properties in the items", () => {
      describe("Example 1", () => {
        let schema = {
          properties: {
            e: {
              type: "object",
              properties: {
                f: {
                  type: "array",
                  items: {
                    horizontal: true,
                    type: "object",
                    properties: {
                      c: { type: "string" },
                      h: { type: "string" },
                      j: { type: "string" }
                    }
                  }
                },
                g: {
                  type: "string",
                  laReadOnly: true
                }
              }
            }
          }
        };

        let generateUISchema = {
          execute: jest.fn(schema => {
            return {
              e: {
                f: {
                  items: { "ui:field": "horizontal", h: { "ui:widget": true } },
                  hey: "yes",
                  "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false
                  }
                }
              }
            };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return {
              e: {
                f: {
                  items: {
                    h: { "ui:disabled": true },
                    j: { "ui:disabled": true }
                  },
                  "ui:options": {
                    addable: false,
                    orderable: false,
                    removable: false
                  }
                },
                g: { "ui:disabled": true }
              }
            };
          })
        };
        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );
        it("Will return the correct UI Schemas", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            e: {
              f: {
                items: {
                  "ui:field": "horizontal",
                  j: { "ui:disabled": true },
                  h: { "ui:widget": true, "ui:disabled": true }
                },
                hey: "yes",
                "ui:options": {
                  addable: false,
                  orderable: false,
                  removable: false
                }
              },
              g: { "ui:disabled": true }
            }
          });
        });
      });
    });
    describe("With a nested array and one schema empty", () => {
      describe("Example 1", () => {
        let schema = {
          a: {
            b: {
              c: {
                hidden: true
              }
            }
          }
        };
        let generateUISchema = {
          execute: jest.fn(schema => {
            return { a: { b: { c: { "ui:widget": true } } } };
          })
        };
        let generateReadOnlySchema = {
          execute: jest.fn((schema, flag) => {
            return {};
          })
        };

        let generateNewProjectUISchema = new GenerateNewProjectUISchema(
          generateUISchema,
          generateReadOnlySchema
        );

        it("Returns a general UI schema", () => {
          expect(
            generateNewProjectUISchema.execute(schema, "LA Draft")
          ).toEqual({
            a: { b: { c: { "ui:widget": true } } }
          });
        });
      });
    });
  });

  describe("Generating non LA UI Schema", () => {
    it("Gives back the response from generateUISchema", () => {
      let schema = {};
      let generateUISchema = {
        execute: jest.fn(schema => {
          return {
            a: { generalprop: true, somthingelse: "wooo" },
            morepropetie: "cats"
          };
        })
      };
      let generateReadOnlySchema;
      let generateNewProjectUISchema = new GenerateNewProjectUISchema(
        generateUISchema,
        generateReadOnlySchema
      );

      expect(generateNewProjectUISchema.execute(schema, "Anything")).toEqual({
        a: { generalprop: true, somthingelse: "wooo" },
        morepropetie: "cats"
      });
    });
  });
});
