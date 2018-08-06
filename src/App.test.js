import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import App from './App';
import nock from 'nock';

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

function getInputsFromPage(page) {
  return page.find('input').map(node => {
    if (node.getDOMNode().type === 'checkbox') {
      return node.getDOMNode().checked;
    } else {
      return node.getDOMNode().value;
    }
  });
}

describe('Viewing at a project', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Renders the project with information from the API', async () => {
    process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
    let projectSchema = {
      title: 'Cat Return',
      type: 'object',
      properties: {
        cats: {
          type: 'object',
          title: 'Cats',
          properties: {
            noise: {type: 'string', title: 'Noise'},
            description: {type: 'string', title: 'Description'},
            toes: {type: 'string', title: 'Toes'},
          },
        },
      },
    };

    let projectResponse = {
      type: 'hif',
      data: {
        cats: {
          noise: 'Meow',
          description: 'Fluffy balls of friendship',
          toes: 'Beans',
        },
      },
      schema: projectSchema,
    };

    let expectedInputValues = ['Meow', 'Fluffy balls of friendship', 'Beans'];

    let returnSchema = {
      title: 'Cat Return',
      type: 'object',
      properties: {
        cats: {
          type: 'object',
          title: 'Cats',
          properties: {
            noise: {type: 'string', title: 'Noise'},
            description: {type: 'string', title: 'Description'},
            toes: {type: 'string', title: 'Toes'},
            playtime: {type: 'string', title: 'Total playtime'},
          },
        },
      },
    };

    let returnResponse = {
      data: {
        cats: {
          noise: 'Meow',
          description: 'Fluffy balls of friendship',
          toes: 'Beans',
        },
      },
      schema: returnSchema,
    };

    let projectRequest = nock('http://cat.meow')
      .matchHeader('Content-Type', 'application/json')
      .get('/project/find?id=0')
      .reply(200, projectResponse);

    let baseReturnRequest = nock('http://cat.meow')
      .matchHeader('Content-Type', 'application/json')
      .get('/project/0/return')
      .reply(200, {baseReturn: returnResponse});

    let wrapper = mount(
      <MemoryRouter initialEntries={['/project/0']}>
        <App />
      </MemoryRouter>,
    );

    await waitForRequestToFinish();

    wrapper.update();

    let actualInputs = getInputsFromPage(wrapper);

    expect(actualInputs).toEqual(expectedInputValues);

    let button = wrapper.find('[data-test="new-return-button"]');
    button.simulate('click');

    await waitForRequestToFinish();
    wrapper.update();

    expectedInputValues.push('');
    actualInputs = getInputsFromPage(wrapper);

    expect(actualInputs).toEqual(expectedInputValues);
  });

  it('Renders the return with information from the API', async () => {
    process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
    let returnSchema = {
      title: 'Cat Return',
      type: 'object',
      properties: {
        cats: {
          type: 'object',
          title: 'Cats',
          properties: {
            noise: {type: 'string', title: 'Noise'},
            description: {type: 'string', title: 'Description'},
            toes: {type: 'string', title: 'Toes'},
          },
        },
      },
    };

    let returnResponse = {
      type: 'hif',
      data: {
        cats: {
          noise: 'Meow',
          description: 'Fluffy balls of friendship',
          toes: 'Beans',
        },
      },
      schema: returnSchema,
    };

    let expectedInputValues = ['Meow', 'Fluffy balls of friendship', 'Beans'];

    let projectRequest = nock('http://cat.meow')
      .matchHeader('Content-Type', 'application/json')
      .get('/return/get?id=0')
      .reply(200, returnResponse);

    let wrapper = mount(
      <MemoryRouter initialEntries={['/project/0/return/0']}>
        <App />
      </MemoryRouter>,
    );

    await waitForRequestToFinish();

    wrapper.update();

    let actualInputs = getInputsFromPage(wrapper);

    expect(actualInputs).toEqual(expectedInputValues);
  });
});
