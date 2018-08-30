import React from 'react';
import Subform from '.';
import {mount, shallow} from 'enzyme';

describe("<Subform>", () => {
  describe("Given an array schema", () => {
    describe("Example one", () => {
      let schema = {
        type: 'array',
        title: 'Cats',
        items: {
          type: 'object',
          title: 'Cat',
          properties: {
            details: {
              type: 'object',
              title: 'Details',
              properties: {
                firstName: {type: 'string'},
              }
            },
            pets: {
              type: 'object',
              title: 'Pets',
              properties: {
                favourite: {type: 'string'},
              }
            }
          }
        }
      }

      let formData = [{}]

      it("Renders a sidebar", () => {
        let wrapper = shallow(<Subform schema={schema} formData={formData} />)
        expect(wrapper.find('Sidebar').length).toEqual(1)
      })

      it("Renders a form", () => {
        let wrapper = shallow(<Subform schema={schema} formData={formData}/>)
        expect(wrapper.find('Form').length).toEqual(1)
      })

      it("Displays the first child of the schema by default", () => {
        let wrapper = shallow(<Subform schema={schema} />)
        expect(wrapper.find('[data-test="details-form"]').length).toEqual(1)
      })

      it("Displays the second child of the schema when selecting the item in the sidebar", () => {
        let wrapper = mount(<Subform schema={schema} />)
        wrapper.find('[data-test="sidebar-item-child-button"]').at(1).simulate('click')
        wrapper.update()
        expect(wrapper.find('[data-test="details-form"]').length).toEqual(0)
        expect(wrapper.find('[data-test="pets-form"]').length).toEqual(1)

      })
    })

    describe("Example two", () => {
      let schema = {
        type: 'array',
        title: 'Houses',
        items: {
          type: 'object',
          title: 'House',
          properties: {
            address: {
              type: 'object',
              title: 'address',
              properties: {
                lineOne: {type: 'string'}
              }
            }
          }
        }
      }

      let formData = [{}]

      it("Renders a sidebar", () => {
        let wrapper = shallow(<Subform schema={schema} />)
        expect(wrapper.find('Sidebar').length).toEqual(1)
      })

      it("Displays the first child of the schema by default", () => {
        let wrapper = shallow(<Subform schema={schema} />)
        expect(wrapper.find('[data-test="address-form"]').length).toEqual(1)
      })
    })
  })
});
