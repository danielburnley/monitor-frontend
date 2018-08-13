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
  //Take one big schema and create a child for each top level property
  //Parent, type object
  it('creates children based on schema', () => {
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

    expect(wrap.find('Subform').length).toEqual(2);
  });

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
    let input = wrap.find('#cat').find("input");
    await updateFormField(input, "Tabby");
    expect(wrap.state('formData')).toEqual({cat: {name: "Tabby"}}, 1);
  });
});
