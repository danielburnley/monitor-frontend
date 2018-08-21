import React from "react";
import APISimulator from "../test/ApiSimulator";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import App from "./App";
import nock from "nock";

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function createNewReturn(wrapper) {
  let button = wrapper.find('[data-test="new-return-button"]');
  button.simulate("click");

  await waitForRequestToFinish();
  wrapper.update();
}

function getInputsFromPage(page) {
  return page.find("input").map(node => {
    if (node.getDOMNode().type === "checkbox") {
      return node.getDOMNode().checked;
    } else {
      return node.getDOMNode().value;
    }
  });
}

describe("Viewing at a project", () => {
  let api;

  beforeEach(() => {
    process.env.REACT_APP_HIF_API_URL = "http://cat.meow/";
    api = new APISimulator("http://cat.meow");
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it("Given invalid token GetToken is shown", async () => {
    api.expendToken("Hello").unauthorised();

    let wrapper = mount(
      <MemoryRouter initialEntries={["/project/0?token=Hello "]}>
        <App />
      </MemoryRouter>
    );

    await waitForRequestToFinish();
    wrapper.update();

    expect(wrapper.find("GetToken").length).toEqual(1);
    expect(wrapper.find("ProjectPage").length).toEqual(0);
  });

  describe("Given valid token", () => {
    beforeEach(() => {
      api.expendToken("Cats").successfully();
    });

    it("will not show GetToken", async () => {
      let projectSchema = {
        title: "Cat Return",
        type: "object",
        properties: {
          summary: {
            type: "object",
            title: "Cats",
            properties: {
              noise: { type: "string", title: "Noise" },
              description: { type: "string", title: "Description" },
              toes: { type: "string", title: "Toes" }
            }
          }
        }
      };

      let projectData = {
        summary: {
          noise: "Meow",
          description: "Fluffy balls of friendship",
          toes: "Beans"
        }
      };

      api.getProject(projectSchema, projectData).successfully();

      let wrapper = mount(
        <MemoryRouter initialEntries={["/project/0?token=Cats"]}>
          <App />
        </MemoryRouter>
      );

      await waitForRequestToFinish();
      wrapper.update();

      expect(wrapper.find("GetToken").length).toEqual(0);
      expect(wrapper.find("Project").length).toEqual(1);
    });

    it("Renders the project summary with information from the API", async () => {
      let projectSchema = {
        title: "Cat Return",
        type: "object",
        properties: {
          summary: {
            type: "object",
            title: "Cats",
            properties: {
              noise: { type: "string", title: "Noise" },
              description: { type: "string", title: "Description" },
              toes: { type: "string", title: "Toes" }
            }
          }
        }
      };

      let projectData = {
        summary: {
          noise: "Meow",
          description: "Fluffy balls of friendship",
          toes: "Beans"
        }
      };

      api.getProject(projectSchema, projectData).successfully();

      let wrapper = mount(
        <MemoryRouter initialEntries={["/project/0?token=Cats"]}>
          <App />
        </MemoryRouter>
      );

      await waitForRequestToFinish();
      wrapper.update();

      let summary = wrapper.find('div[data-test="summary"]');

      expect(summary.find('div[data-test="summary_noise"]').text()).toEqual(
        "Meow"
      );
      expect(
        summary.find('div[data-test="summary_description"]').text()
      ).toEqual("Fluffy balls of friendship");
      expect(summary.find('div[data-test="summary_toes"]').text()).toEqual(
        "Beans"
      );
    });

    it("Renders the return with information from the API when creating a new return", async () => {
      let projectSchema = {
        title: "Cat Return",
        type: "object",
        properties: {
          summary: {
            type: "object",
            title: "Cats",
            properties: {
              noise: { type: "string", title: "Noise" },
              description: { type: "string", title: "Description" },
              toes: { type: "string", title: "Toes" }
            }
          }
        }
      };

      let projectData = {
        summary: {
          noise: "Meow",
          description: "Fluffy balls of friendship",
          toes: "Beans"
        }
      };

      let returnSchema = {
        title: "Cat Return",
        type: "object",
        properties: {
          summary: {
            type: "object",
            title: "Cats",
            properties: {
              noise: { type: "string", title: "Noise" },
              description: { type: "string", title: "Description" },
              toes: { type: "string", title: "Toes" },
              playtime: { type: "string", title: "Total playtime" }
            }
          }
        }
      };

      let returnData = {
        summary: {
          noise: "Meow",
          description: "Fluffy balls of friendship",
          toes: "Beans"
        }
      };

      api.getProject(projectSchema, projectData).successfully();
      api.getBaseReturn(returnSchema, returnData).successfully();

      let wrapper = mount(
        <MemoryRouter initialEntries={["/project/0?token=Cats"]}>
          <App />
        </MemoryRouter>
      );

      await waitForRequestToFinish();
      wrapper.update();

      await createNewReturn(wrapper);

      let expectedInputValues = [
        "Meow",
        "Fluffy balls of friendship",
        "Beans",
        ""
      ];
      let actualInputs = getInputsFromPage(wrapper);

      expect(actualInputs).toEqual(expectedInputValues);
    });

    it("Renders the return with information from the API", async () => {
      let returnSchema = {
        title: "Cat Return",
        type: "object",
        properties: {
          summary: {
            type: "object",
            title: "Cats",
            properties: {
              noise: { type: "string", title: "Noise" },
              description: { type: "string", title: "Description" },
              toes: { type: "string", title: "Toes" }
            }
          }
        }
      };

      let returnData = {
        summary: {
          noise: "Meow",
          description: "Fluffy balls of friendship",
          toes: "Beans"
        }
      };

      api.getReturn(returnSchema, returnData).successfully();

      let expectedInputValues = ["Meow", "Fluffy balls of friendship", "Beans"];

      let wrapper = mount(
        <MemoryRouter initialEntries={["/project/0/return/0?token=Cats"]}>
          <App />
        </MemoryRouter>
      );

      await waitForRequestToFinish();

      wrapper.update();

      let actualInputs = getInputsFromPage(wrapper);

      expect(actualInputs).toEqual(expectedInputValues);
    });
  });
});
