import React from "react";
import BaselineData from ".";
import { shallow, mount } from "enzyme";

class BaselinePage {
  constructor(schema, formData) {
    this.page = mount(<BaselineData schema={schema} formData={formData} />);
  }

  title() {
    return this.page.find("[data-test='title']").text();
  }

  summary(section) {
    return this.page.find(`[data-test='summary-${section}']`).text();
  }

  find(path) {
    return this.page.find(path);
  }
}

describe("Baseline Data", () => {
  describe("In a simple object", () => {
    describe("Example 1", () => {
      let page;
      beforeEach(() => {
        let schema = {
          title: "HIF Data",
          type: "object",
          properties: {
            firstItem: {
              title: "One of many of your items",
              type: "string"
            }
          }
        };
        let formData = {
          firstItem: "This is number one ",
          secondItem: "This is number two"
        };
        page = new BaselinePage(schema, formData);
      });

      it("Displays the Project Name", () => {
        expect(page.title()).toEqual("HIF Data");
      });

      it("Displays a single string", () => {
        expect(page.find("[data-test='firstItem']").text()).toEqual(
          "This is number one "
        );
        expect(page.find("[data-test='secondItem']").length).toEqual(0);
      });

      it("Display the title for a single string", () => {
        expect(page.find("[data-test='title-firstItem']").text()).toEqual(
          "One of many of your items"
        );
      });

      it("Should not display data that does not exist in the schema", () => {
        expect(page.find("[data-test='secondItem']").length).toEqual(0);
      });

      it("Displays two strings", () => {
        let schema = {
          title: "Title",
          type: "object",
          properties: {
            firstItem: {
              title: "an item",
              type: "string"
            },
            secondItem: {
              title: "another item",
              type: "string"
            }
          }
        };
        let formData = {
          firstItem: "First String",
          secondItem: "Second String"
        };
        let page2 = new BaselinePage(schema, formData);

        expect(page2.find("[data-test='firstItem']").text()).toEqual(
          "First String"
        );
        expect(page2.find("[data-test='secondItem']").text()).toEqual(
          "Second String"
        );
      });
    });

    describe("Example 2", () => {
      let page;
      beforeEach(() => {
        let schema = {
          title: "My House Building Project",
          type: "object",
          properties: {
            secondItem: {
              type: "string",
              title: "a string"
            }
          }
        };
        let formData = { secondItem: "This is number three " };
        page = new BaselinePage(schema, formData);
      });
      it("Displays the Project Name", () => {
        expect(page.title()).toEqual("My House Building Project");
      });

      it("Displays a single string", () => {
        expect(page.find("[data-test='secondItem']").text()).toEqual(
          "This is number three "
        );
        expect(page.find("[data-test='firstItem']").length).toEqual(0);
      });

      it("Display the title for a single string", () => {
        expect(page.find("[data-test='title-secondItem']").text()).toEqual(
          "a string"
        );
      });

      it("Displays two strings", () => {
        let schema = {
          title: "My House Building Project",
          type: "object",
          properties: {
            anotherItem: {
              type: "string",
              title: "another title"
            },
            catItem: {
              type: "string",
              title: "cat title"
            }
          }
        };
        let formData = { anotherItem: "Another One", catItem: "Cats!" };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='anotherItem']").text()).toEqual(
          "Another One"
        );
        expect(page.find("[data-test='catItem']").text()).toEqual("Cats!");
      });
    });
  });
  describe("In a nested object", () => {
    describe("Example 1", () => {
      it("Displays the Summary", () => {
        let schema = {
          title: "Title of the Page",
          type: "object",
          properties: {
            summary: {
              title: "summary",
              type: "object",
              properties: {
                bidReference: {
                  type: "string",
                  title: "Bid Reference"
                },
                projectTitle: {
                  type: "string",
                  title: "Project Reference"
                }
              }
            }
          }
        };
        let summary = {
          bidReference: "1234",
          projectTitle: "Project Cats"
        };
        let formData = { summary };
        let page = new BaselinePage(schema, formData);
        expect(page.find("[data-test='title-summary']").text()).toEqual(
          "summary"
        );
        expect(page.find("[data-test='bidReference']").text()).toEqual("1234");
        expect(page.find("[data-test='projectTitle']").text()).toEqual(
          "Project Cats"
        );
      });
    });

    describe("Example 2", () => {
      it("Displays the summary", () => {
        let schema = {
          title: "Main Title",
          type: "object",
          properties: {
            overview: {
              title: "viewing",
              type: "object",
              properties: {
                hifFundingAmount: {
                  type: "string",
                  title: "Bid Reference"
                },
                descriptionOfInfrastructure: {
                  type: "string",
                  title: "Project Reference"
                },
                descriptionOfWiderProjectDeliverables: {
                  type: "string",
                  title: "descriptive"
                }
              }
            }
          }
        };
        let formData = {
          overview: {
            hifFundingAmount: "9876543",
            descriptionOfInfrastructure: "Giant cat box",
            descriptionOfWiderProjectDeliverables: "Lots of scratching posts"
          }
        };
        let page = new BaselinePage(schema, formData);
        expect(page.find("[data-test='title-overview']").text()).toEqual(
          "viewing"
        );
        expect(page.find("[data-test='hifFundingAmount']").text()).toEqual(
          "9876543"
        );
        expect(
          page.find("[data-test='descriptionOfInfrastructure']").text()
        ).toEqual("Giant cat box");
        expect(
          page
            .find("[data-test='descriptionOfWiderProjectDeliverables']")
            .text()
        ).toEqual("Lots of scratching posts");
      });
    });
  });
  describe("Mutiple nested objects", () => {
    it("Displays a summary", () => {
      let schema = {
        title: "Title of the Page",
        type: "object",
        properties: {
          summary: {
            title: "summary",
            type: "object",
            properties: {
              bidReference: {
                type: "string",
                title: "Bid Reference"
              },
              projectTitle: {
                type: "string",
                title: "Project Reference"
              }
            }
          },
          foo: {
            title: "foo",
            type: "object",
            properties: {
              bar: {
                type: "string",
                title: "bar title"
              },
              baz: {
                type: "string",
                title: "baz title"
              }
            }
          }
        }
      };
      let summary = {
        bidReference: "1234",
        projectTitle: "Project Cats"
      };
      let foo = {
        bar: "Hello",
        baz: "Goodbye"
      };
      let formData = { summary, foo };
      let page = new BaselinePage(schema, formData);

      expect(page.find("[data-test='bidReference']").text()).toEqual("1234");
      expect(page.find("[data-test='projectTitle']").text()).toEqual(
        "Project Cats"
      );
      expect(page.find("[data-test='bar']").text()).toEqual("Hello");
      expect(page.find("[data-test='baz']").text()).toEqual("Goodbye");
    });
  });
  describe("Arrays", () => {
    describe("Example 1", () => {
      it("Can show data from within an array", () => {
        let schema = {
          title: "Title",
          type: "array",
          items: {
            type: "object",
            properties: {
              a: {
                type: "string",
                title: "A item"
              },
              b: {
                type: "string",
                title: "B item"
              }
            }
          }
        };
        let data = [{ a: "Cat", b: "Dog" }, { a: "Rabbit", b: "Frog" }];
        let page = new BaselinePage(schema, data);

        expect(
          page
            .find("[data-test='a']")
            .at(0)
            .text()
        ).toEqual("Cat");
        expect(
          page
            .find("[data-test='a']")
            .at(1)
            .text()
        ).toEqual("Rabbit");
        expect(
          page
            .find("[data-test='b']")
            .at(0)
            .text()
        ).toEqual("Dog");
        expect(
          page
            .find("[data-test='b']")
            .at(1)
            .text()
        ).toEqual("Frog");
      });
    });

    describe("Example 2", () => {
      it("Can show data from within an array", () => {
        let schema = {
          title: "Cats 4 Life",
          type: "array",
          items: {
            type: "object",
            properties: {
              meow: {
                type: "string",
                title: "Yes to meows"
              },
              whiskers: {
                type: "string",
                title: "Always whiskers"
              }
            }
          }
        };
        let formData = [
          { meow: "mew", whiskers: "soft" },
          { meow: "purr", whiskers: "bristly" }
        ];
        let page = new BaselinePage(schema, formData);

        expect(
          page
            .find("[data-test='meow']")
            .at(0)
            .text()
        ).toEqual("mew");
        expect(
          page
            .find("[data-test='meow']")
            .at(1)
            .text()
        ).toEqual("purr");
        expect(
          page
            .find("[data-test='whiskers']")
            .at(0)
            .text()
        ).toEqual("soft");
        expect(
          page
            .find("[data-test='whiskers']")
            .at(1)
            .text()
        ).toEqual("bristly");
      });
    });
  });

  describe("Object with arrays", () => {
    describe("Example 1", () => {
      it("Renders the object correctly", () => {
        let schema = {
          title: "Title of the Page",
          type: "object",
          properties: {
            summary: {
              title: "summary",
              type: "object",
              properties: {
                bidReference: {
                  type: "string",
                  title: "Bid Reference"
                },
                projectTitle: {
                  type: "string",
                  title: "Project Reference"
                }
              }
            },
            cats: {
              type: "array",
              items: {
                title: "Cat",
                type: "object",
                properties: {
                  noise: { type: "string", title: "noise" }
                }
              }
            }
          }
        };
        let formData = {
          summary: {
            bidReference: "1234",
            projectTitle: "4567"
          },
          cats: [{ noise: "Meow" }]
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='bidReference']").text()).toEqual("1234");
        expect(page.find("[data-test='projectTitle']").text()).toEqual("4567");
        expect(page.find("[data-test='title-cats']").text()).toEqual("Cat 1");
        expect(page.find("[data-test='noise']").text()).toEqual("Meow");
      });
    });

    describe("Example 2", () => {
      it("Renders the object correctly", () => {
        let schema = {
          title: "Title of the Page",
          type: "object",
          properties: {
            cat: {
              title: "summary",
              type: "object",
              properties: {
                meow: {
                  type: "string",
                  title: "Meow"
                }
              }
            },
            dogs: {
              type: "array",
              items: {
                title: "Dog",
                type: "object",
                properties: {
                  bark: { type: "string", title: "Bark" }
                }
              }
            }
          }
        };
        let formData = {
          cat: {
            meow: "1234"
          },
          dogs: [{ bark: "Woof" }, { bark: "Mega woof" }]
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='meow']").text()).toEqual("1234");
        expect(
          page
            .find("[data-test='bark']")
            .at(0)
            .text()
        ).toEqual("Woof");
        expect(
          page
            .find("[data-test='bark']")
            .at(1)
            .text()
        ).toEqual("Mega woof");
        expect(
          page
            .find("[data-test='title-dogs']")
            .at(0)
            .text()
        ).toEqual("Dog 1");
        expect(
          page
            .find("[data-test='title-dogs']")
            .at(1)
            .text()
        ).toEqual("Dog 2");
      });
    });
  });

  describe("With dependancies", () => {
    describe("Example 1", () => {
      it("Displays the data appropriately", () => {
        let schema = {
          title: "person",
          type: "object",
          properties: {
            meow: { type: "string", title: "Meow" }
          },
          dependencies: {
            meow: {
              oneOf: [
                {
                  properties: {
                    meow: {
                      enum: ["Yes"]
                    },
                    woof: {
                      type: "string",
                      title: "Woof"
                    }
                  }
                }
              ]
            }
          }
        };
        let formData = {
          meow: "Yes",
          woof: "No"
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='woof']").text()).toEqual("No");
        expect(page.find("[data-test='title-woof']").text()).toEqual("Woof");
      });

      it("Displays the data appropriately with two oneOfs", () => {
        let schema = {
          title: "person",
          type: "object",
          properties: {
            meow: { type: "string", title: "Meow" }
          },
          dependencies: {
            meow: {
              oneOf: [
                {
                  properties: {
                    meow: {
                      enum: ["Yes"]
                    },
                    woof: {
                      type: "string",
                      title: "Woof"
                    }
                  }
                },
                {
                  properties: {
                    meow: {
                      enum: ["No"]
                    },
                    ribbit: {
                      type: "string",
                      title: "Ribbit"
                    }
                  }
                }
              ]
            }
          }
        };
        let formData = {
          meow: "No",
          ribbit: "Croak"
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='ribbit']").text()).toEqual("Croak");
        expect(page.find("[data-test='title-ribbit']").text()).toEqual(
          "Ribbit"
        );
        expect(page.find("[data-test='woof']").length).toEqual(0);
      });

      it("Displays the data appropriately with two dependencies", () => {
        let schema = {
          title: "person",
          type: "object",
          properties: {
            meow: { type: "string", title: "Meow" },
            croak: { type: "string", title: "Ribbit" }
          },
          dependencies: {
            meow: {
              oneOf: [
                {
                  properties: {
                    meow: {
                      enum: ["Yes"]
                    },
                    woof: {
                      type: "string",
                      title: "Woof"
                    }
                  }
                }
              ]
            },
            croak: {
              oneOf: [
                {
                  properties: {
                    croak: {
                      enum: ["No"]
                    },
                    caw: {
                      type: "string",
                      title: "Bird Noise"
                    }
                  }
                }
              ]
            }
          }
        };
        let formData = {
          meow: "Yes",
          woof: "No",
          croak: "No",
          caw: "Buckaw"
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='caw']").text()).toEqual("Buckaw");
        expect(page.find("[data-test='title-caw']").text()).toEqual(
          "Bird Noise"
        );
      });
    });

    describe("Example 2", () => {
      it("Displays the data appropriately", () => {
        let schema = {
          title: "person",
          type: "object",
          properties: {
            bark: { type: "string", title: "woofie" }
          },
          dependencies: {
            bark: {
              oneOf: [
                {
                  properties: {
                    bark: {
                      enum: ["Yes"]
                    },
                    shout: {
                      type: "string",
                      title: "Yelling"
                    }
                  }
                }
              ]
            }
          }
        };
        let formData = {
          bark: "Yes",
          shout: "shhhh"
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='shout']").text()).toEqual("shhhh");
        expect(page.find("[data-test='title-shout']").text()).toEqual(
          "Yelling"
        );
      });

      it("Displays the data appropriately with two oneOfs", () => {
        let schema = {
          title: "person",
          type: "object",
          properties: {
            cat: { type: "string", title: "run" }
          },
          dependencies: {
            cat: {
              oneOf: [
                {
                  properties: {
                    cat: {
                      enum: ["Yes"]
                    },
                    kitten: {
                      type: "string",
                      title: "little"
                    }
                  }
                },
                {
                  properties: {
                    cat: {
                      enum: ["No"]
                    },
                    dog: {
                      type: "string",
                      title: "big"
                    }
                  }
                }
              ]
            }
          }
        };
        let formData = {
          cat: "No",
          dog: "runs"
        };
        let page = new BaselinePage(schema, formData);

        expect(page.find("[data-test='dog']").text()).toEqual("runs");
        expect(page.find("[data-test='title-dog']").text()).toEqual("big");
        expect(page.find("[data-test='kitten']").length).toEqual(0);
      });
    });
  });
});
