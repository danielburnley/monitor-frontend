import React from 'react';
import Subform from '.';
import {mount} from 'enzyme';

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function updateFormField(input, value) {
  input.simulate('change', {target: {value}});
  await wait();
}

describe('<Subform>', () => {
  it('renders a schema', () => {
    let wrap = mount(
      <Subform schema={{
        type: 'object',
        properties: {
          cat_name: {
            type: 'string'
          }
        }
      }}/>
    );
    expect(wrap.find('fieldset').length).toEqual(1);
  });

  it('triggers onChange when text is input', async () => {
    let onChangeSpy = jest.fn();

    let wrap = mount(
      <Subform
        onChange = {onChangeSpy}
        schema = {{
        type: 'object',
        properties: {
          cat_name: {
            type: 'string'
          }
        }
      }}/>
    );

    let input = wrap.find('input');

    await updateFormField(input, "Tabby");
    expect(onChangeSpy).toHaveBeenCalledWith({cat_name: "Tabby"});
  });
});
