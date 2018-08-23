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
            items: { cats: { title: "Cats", link: "#root_cats__title" } }
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
            items: { dogs: { title: "Dogs", link: "#root_dogs__title" } }
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
            cows: { title: "Cows", link: "#root_cows__title" },
            ducks: { title: "Ducks", link: "#root_ducks__title" }
          }
        });
      });
    });
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
                0: { title: "Cat 1", link: "#root_0__title", children: {} }
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
                0: { title: "Dog 1", link: "#root_0__title", children: {} }
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
                0: { title: "Cat 1", link: "#root_0__title", children: {} },
                1: { title: "Cat 2", link: "#root_1__title", children: {} }
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
                0: { title: "Dog 1", link: "#root_0__title", children: {} },
                1: { title: "Dog 2", link: "#root_1__title", children: {} }
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
                  link: "#root_0__title",
                  children: {
                    noise: { title: "Noise", link: "#root_0_noise__title" }
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
                  link: "#root_0__title",
                  children: {
                    bark: { title: "Bark volume", link: "#root_0_bark__title" }
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
              link: "#root_0__title",
              children: {
                noise: { title: "Noise", link: "#root_0_noise__title" },
                favouriteToy: {
                  title: "Favourite toy",
                  link: "#root_0_favouriteToy__title"
                }
              }
            },
            1: {
              title: "Cat 2",
              link: "#root_1__title",
              children: {
                noise: { title: "Noise", link: "#root_1_noise__title" },
                favouriteToy: {
                  title: "Favourite toy",
                  link: "#root_1_favouriteToy__title"
                }
              }
            }
          }
        });
      });
    });
  });
});
