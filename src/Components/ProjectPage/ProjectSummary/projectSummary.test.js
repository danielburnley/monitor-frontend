import React from 'react';
import ProjectSummary from '.';
import {mount} from 'enzyme';

describe('<ProjectSummary>', () => {
  let wrapper;
  describe('Example one', () => {
    beforeEach(() => {
      let schema = {
        type: 'object',
        properties: {
          summary: {
            title: 'Project Summary',
            type: 'object',
            properties: {
              projectName: {type: 'string', title: 'Project Name'},
              projectDescription: {type: 'string', title: 'Project Description'},
              otherData: {type: 'string', title: 'Dont display me'}
            },
          },
        },
      };

      let data = {
        summary: {
          projectName: 'A HIF Project',
          projectDescription: 'Doing some building',
          otherData: 'Dont care about this right now'
        },
      };

      wrapper = mount(<ProjectSummary schema={schema} data={data} />);
    });

    it('Renders a sub heading with the name and header', () => {
      expect(wrapper.find('h3[data-test="project_name"]').text()).toEqual(
        'A HIF Project',
      );
    });

    it('Renders the project description', () => {
      expect(wrapper.find('div[data-test="project_description"]').text()).toEqual(
        'Doing some building',
      );
    });

    it('Doesnt render other summary data in the schema', () => {
      expect(wrapper.find('div[data-test="summary_otherData"]').length).toEqual(0);
    });

    it('Displays some helper text', () => {
      expect(wrapper.find('div[data-test="helper_text"]').length).toEqual(1)
    })
  });

  describe('Example two', () => {
    beforeEach(() => {
      let schema = {
        type: 'object',
        properties: {
          summary: {
            title: 'Project Summary',
            type: 'object',
            properties: {
              projectName: {type: 'string', title: 'Project Name'},
              projectDescription: {type: 'string', title: 'Project Description'},
              moreData: {type: 'string', title: 'Dont display me'}
            },
          },
        },
      };

      let data = {
        summary: {
          projectName: 'An AC Project',
          projectDescription: 'Doing some constructing',
          moreData: 'Dont display me'
        },
      };

      wrapper = mount(<ProjectSummary schema={schema} data={data} />);
    });

    it('Renders a sub heading with the title from the schema', () => {
      expect(wrapper.find('h3[data-test="project_name"]').text()).toEqual(
        'An AC Project',
      );
    });

    it('Renders a sub heading with the title from the schema', () => {
      expect(wrapper.find('div[data-test="project_description"]').text()).toEqual(
        'Doing some constructing',
      );
    });

    it('Doesnt render other summary data in the schema', () => {
      expect(wrapper.find('div[data-test="summary_moreData"]').length).toEqual(0);
    });

    it('Displays some helper text', () => {
      expect(wrapper.find('div[data-test="helper_text"]').length).toEqual(1)
    })
  });
});
