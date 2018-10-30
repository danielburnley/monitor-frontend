import GenerateSidebarItems from ".";

describe("GenerateSidebarItems", () => {
  let useCase = new GenerateSidebarItems();

  describe("Given an schema of type object", () => {
    describe("With no properties", () => {
      it("Returns an empty set of items", () => {
        let schema = { type: "object", properties: {} };
        let response = useCase.execute(schema);
        expect(response).toEqual({ items: {} });
      });
    });

    describe("With a single property", () => {
      describe("Example one", () => {
        it("Generates a single sidebar item", () => {
          let schema = {
            type: "object",
            properties: { cats: { type: "object", title: "Cats" } }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            items: { cats: { title: "Cats", subSection: 'cats' } }
          });
        });
      });

      describe("Example two", () => {
        it("Generates a single sidebar item", () => {
          let schema = {
            type: "object",
            properties: { dogs: { type: "object", title: "Dogs" } }
          };
          let response = useCase.execute(schema);
          expect(response).toEqual({
            items: { dogs: { title: "Dogs", subSection: 'dogs' } }
          });
        });
      });
    });

    describe("With two properties", () => {
      it("Generates two sidebar items", () => {
        let schema = {
          type: "object",
          properties: {
            cows: { type: "object", title: "Cows" },
            ducks: { type: "object", title: "Ducks" }
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          items: {
            cows: { title: "Cows", subSection: 'cows' },
            ducks: { title: "Ducks", subSection: 'ducks' }
          }
        });
      });
    });

    describe("Given non object properties", () => {
      it("Only generates items for arrays and objects", () => {
        let schema = {
          type: "object",
          properties: {
            cows: { type: "object", title: "Cows" },
            ducks: { type: "string", title: "Ducks" },
            birds: { type: "array", title: "Birds"}
          }
        };
        let response = useCase.execute(schema);
        expect(response).toEqual({
          items: {
            cows: { title: "Cows", subSection: 'cows' },
            birds: { title: "Birds", subSection: 'birds' }
          }
        });
      })
    })
  });

  describe("Given a schema of type array", () => {
    describe("With a no properties", () => {
      describe("With a single piece of data", () => {
        describe("Example one", () => {
          it("Generates a single sidebar item with no child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Cat",
                type: "object",
                properties: {}
              }
            };
            let data = [{}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: { title: "Cat 1", children: {} }
              }
            });
          });
        });

        describe("Example two", () => {
          it("Generates a single sidebar item with no child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Dog",
                type: "object",
                properties: {}
              }
            };
            let data = [{}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: { title: "Dog 1", children: {} }
              }
            });
          });
        });
      });

      describe("With two items of data", () => {
        describe("Example one", () => {
          it("Generates a two sidebar items with no child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Cat",
                type: "object",
                properties: {}
              }
            };
            let data = [{}, {}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: { title: "Cat 1", children: {} },
                1: { title: "Cat 2", children: {} }
              }
            });
          });
        });

        describe("Example two", () => {
          it("Generates a two sidebar item with no child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Dog",
                type: "object",
                properties: {}
              }
            };
            let data = [{}, {}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: { title: "Dog 1", children: {} },
                1: { title: "Dog 2", children: {} }
              }
            });
          });
        });
      });
    });

    describe("With a single property", () => {
      describe("With a single piece of data", () => {
        describe("Example one", () => {
          it("Generates a single sidebar item with child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Cat",
                type: "object",
                properties: {
                  noise: {
                    title: "Noise"
                  }
                }
              }
            };
            let data = [{}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: {
                  title: "Cat 1",
                  children: {
                    noise: { title: "Noise", index : 0, subSection: 'noise' }
                  }
                }
              }
            });
          });
        });

        describe("Example two", () => {
          it("Generates a single sidebar item with child", () => {
            let schema = {
              type: "array",
              items: {
                title: "Dog",
                type: "object",
                properties: {
                  bark: {
                    title: "Bark volume"
                  }
                }
              }
            };
            let data = [{}];
            let response = useCase.execute(schema, data);
            expect(response).toEqual({
              items: {
                0: {
                  title: "Dog 1",
                  children: {
                    bark: { title: "Bark volume", index:0, subSection: 'bark'}
                  }
                }
              }
            });
          });
        });
      });
    });

    describe("With multiple properties and multiple items of data", () => {
      it("Generates a sidebar item for each item of data", () => {
        let schema = {
          type: "array",
          items: {
            title: "Cat",
            type: "object",
            properties: {
              noise: {
                title: "Noise"
              },
              favouriteToy: {
                title: "Favourite toy"
              }
            }
          }
        };
        let data = [{}, {}];
        let response = useCase.execute(schema, data);
        expect(response).toEqual({
          items: {
            0: {
              title: "Cat 1",
              children: {
                noise: { title: "Noise", index: 0, subSection: 'noise' },
                favouriteToy: {
                  title: "Favourite toy", index:0, subSection:'favouriteToy'
                }
              }
            },
            1: {
              title: "Cat 2",
              children: {
                noise: { title: "Noise", index: 1, subSection: 'noise' },
                favouriteToy: {
                  title: "Favourite toy", index:1, subSection:'favouriteToy',
                }
              }
            }
          }
        });
      });
    });
  });
});
