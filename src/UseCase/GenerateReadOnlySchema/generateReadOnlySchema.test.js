import GenerateReadOnlySchema from ".";

describe("GenerateReadOnlySchema", () => {
  describe("readonly flags", () => {
    describe("Example one", () => {
      it("Generates a ui schema from a single field", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly: true }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({ a: { "ui:disabled": true } });
      });

      it("Generates an empty ui schema from a single non-readonly field", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string" }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({});
      });

      it("Generates a ui schema from a readonly and non readonly field", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string" },
            b: { type: "string", readonly: true }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({ b: { "ui:disabled": true } });
      });

      it("Generates a ui schema from a mixture of fields", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                c: { type: "string" },
                d: { type: "string", readonly: true }
              }
            },
            b: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  e: { type: "string", readonly: true },
                  f: { type: "string" }
                }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { d: { "ui:disabled": true } },
          b: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { e: { "ui:disabled": true } }
          }
        });
      });

      it("Generates a ui schema from a multiple fields", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly: true },
            b: { type: "string", readonly: true }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { "ui:disabled": true },
          b: { "ui:disabled": true }
        });
      });

      it("Generates a ui schema from a nested object", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: { type: "string", readonly: true }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { b: { "ui:disabled": true } }
        });
      });

      it("Generates a ui schema from a nested nested object", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: {
                  type: "object",
                  properties: { c: { type: "string", readonly: true } }
                }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { b: { c: { "ui:disabled": true } } }
        });
      });

      it("Generates a ui schema from an array of items", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  b: { type: "string", readonly: true },
                  c: { type: "string", readonly: true }
                }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { b: { "ui:disabled": true }, c: { "ui:disabled": true } }
          }
        });
      });
    });

    describe("Example two", () => {
      it("Generates a ui schema from a single field", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            b: { type: "string", readonly: true }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({ b: { "ui:disabled": true } });
      });

      it("Generates a ui schema from a multiple fields", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            d: { type: "string", readonly: true },
            f: { type: "string", readonly: true }
          }
        };

        let response = useCase.execute(schema);
        expect(response).toEqual({
          d: { "ui:disabled": true },
          f: { "ui:disabled": true }
        });
      });

      it("Generates a ui schema from a nested object", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            d: {
              type: "object",
              properties: {
                e: { type: "string", readonly: true }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          d: { e: { "ui:disabled": true } }
        });
      });
    });
  });
  describe("other flags", () => {
    describe("Example one", () => {

      it("generates an empty ui schema for no readonly fields", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string" }
          }
        };
        let response = useCase.execute(schema, 'blahblah');
        expect(response).toEqual({});
      });
      it("generates a ui schema for different flags", () => {
        let useCase = new GenerateReadOnlySchema();

        let schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  b: { type: "string", blahblah: true },
                  c: { type: "string", blahblah: true }
                }
              }
            },
            i: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  j: { type: "string", blahblah: true },
                  k: { type: "string" }
                }
              }
            },
            d: {
              type: "object",
              properties: {
                e: {
                  type: "object",
                  properties: {
                    f: {
                      type: "string",
                      blahblah: true
                    }
                  }
                }
              }
            },
            g: { type: "string" },
            h: { type: "string", blahblah: true }
          }
        };
        let response = useCase.execute(schema, 'blahblah');
        expect(response).toEqual({
          a: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { b: { "ui:disabled": true }, c: { "ui:disabled": true } }
          },
          i: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { j: { "ui:disabled": true } }
          },
          d: { e: { f: { "ui:disabled": true } } },
          h: { "ui:disabled": true }
        });
      });
    });

    describe("Example two", () => {

      it("generates an empty ui schema for no readonly fields", () => {
        let useCase = new GenerateReadOnlySchema();
        let schema = {
          type: "object",
          properties: {
            a: { type: "string" }
          }
        };
        let response = useCase.execute(schema, 'ladraft');
        expect(response).toEqual({});
      });
      it("generates a ui schema for different flags", () => {
        let useCase = new GenerateReadOnlySchema();

        let schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  b: { type: "string", ladraft: true },
                  c: { type: "string", ladraft: true }
                }
              }
            },
            i: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  j: { type: "string", ladraft: true },
                  k: { type: "string" }
                }
              }
            },
            d: {
              type: "object",
              properties: {
                e: {
                  type: "object",
                  properties: {
                    f: {
                      type: "string",
                      ladraft: true
                    }
                  }
                }
              }
            },
            g: { type: "string" },
            h: { type: "string", ladraft: true }
          }
        };
        let response = useCase.execute(schema, 'ladraft');
        expect(response).toEqual({
          a: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { b: { "ui:disabled": true }, c: { "ui:disabled": true } }
          },
          i: {
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            },
            items: { j: { "ui:disabled": true } }
          },
          d: { e: { f: { "ui:disabled": true } } },
          h: { "ui:disabled": true }
        });
      });
    });
  });
});
