import GenerateLADraftUISchema from ".";

describe("Generating LA Draft UI Schema", () => {
  describe("With a single item", () => {
    describe("Example 1", () => {
      let schema = {
        a: {
          type: "string",
          laReadOnly: true
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

      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schema", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
          a: { "ui:disabled": true, generalprop: true }
        });
      });
    });

    describe("Example 2", () => {
      let schema = {
        b: {
          type: "integer",
          laReadOnly: true
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

      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schema", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
          b: { "ui:disabled": true, cats: false }
        });
      });
    });
  });
  describe("With an array", () => {
    describe("Example 1", () => {
      let schema = {
        b: {
          type: "array",
          items: {
            type: "object",
            properties: {
              c: { type: "string" }
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
                addable: false,
                orderable: false,
                removable: false
              }
            }
          };
        })
      };
      let generateReadOnlySchema = {
        execute: jest.fn((schema, flag) => {
          return {
            b: {
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              }
            }
          };
        })
      };
      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schema", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
          b: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { "ui:field": "horizontal" }
          }
        });
      });
    });

    describe("Example 2", () => {
      let schema = {
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
      };

      let generateUISchema = {
        execute: jest.fn(schema => {
          return {
            a: {
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
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
      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schema", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
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
      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schemas", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
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

    describe("Example 1", () => {
      let schema = {
        e: {
          type: "object",
          properties: {
            f: {
              type: "array",
              items: {
                horizontal: true,
                type: "object",
                properties: {
                  c: { type: "string" }
                }
              }
            },
            g: {
              type: "string",
              laReadOnly: true
            }
          }
        }
      };

      let generateUISchema = {
        execute: jest.fn(schema => {
          return {
            e: {
              f: {
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
            e: {
              f: {
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
      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );
      it("Will return the correct UI Schemas", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
          e: {
            f: {
              items: { "ui:field": "horizontal" },
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

      let generateLADraftUISchema = new GenerateLADraftUISchema(
        generateUISchema,
        generateReadOnlySchema
      );

      it("Returns a general UI schema", () => {
        expect(generateLADraftUISchema.execute(schema)).toEqual({
          a: { b: { c: { "ui:widget": true } } }
        });
      });
    });
  });
});
