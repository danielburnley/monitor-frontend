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

describe('Portal', () => {
  it("shows the 'sent' message when submitted", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let wrapper = mount(<GetToken requestToken={requestTokenSpy}/>)

    let email_input = wrapper.find('[data-test="email_input"]')
    updateFormField(email_input, "cat@cathouse.com")
    let submit_button = wrapper.find('form')
    submit_button.simulate('submit')
    await wait()
    wrapper.update()

    expect(wrapper.find('[data-test="sent_message"]').length).toEqual(1)
  })

  it("does not show the 'sent' message before submitting", async () => {
    let requestTokenSpy = {
      execute: jest.fn()
    };

    let wrapper = mount(<GetToken requestToken={requestTokenSpy}/>)

    expect(wrapper.find('[data-test="sent_message"]').length).toEqual(0)
  })
});
