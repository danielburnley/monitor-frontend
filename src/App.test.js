import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import App from './App';
import nock from 'nock';

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe('Viewing at a project', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Renders the project with information from the API', async () => {
    process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
    let projectSchema = {
      title: 'HIF Project',
      type: 'object',
      properties: {
        summary: {
          type: 'object',
          title: 'Project Summary',
          properties: {
            name: {type: 'string', title: 'Name'},
            description: {type: 'string', title: 'Description'},
            leadAuthority: {type: 'string', title: 'Lead Authority'},
          },
        },
        infrastructure: {
          type: 'object',
          title: 'Infrastructure',
          properties: {
            infraType: {type: 'string', title: 'Type'},
            description: {type: 'string', title: 'Description'},
            completionDate: {
              type: 'string',
              format: 'date',
              title: 'Completion Date',
            },
            planning: {
              type: 'object',
              title: 'Planning permission',
              properties: {
                submissionEstimated: {
                  type: 'string',
                  format: 'date',
                  title: 'Estimated date of submission',
                },
              },
            },
          },
        },
        financial: {
          type: 'object',
          title: 'Financial information',
          properties: {
            totalAmountEstimated: {
              type: 'string',
              title: 'Estimated total amount required',
            },
          },
        },
      },
    };

    let projectResponse = {
      type: 'hif',
      data: {
        summary: {
          name: 'Homes England Showcase Project',
          description:
            'A building specifically for showcasing our fantastic system',
          leadAuthority: 'Made Tech'
        },
        infrastructure: {
          infraType: 'Building',
          description: 'A big building with a stage',
          completionDate: '2019-01-01',
          planning: {
            submissionEstimated: '2018-01-01'
          }
        },
        financial: {
          totalAmountEstimated: '£ 1,000,000.00'
        }
      },
      schema: projectSchema
    };

    let expectedInputValues = [
      'Homes England Showcase Project',
      'A building specifically for showcasing our fantastic system',
      'Made Tech',
      'Building',
      'A big building with a stage',
      '2019-01-01',
      '2018-01-01',
      '£ 1,000,000.00',
    ];

    let projectRequest = nock('http://cat.meow')
      .matchHeader('Content-Type', 'application/json')
      .get('/project/find?id=0')
      .reply(200, projectResponse);

    let wrapper = mount(
      <MemoryRouter initialEntries={['/project/0']}>
        <App />
      </MemoryRouter>,
    );

    await waitForRequestToFinish();

    wrapper.update();

    let actualInputs = wrapper.find('input').map(node => {
      if (node.getDOMNode().type === 'checkbox') {
        return node.getDOMNode().checked;
      }
      return node.getDOMNode().value;
    });

    expect(actualInputs).toEqual(expectedInputValues)
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
          toes: 'Beans'
        },
      },
      schema: returnSchema
    };

    let expectedInputValues = [
      'Meow',
      'Fluffy balls of friendship',
      'Beans',
    ];

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

    let actualInputs = wrapper.find('input').map(node => {
      if (node.getDOMNode().type === 'checkbox') {
        return node.getDOMNode().checked;
      }
      return node.getDOMNode().value;
    });

    expect(actualInputs).toEqual(expectedInputValues)
  });
});
