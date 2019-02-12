import GenerateUISchema from ".";

describe("GenerateUISchema", () => {
  let userRoleCookieGateway = {
    getUserRole: jest.fn(() => ({userRole: "Homes England"}))
  };

  let useCase = new GenerateUISchema(userRoleCookieGateway);

  describe("Generates schemas depending on user role", () => {
    it("Call the cookie user roles gateway when executed", () => {
      let useCase = new GenerateUISchema(userRoleCookieGateway);
      expect(userRoleCookieGateway.getUserRole).not.toHaveBeenCalled();

      useCase.execute({
        type: "object",
        properties: {
          a: { type: "string", laReadOnly: true }
        }
      })
      expect(userRoleCookieGateway.getUserRole).toHaveBeenCalled();
    });


    describe("Local Authority User Role", () => {
      let userRoleCookieGateway = {
        getUserRole: jest.fn(() => ({userRole: "Local Authority"}))
      };
      let useCase = new GenerateUISchema(userRoleCookieGateway);
      let schema = {
        type: "object",
        properties: {
          a: { type: "string", laReadOnly: true }
        }
      };
      it("Generates a schema with disabled fields", () => {
        let response = useCase.execute(schema);
        expect(response).toEqual({ a: { "ui:disabled": true } });
      });
    });

    describe("Homes England user role", () => {
      let useCase = new GenerateUISchema(userRoleCookieGateway);
      let schema = {
        type: "object",
        properties: {
          a: { type: "string", laReadOnly: true },
          b: { type: "string", s151WriteOnly: true }
        }
      };
      it("Generates the correct schema", () => {
        let response = useCase.execute(schema);
        expect(response).toEqual({b: {"ui:disabled": true}});
      });

      it("Generates a complex schema", () => {
        schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  b: { type: "string", laReadOnly: true }
                }
              }
            }
          }
        }
        let response = useCase.execute(schema);
        expect(response).toEqual({
          "a": {
            "items": {},
            "ui:options": {
              "addable": false,
              "orderable": false,
              "removable": false
            }
          }
        });
      });
    });

    describe("Super User role", () => {
      let userRoleCookieGateway = {
        getUserRole: jest.fn(() => ({userRole: "Superuser"}))
      };
      let useCase = new GenerateUISchema(userRoleCookieGateway);
      let schema = {
        type: "object",
        properties: {
          a: { type: "string", laReadOnly: true },
          b: { type: "string", s151WriteOnly: true }
        }
      };
      it("Generates the correct schema", () => {
        let response = useCase.execute(schema);
        expect(response).toEqual({});
      });

      it("Generates a complex schema", () => {
        schema = {
          type: "object",
          properties: {
            a: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  b: { type: "string", laReadOnly: true }
                }
              }
            }
          }
        }
        let response = useCase.execute(schema);
        expect(response).toEqual({
          "a": {
            "items": {},
            "ui:options": {
              "addable": false,
              "orderable": false,
              "removable": false
            }
          }
        });
      });
    });

    describe("S151 user role", () => {
      let userRoleCookieGateway = {
        getUserRole: jest.fn(() => ({userRole: "S151"}))
      };
      let useCase = new GenerateUISchema(userRoleCookieGateway);
      let schema = {
        type: "object",
        properties: {
          a: { type: "string", s151WriteOnly: true },
          b: { type: "string", laReadOnly: true }
        }
      };
      it("Generate a schema with some disabled fields", () => {
        let response = useCase.execute(schema);
        expect(response).toEqual({b: {"ui:disabled": true}});
      });
    });
  });

  describe("Readonly", () => {
    describe("Example one", () => {
        it("Generates a ui schema from a single field", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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

  describe("Readonly after certain number of returns", () => {
    describe("Example one", () => {
      it("Generates no disabled ui schema for a valid number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 4 }
          }
        };
        let noOfPreviousReturns = 2
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({});
      });

      it("Generates a ui schema for an invalid number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 2 }
          }
        };
        let noOfPreviousReturns = 4
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({a: {"ui:disabled": true}});
      });

      it("Generates a ui schema for the same number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 1 }
          }
        };
        let noOfPreviousReturns = 1
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({a: {"ui:disabled": true}});
      });

      it("Generates the correct ui schema with different types of readonly fields", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                c: { type: "string" },
                d: { type: "string", readonly_after_return: 4 }
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
        let noOfPreviousReturns = 2
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({
          a: {},
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

      it("Generates the correct ui schema with different types of readonly fields", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                c: { type: "string" },
                d: { type: "string", readonly_after_return: 2 }
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
        let noOfPreviousReturns = 4
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({
          a: {d: {"ui:disabled": true}},
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
    });

    describe("Example two", () => {
      it("Generates a disabled ui schema for a valid number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 4 }
          }
        };
        let noOfPreviousReturns = 2
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({});
      });

      it("Generates a ui schema for an invalid number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 6 }
          }
        };
        let noOfPreviousReturns = 10
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({a: {"ui:disabled": true}});
      });

      it("Generates a ui schema for the same number of returns", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: { type: "string", readonly_after_return: 5 }
          }
        };
        let noOfPreviousReturns = 5
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({a: {"ui:disabled": true}});
      });

      it("Generates the correct ui schema with different types of readonly fields", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                c: { type: "string" },
                d: { type: "string", readonly_after_return: 5 }
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
        let noOfPreviousReturns = 1
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({
          a: {},
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

      it("Generates the correct ui schema with different types of readonly fields", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                c: { type: "string" },
                d: { type: "string", readonly_after_return: 5 }
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
        let noOfPreviousReturns = 7
        let response = useCase.execute(schema, noOfPreviousReturns);
        expect(response).toEqual({
          a: {d: {"ui:disabled": true}},
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
    });
  });

  describe("Addable arrays", () => {
    describe("Given an array that is addable", () => {
      it("Marks them as addable", () => {
        let useCase = new GenerateUISchema(userRoleCookieGateway);
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

    it("When used as the item in the array", () => {
      let schema = {
        type: "object",
        properties: {
          main: {
            type: "object",
            properties: {
            },
            dependencies: {
              anyStatutoryConsents: {
                oneOf: [
                  {
                    properties: {
                      statutoryConsents: {
                        title: "Status of Statutory Consents",
                        type: "array",
                        items: {
                          type: "object",
                          variance: true,
                          properties: {
                            detailsOfConsent: {
                              type: "string"
                            }
                          }
                        }
                      }
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
        main: {
          statutoryConsents: {
            items: {
              "ui:field": "variance"
            },
            "ui:options": {
              addable: false,
              orderable: false,
              removable: false
            }
          }
        }
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

  describe("Numbered", () => {
    it("Sets the UI field to numbered", () => {
      let schema = {
        type: "object",
        properties: {
          a: {
            type: "array",
            numbered: true,
            items: {
              type: "object",
              properties: {}
            }
          }
        }
      };

      let response = useCase.execute(schema);

      expect(response).toEqual({
        a: {
          items: {},
          "ui:field": "numbered",
          "ui:options": {
            addable: false,
            orderable: false,
            removable: false
          }
        }
      });
    });
  });

  describe("calculated", () => {
    describe("Given an array", () => {
      describe("with calculated items", () => {
        it("Sets the UI field to calculated", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "array",
                items: {
                  calculation: "var y;",
                  type: "object",
                  properties: {}
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            a: {
              items: { "ui:field": "calculated" },
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

    describe("Given an object", () => {
      describe("That is calculated", () => {
        describe("With no properties", () => {
          it("Sets the UI field to calculated", () => {
            let schema = {
              type: "object",
              properties: {
                a: {
                  type: "object",
                  calculation: "var a;",
                  properties: {}
                }
              }
            };

            let response = useCase.execute(schema);
            expect(response).toEqual({
              a: { "ui:field": "calculated" }
            });
          });
        });

        describe("With child properties", () => {
          describe("That are not readonly", () => {
            it("Sets the UI field to calculated", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    calculation: "let x;",
                    properties: { b: { type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "calculated" }
              });
            });
          });

          describe("That are readonly", () => {
            it("Sets the UI field to calculated and the child properties to readonly", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    calculation: "() => null",
                    properties: { b: { readonly: true, type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "calculated", b: { "ui:disabled": true } }
              });
            });
          });
        });
      });
    });
  });

  describe("validated", () => {
    describe("Given an array", () => {
      describe("with validated items", () => {
        it("Sets the UI field to validated", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "array",
                items: {
                  type: "object",
                  validated: true,
                  properties: {}
                }
              }
            }
          };

          let response = useCase.execute(schema);

          expect(response).toEqual({
            a: {
              items: { "ui:field": "validated" },
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

    describe("Given an object", () => {
      describe("That is validated", () => {
        describe("With no properties", () => {
          it("Sets the UI field to calculated", () => {
            let schema = {
              type: "object",
              properties: {
                a: {
                  type: "object",
                  validated: true,
                  properties: {}
                }
              }
            };

            let response = useCase.execute(schema);
            expect(response).toEqual({
              a: { "ui:field": "validated" }
            });
          });
        });

        describe("With child properties", () => {
          describe("That are not readonly", () => {
            it("Sets the UI field to validated", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    validated: true,
                    properties: { b: { type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "validated" }
              });
            });
          });

          describe("That are readonly", () => {
            it("Sets the UI field to calculated and the child properties to readonly", () => {
              let schema = {
                type: "object",
                properties: {
                  a: {
                    type: "object",
                    validated: true,
                    properties: { b: { readonly: true, type: "string" } }
                  }
                }
              };

              let response = useCase.execute(schema);
              expect(response).toEqual({
                a: { "ui:field": "validated", b: { "ui:disabled": true } }
              });
            });
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
    describe("At multiple levels", () => {
      it("Sets the UI schema for dependencies", () => {
        let schema = {
          type: "object",
          properties: {
            widerScheme: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  topRisks: {
                    type: "object",
                    properties: {
                      landAssembly: {
                        type: "object",
                        properties: {
                          riskHolder: {
                            type: "object",
                            properties: {
                              liveRisk: {
                                type: "string",
                                radio: true
                              }
                            },
                            dependencies: {
                              liveRisk: {
                                oneOf: [
                                  {
                                    properties: {
                                      liveRisk: {
                                        type: "string",
                                        radio: true
                                      },
                                      description: {
                                        type: "string",
                                        extendedText: true,
                                      }
                                    }
                                  },
                                  {
                                    properties: {
                                      liveRisk: {
                                        type: "string",
                                        radio: true
                                      }
                                    }
                                  }
                                ]
                              }
                            }
                          }
                        },
                        dependencies: {
                          riskHolder: {
                            oneOf: [
                              {
                                properties: {
                                  riskHolder: {
                                    type: "object",
                                    properties: {
                                      liveRisk: {
                                        type: "string",
                                        radio: true
                                      },
                                      description: {
                                        type: "string",
                                        extendedText: true,
                                      }
                                    }
                                  }
                                }
                              },
                              {
                                properties: {
                                  riskHolder: {
                                    type: "object",
                                    properties: {
                                      liveRisk: {
                                        type: "string",
                                        radio: true
                                      }
                                    }
                                  }
                                }
                              }
                            ]
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        };

        let response = useCase.execute(schema);

        expect(response).toEqual({
          "widerScheme": {
            "items": {
              "topRisks": {
                "landAssembly": {
                  "riskHolder": {
                    "liveRisk": {
                      "ui:widget": "radio"
                    },
                    "description": {
                      "ui:widget": "textarea"
                    }
                  }
                }
              }
            },
            "ui:options": {
              "addable": false,
              "orderable": false,
              "removable": false
            }
          }
        });
      });
    });

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

      describe("when percentage", () => {
        it("in an item", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "object",
                properties: {
                  b: { type: "string", percentage: true }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: { b: { "ui:widget": "percentage" } }
          });
        });

        it("in an array", () => {
          let schema = {
            type: "object",
            properties: {
              a: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    b: { type: "string", percentage: true }
                  }
                }
              }
            }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            a: {
              "ui:options": {addable: false, orderable: false, removable: false},
              items: {b: { "ui:widget": "percentage" } }}
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

  describe("File Uploads", () => {
    describe("Example one", () => {
      it("Marks the field as a file upload", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: { type: "string", uploadFile: true }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { b: { "ui:field": "uploadFile" } }
        });
      });
    });
  });

  describe("Date entry", () => {
    describe("Example one", () => {
      it("Marks the field as a date entry", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: { type: "string", format: "date" }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: { b: { "ui:widget": "britishDate" } }
        });
      });

      it("Doesn't mark the field as a date entry", () => {
        let schema = {
          type: "object",
          properties: {
            a: {
              type: "object",
              properties: {
                b: { type: "string", format: "integer" }
              }
            }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          a: {}
        });
      });
    });
  });
});
