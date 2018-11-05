import GenerateUISchema from ".";

describe("GenerateUISchema", () => {
  let useCase = new GenerateUISchema();

  describe("Readonly", () => {
    describe("Example one", () => {
      it("Generates a ui schema from a single field", () => {
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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

      it("Generates a ui schema from a readonly and non readonly field", () => {
        let useCase = new GenerateUISchema();
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

      it("Generates a ui schema from a multiple fields", () => {
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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
        let useCase = new GenerateUISchema();
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

  describe("Addable arrays", () => {
    describe("Given an array that is addable", () => {
      it("Marks them as addable", () => {
        let useCase = new GenerateUISchema();
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              addable: true,
              items: {
                type: "object",
                properties: {
                  b: { type: "string" },
                  c: { type: "string" }
                }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: {
            "ui:options": {
              addable: true,
              orderable: false,
              removable: true
            },
            items: {}
          }
        });
      });
    });
  });

  describe("Variance", () => {
    describe("Given an object which is marked as a variance field", () => {
      describe("Example one", () => {
        it("Sets the UI field to variance", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                variance: true,
                properties: {}
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({ a: { "ui:field": "variance" } });
        });
      });

      describe("Example two", () => {
        it("Sets the UI field to variance", () => {
          let schema = {
            type: "object",
            properties: {
              b: {
                type: "object",
                variance: true,
                properties: {}
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({ b: { "ui:field": "variance" } });
        });
      });
    });
  });

  describe("Risk", () => {
    describe("Given an object which is marked as a risk field", () => {
      describe("Example one", () => {
        it("Sets the UI field to risk", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "array",
                items: {
                  risk: true,
                  type: "object",
                  properties: {}
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            a: {
              items: { "ui:field": "risk" },
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              }
            }
          });
        });
      });

      describe("Example two", () => {
        it("Sets the UI field to risk", () => {
          let schema = {
            type: "object",
            properties: {
              b: {
                type: "array",
                items: {
                  risk: true,
                  type: "object",
                  properties: {}
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            b: {
              items: { "ui:field": "risk" },
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              }
            }
          });
        });
      });
    });
  });

  describe("Periods", () => {
    describe("Given an object which is marked as periods field", () => {
      describe("Example one", () => {
        it("Sets the UI field to periods", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "array",
                periods: true,
                items: {
                  type: "object",
                  properties: {
                    period: { type: "string" },
                    money: { type: "string" }
                  }
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            a: {
              items: {},
              "ui:field": "periods",
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              }
            }
          });
        });
      });

      describe("Example two", () => {
        it("Sets the UI field to periods", () => {
          let schema = {
            type: "object",
            properties: {
              b: {
                type: "array",
                periods: true,
                items: {
                  type: "object",
                  properties: {}
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            b: {
              items: {},
              "ui:field": "periods",
              "ui:options": {
                addable: false,
                orderable: false,
                removable: false
              }
            }
          });
        });
      });
    });
  });

  describe("Horizontal", () => {
    describe("Given an array with horizontal items", () => {
      it("Sets the UI field to horizontal", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                horizontal: true,
                type: "object",
                properties: {}
              }
            }
          }
        };

        let response = useCase.execute(schema);

        expect(response).toEqual({
          a: {
            items: { "ui:field": "horizontal" },
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            }
          }
        });
      });
    });

    describe("Given an object", () => {
      describe("That is horizontal", () => {
        describe("With no properties", () => {
          it("Sets the UI field to horizontal", () => {
            let schema = {
              type: "object",
              properties: {
                a: {
                  type: "object",
                  horizontal: true,
                  properties: {}
                }
              }
            };

            let response = useCase.execute(schema);
            expect(response).toEqual({
              a: { "ui:field": "horizontal" }
            });
          });
        });

        describe("With child properties", () => {
          describe("That are not readonly", () => {
            it("Sets the UI field to horizontal", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    horizontal: true,
                    properties: { b: { type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "horizontal" }
              });
            });
          });

          describe("That are readonly", () => {
            it("Sets the UI field to horizontal and the child properties to readonly", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    horizontal: true,
                    properties: { b: { readonly: true, type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "horizontal", b: { "ui:disabled": true } }
              });
            });
          });
        });
      });
    });
  });

  describe("With Dependencies", () => {
    describe("With a single dependency", () => {
      describe("Inside an object", () => {
        describe("Example one", () => {
          it("Sets the UI schema for dependencies", () => {
            let schema = {
              type: "object",
              properties: {
                a: {
                  type: "object",
                  properties: {
                    cats: { readonly: true }
                  },
                  dependencies: {
                    x: {
                      oneOf: [
                        {
                          properties: {
                            meow: {
                              type: "object",
                              horizontal: true,
                              properties: {}
                            },
                            quack: { readonly: true }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            };

            let response = useCase.execute(schema);

            expect(response).toEqual({
              a: {
                cats: { "ui:disabled": true },
                meow: { "ui:field": "horizontal" },
                quack: { "ui:disabled": true }
              }
            });
          });
        });

        describe("Example two", () => {
          it("Sets the UI field to horizontal", () => {
            let schema = {
              type: "object",
              properties: {
                b: {
                  type: "object",
                  properties: {
                    dogs: { readonly: true }
                  },
                  dependencies: {
                    y: {
                      oneOf: [
                        {
                          properties: {
                            woof: {
                              type: "object",
                              horizontal: true,
                              properties: {}
                            },
                            moo: { readonly: true }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            };

            let response = useCase.execute(schema);

            expect(response).toEqual({
              b: {
                dogs: { "ui:disabled": true },
                woof: { "ui:field": "horizontal" },
                moo: { "ui:disabled": true }
              }
            });
          });
        });
      });
    });

    describe("With multiple dependencies", () => {
      describe("Inside an object", () => {
        describe("Example one", () => {
          it("Sets the UI schema for dependencies", () => {
            let schema = {
              type: "object",
              properties: {
                a: {
                  type: "object",
                  properties: {},
                  dependencies: {
                    z: {
                      oneOf: [
                        {
                          properties: {
                            meow: {
                              type: "object",
                              horizontal: true,
                              properties: {}
                            },
                            quack: {
                              type: "array",
                              addable: true,
                              items: {
                                type: "object",
                                properties: {}
                              }
                            }
                          }
                        },
                        {
                          properties: {
                            chirp: {
                              type: "array",
                              addable: true,
                              items: { type: "object", properties: {} }
                            },
                            squeak: { readonly: true }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            };

            let response = useCase.execute(schema);

            expect(response).toEqual({
              a: {
                meow: { "ui:field": "horizontal" },
                quack: {
                  items: {},
                  "ui:options": {
                    addable: true,
                    orderable: false,
                    removable: true
                  }
                },
                chirp: {
                  items: {},
                  "ui:options": {
                    addable: true,
                    orderable: false,
                    removable: true
                  }
                },
                squeak: { "ui:disabled": true }
              }
            });
          });
        });

        describe("Example two", () => {
          it("Sets the UI field to horizontal", () => {
            let schema = {
              type: "object",
              properties: {
                b: {
                  type: "object",
                  properties: {},
                  dependencies: {
                    q: {
                      oneOf: [
                        {
                          properties: {
                            woof: {
                              type: "object",
                              horizontal: true,
                              properties: {}
                            },
                            moo: { readonly: true }
                          }
                        },
                        {
                          properties: {
                            bark: { type: "string" },
                            cluck: { readonly: true }
                          }
                        }
                      ]
                    }
                  }
                }
              }
            };

            let response = useCase.execute(schema);

            expect(response).toEqual({
              b: {
                woof: { "ui:field": "horizontal" },
                moo: { "ui:disabled": true },
                cluck: { "ui:disabled": true }
              }
            });
          });
        });
      });
    });
  });

  describe("With extended text fields", () => {
    describe("In an object", () => {
      it("Marks the field as a textarea", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: { type: "string", extendedText: true }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { b: { "ui:widget": "textarea" } }
        });
      });
    });
  });

  describe("With hidden fields", () => {
    describe("In an object", () => {
      describe("Example one", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "hidden" } }
          });
        });
      });

      describe("Example two", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              c: {
                type: "object",
                properties: {
                  d: { type: "string", hidden: true }
                }
              },
              e: {
                type: "object",
                properties: {
                  f: { type: "string", hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            c: { d: { "ui:widget": "hidden" } },
            e: { f: { "ui:widget": "hidden" } }
          });
        });
      });

      describe("With dependencies", () => {
        it("Generates a ui schema from an object with dependencies", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  cats: { readonly: true }
                },
                dependencies: {
                  x: {
                    oneOf: [
                      {
                        properties: {
                          meow: {
                            type: "object",
                            properties: {
                              cat: { hidden: true, type: "string" }
                            }
                          },
                          quack: { readonly: true }
                        }
                      }
                    ]
                  }
                }
              }
            }
          };

          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: {
              cats: { "ui:disabled": true },
              meow: { cat: { "ui:widget": "hidden" } },
              quack: { "ui:disabled": true }
            }
          });
        });
      });

      describe("When readonly and hidden", () => {
        it("Marks the field as hidden and readonly", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", readonly: true, hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "hidden", "ui:disabled": true } }
          });
        });
      });
    });
  });

  describe("With Currency Symbols", () => {
    describe("In an object", () => {
      describe("Example one", () => {
        it("Marks the field as a currency field", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", currency: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "currency" } }
          });
        });
      });

      describe("Example two", () => {
        it("Marks the field as hidden", () => {
          let schema = {
            type: "object",
            properties: {
              c: {
                type: "object",
                properties: {
                  d: { type: "string", hidden: true }
                }
              },
              e: {
                type: "object",
                properties: {
                  f: { type: "string", hidden: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            c: { d: { "ui:widget": "hidden" } },
            e: { f: { "ui:widget": "hidden" } }
          });
        });
      });

      describe("With dependencies", () => {
        it("Generates a ui schema from an object with dependencies", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  cats: { readonly: true }
                },
                dependencies: {
                  x: {
                    oneOf: [
                      {
                        properties: {
                          meow: {
                            type: "object",
                            properties: {
                              cat: { currency: true, type: "string" }
                            }
                          },
                          quack: { readonly: true }
                        }
                      }
                    ]
                  }
                }
              }
            }
          };

          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: {
              cats: { "ui:disabled": true },
              meow: { cat: { "ui:widget": "currency" } },
              quack: { "ui:disabled": true }
            }
          });
        });
      });

      describe("When readonly and hidden", () => {
        it("Marks the field as hidden and readonly", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", readonly: true, currency: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "currency", "ui:disabled": true } }
          });
        });
      });
    });
  });

  describe("Radio Options", () => {
    it("Marks a field as a radio", () => {
      let schema = {
        type: "object",
        properties: {
          a: { type: "string", enum: ["a", "b", "c"], radio: true }
        }
      };
      let response = useCase.execute(schema);
      expect(response).toEqual({
        a: { "ui:widget": "radio" }
      });
    });

    describe("With dependencies", () => {
      it("Generates a ui schema from an object with dependencies", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                cats: { readonly: true }
              },
              dependencies: {
                x: {
                  oneOf: [
                    {
                      properties: {
                        meow: {
                          type: "object",
                          properties: {
                            cat: { radio: true, type: "string" }
                          }
                        },
                        quack: { readonly: true }
                      }
                    }
                  ]
                }
              }
            }
          }
        };

        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: {
            cats: { "ui:disabled": true },
            meow: { cat: { "ui:widget": "radio" } },
            quack: { "ui:disabled": true }
          }
        });
      });
    });
  });
});
