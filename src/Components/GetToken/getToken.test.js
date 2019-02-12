import React from 'react';
import GetToken from '.';
import {mount} from 'enzyme';
import GetTokenPage from '../../../test/GetTokenPage';

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
    let page = new GetTokenPage("1", requestTokenSpy);
    page.setEmail("bonsoir@corp")
    page.load()
    expect(page.submitButton().length).toEqual(1)
    expect(page.disabledSubmitButton().length).toEqual(0)
  });

  it("shows a disabled button when no email is entered", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let page = new GetTokenPage(1, requestTokenSpy);
    page.setEmail("")
    page.submit()
    page.load()

    expect(page.submitButton().length).toEqual(0)
    expect(page.disabledSubmitButton().length).toEqual(1)
  });

  it("doesn't request a token when no email is entered", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let page = new GetTokenPage("1", requestTokenSpy);
    page.setEmail("")
    page.submit()
    page.load()

    expect(requestTokenSpy.execute).not.toHaveBeenCalled()
  });

  it("requests a token", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };
    let wrapper = mount(<GetToken projectId="1" requestToken={requestTokenSpy} targetUrl="http://localhost/"/>)

    let page = new GetTokenPage("1", requestTokenSpy);
    page.setEmail("cat@cathouse.com")
    page.submit()
    page.load()

    expect(requestTokenSpy.execute).toHaveBeenCalledWith("cat@cathouse.com", "http://localhost/")
  });

  it("shows the 'sent' message when submitted", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let page = new GetTokenPage("1", requestTokenSpy);
    page.setEmail("cat@cathouse.com")
    page.submit()
    page.load()

    expect(page.sentMessage().length).toEqual(1)
    expect(page.disabledSubmitButton().length).toEqual(0)
    expect(page.submitButton().length).toEqual(0)
  });

  it("does not show the 'sent' message before submitting", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let page = new GetTokenPage("1", requestTokenSpy);
    page.load()

    expect(page.sentMessage().length).toEqual(0)
  });
});
