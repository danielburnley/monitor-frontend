import React from 'react';
import ReturnForm from '.';
import {mount} from 'enzyme';

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate('change', {target: {value: 'New Meow'}});
  await wait();
}

function saveReturn(form) {
  form.find('[data-test="save-return-button"]').simulate('click');
}

function createReturn(form) {
  form.find('[data-test="create-return-button"]').simulate('click');
}

function submitReturn(form) {
  form.find('[data-test="submit-return-button"]').simulate('click');
}

describe('<ReturnForm>', () => {
  let formSchema = {
    title: 'Cat Return',
    type: 'object',
    properties: {
      cats: {
        type: 'string',
        title: 'Cats',
      },
    },
  };

  it('Calls the onsubmit function with the form data when submitted', () => {
    let submitSpy = jest.fn();
    let wrapper = mount(
      <ReturnForm
        data={{cats: 'meow'}}
        schema={formSchema}
        onSubmit={submitSpy}
        status="Draft"
      />,
    );

    submitReturn(wrapper);
    expect(submitSpy).toHaveBeenCalledWith({cats: 'meow'});
  });

  it('Calls the onCreate function when saving the draft', () => {
    let createSpy = jest.fn();
    let wrapper = mount(
      <ReturnForm
        data={{cats: 'mew'}}
        schema={formSchema}
        onCreate={createSpy}
        status="New"
      />,
    );

    createReturn(wrapper);
    expect(createSpy).toHaveBeenCalledWith({cats: 'mew'});
  });

  it('Calls the onSave function when saving the draft', () => {
    let saveSpy = jest.fn();
    let wrapper = mount(
      <ReturnForm
        data={{cats: 'mew'}}
        schema={formSchema}
        onSave={saveSpy}
        status="Draft"
      />,
    );

    saveReturn(wrapper);
    expect(saveSpy).toHaveBeenCalledWith({cats: 'mew'});
  });

  it('Calls the onSave function with the updated formData when edited', async () => {
    let saveSpy = jest.fn();
    let wrapper = mount(
      <ReturnForm data={{cats: 'mew'}} schema={formSchema} onSave={saveSpy} />,
    );
    let input = wrapper.find('input').first();
    await updateFormField(input, 'New Meow');
    saveReturn(wrapper);
    expect(saveSpy).toHaveBeenCalledWith({cats: 'New Meow'});
  });

  it('Displays no buttons if the return is submitted', () => {
    let wrapper = mount(
      <ReturnForm
        data={{cats: 'mew'}}
        schema={formSchema}
        status="Submitted"
      />,
    );

    let actions = wrapper.find('button');

    expect(actions.length).toEqual(0);
  });

  it('Displays the create button if the return is new', () => {
    let wrapper = mount(
      <ReturnForm data={{cats: 'mew'}} schema={formSchema} status="New" />,
    );

    let actions = wrapper.find('[data-test="create-return-button"]');

    expect(actions.length).toEqual(1);
  });
});
