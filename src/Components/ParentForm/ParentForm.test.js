import React from 'react';
import ParentForm from '.';
import {mount} from 'enzyme';

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate('change', {target: {value}});
  await wait();
}

describe('<ParentForm>', () => {
  it('compiles a form from the children', async () => {
    let wrap = mount(
      <ParentForm schema={{
        type: 'object',
        properties: {
          cat: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          },
          dog: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          }
        }
      }}/>
    );
    let input = wrap.find('#cat_subform').find("input");
    await updateFormField(input, "Tabby");
    expect(wrap.state('formData')).toEqual({cat: {name: "Tabby"}}, 1);
  });

  it('displays radio buttons to change the current view', async () => {
    let wrap = mount(
      <ParentForm schema={{
        type: 'object',
        properties: {
          cat: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          },
          dog: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              }
            }
          }
        }
      }}/>
    );

    //Find the radio button that selects the cat form
    let cat_label = wrap.find('#cat');
    cat_label.simulate('change', { target: { checked: true } });
    expect(wrap.find('#cat_subform').length).toEqual(1);
    expect(wrap.find('#dog_subform').length).toEqual(0);
  })
});
