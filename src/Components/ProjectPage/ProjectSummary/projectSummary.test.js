import React from 'react';
import ProjectSummary from '.';
import {mount} from 'enzyme';

describe('<ProjectSummary>', () => {
  let wrapper;
  describe('Example one', () => {
    describe('Given a schema with a single property', () => {
      beforeEach(() => {
        let schema = {
          type: 'object',
          properties: {
            summary: {
              title: 'Project Summary',
              type: 'object',
              properties: {
                name: {type: 'string', title: 'Project Name'},
              },
            },
          },
        };

        let data = {
          summary: {
            name: 'A HIF Project',
          },
        };

        wrapper = mount(<ProjectSummary schema={schema} data={data} />);
      });

      it('Renders a header and value from the schema and data', () => {
        expect(wrapper.find('h2').text()).toEqual('Project Summary');
      });

      it('Renders a sub heading with the title from the schema', () => {
        expect(wrapper.find('h3[data-test="summary_name"]').text()).toEqual(
          'Project Name',
        );
      });

      it('Renders a sub heading with the title from the schema', () => {
        expect(wrapper.find('div[data-test="summary_name"]').text()).toEqual(
          'A HIF Project',
        );
      });
    });

    describe('Given a schema with two properties', () => {
      beforeEach(() => {
        let schema = {
          type: 'object',
          properties: {
            summary: {
              title: 'Project Summary',
              type: 'object',
              properties: {
                name: {type: 'string', title: 'Project Name'},
                owner: {type: 'string', title: 'Project Owner'},
              },
            },
          },
        };

        let data = {
          summary: {
            name: 'A HIF Project',
            owner: 'Dave'
          },
        };

        wrapper = mount(<ProjectSummary schema={schema} data={data} />);
      });

      it('Renders sub headings with the title from the schema', () => {
        expect(wrapper.find('h3[data-test="summary_name"]').text()).toEqual(
          'Project Name',
        );

        expect(wrapper.find('h3[data-test="summary_owner"]').text()).toEqual(
          'Project Owner',
        );
      });

      it('Renders a sub heading with the title from the schema', () => {
        expect(wrapper.find('div[data-test="summary_name"]').text()).toEqual(
          'A HIF Project',
        );

        expect(wrapper.find('div[data-test="summary_owner"]').text()).toEqual(
          'Dave',
        );
      });
    });
  });

  describe('Example two', () => {
    describe('Given a schema with a single property', () => {
      beforeEach(() => {
        let schema = {
          type: 'object',
          properties: {
            summary: {
              title: 'Super Project Summary',
              type: 'object',
              properties: {
                owner: {type: 'string', title: 'Project Owner'},
              },
            },
          },
        };

        let data = {
          summary: {
            owner: 'Dave',
          },
        };

        wrapper = mount(<ProjectSummary schema={schema} data={data} />);
      });

      it('Renders a header and value from the schema and data', () => {
        expect(wrapper.find('h2').text()).toEqual('Super Project Summary');
      });

      it('Renders a sub heading with the title from the schema', () => {
        expect(wrapper.find('h3[data-test="summary_owner"]').text()).toEqual(
          'Project Owner',
        );
      });

      it('Renders a sub heading with the title from the schema', () => {
        expect(wrapper.find('div[data-test="summary_owner"]').text()).toEqual(
          'Dave',
        );
      });
    });
  });
});
