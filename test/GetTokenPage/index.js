import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount, shallow } from "enzyme";
import GetToken from "../../src/Components/GetToken";

export default class GetTokenPage {
  constructor(projectId, requestToken) {
    this.wrap = mount(
      <GetToken projectId={projectId} requestToken={requestToken} targetUrl="http://localhost/"/>
    );
  }

  html() {
    return this.wrap.html();
  }

  email() {
    return this.wrap.find('[data-test="email_input"]');
  }

  sentMessage() {
    return this.wrap.find('[data-test="sent_message"]');
  }

  setEmail(value) {
    this.email().simulate('change', {target: {value}});
  }

  submit() {
    this.wrap.find('form').simulate('submit');
  }

  submitButton() {
    return this.wrap.find('[data-test="submit-button"]');
  }

  disabledSubmitButton() {
    return this.wrap.find('[data-test="disabled-submit-button"]');
  }

  find(selector) {
    return this.wrap.find(selector);
  }

  async waitForRequestToFinish() {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  async load() {
    await this.waitForRequestToFinish();
    this.wrap.update();
  }
}
