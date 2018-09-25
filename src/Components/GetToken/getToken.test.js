import React from 'react';
import GetToken from '.';
import {mount} from 'enzyme';

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate('change', {target: {value}});
  await wait();
}

describe('GetToken', () => {
  it("doesn't show a disabled button when an email is entered", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "bonsoir@corp")
    let submit_button = wrapper.find('form')
    await wait()
    wrapper.update()

    expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(0)
    expect(wrapper.find('[data-test="submit-button"]').length).toEqual(1)
  });

  it("shows a disabled button when no email is entered", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "")
    let submit_button = wrapper.find('form')
    await wait()
    wrapper.update()

    expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(1)
    expect(wrapper.find('[data-test="submit-button"]').length).toEqual(0)
  });

  it("doesn't request a token when no email is entered a token", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "")
    let submit_button = wrapper.find('form')
    submit_button.simulate('submit')
    await wait()
    wrapper.update()

    expect(requestTokenSpy.execute).not.toHaveBeenCalled()
    expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(1)
  });

  it("requests a token", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "cat@cathouse.com")
    let submit_button = wrapper.find('form')
    submit_button.simulate('submit')
    await wait()
    wrapper.update()

    expect(requestTokenSpy.execute).toHaveBeenCalledWith("cat@cathouse.com", "1", "http://localhost/")
  });

  it("shows the 'sent' message when submitted", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "cat@cathouse.com")
    let submit_button = wrapper.find('form')
    submit_button.simulate('submit')
    await wait()
    wrapper.update()

    expect(wrapper.find('[data-test="sent_message"]').length).toEqual(1)
    expect(wrapper.find('[data-test="disabled-submit-button"]').length).toEqual(0)
    expect(wrapper.find('[data-test="submit-button"]').length).toEqual(0)
  });

  it("does not show the 'sent' message before submitting", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    expect(wrapper.find('[data-test="sent_message"]').length).toEqual(0)
  });
});
