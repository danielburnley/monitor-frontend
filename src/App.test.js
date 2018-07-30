import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {mount, shallow} from 'enzyme';
import App from './App';
import nock from 'nock';

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 20));
}

describe('Viewing at a project', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('Renders the project with information from the API', async () => {
    process.env.REACT_APP_HIF_API_URL = 'http://cat.meow/';
    let projectResponse = {
      type: 'hif',
      data: {
        summary: {
          projectName: 'Homes England Showcase Project',
          description:
            'A building specifically for showcasing our fantastic system',
          leadAuthority: 'Made Tech'
        },
        infrastructure: {
          type: 'Building',
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
});
