import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import App from "../../src/App";

export default class AppPage {
  constructor(path) {
    this.page = mount(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  }

  html() {
    return this.page.html();
  }

  summary() {
    return this.find('div[data-test="summary"]');
  }

  getFormInputs() {
    let displayedReturn = this.page.find('div[data-test="return"]')
    return displayedReturn.find("input[type='text']").map(node => {
      return node.getDOMNode().value;
    });
  }

  find(selector) {
    return this.page.find(selector);
  }

  async waitForRequestToFinish() {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async load() {
    await this.waitForRequestToFinish();
    this.page.update();
  }

  async createNewReturn() {
    let button = this.page.find('[data-test="new-return-button"]');
    button.simulate("click");

    await this.load();
  }

  async createNewClaim() {
    let button = this.page.find('[data-test="new-claim-button"]');
    button.simulate("click");

    await this.load();
  }

  async viewBaseline() {
    let button = this.page.find('[data-test="view-baseline-button"]');
    button.simulate("click");

    await this.load();
  }

  getInputs() {
    return this.page.find("input").map(node => {
      if (node.getDOMNode().type === "checkbox") {
        return node.getDOMNode().checked;
      } else {
        return node.getDOMNode().value;
      }
    });
  }
}
