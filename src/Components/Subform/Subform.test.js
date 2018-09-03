import React from 'react';
import Subform from '.';
import {mount, shallow} from 'enzyme';

describe("<Subform>", () => {
  describe("Given an array schema", () => {
    let wrapper, onChangeSpy;

    function expectSelectedSectionToEqual(expectedSection) {
      expect(wrapper.state().selectedSection).toEqual(expectedSection);
    }

    function expectSelectedIndexToEqual(expectedIndex) {
      expect(wrapper.state().selectedIndex).toEqual(expectedIndex);
    }

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
      };

      beforeEach(() => {
        let data = [
          {
            details: {firstName: 'name'},
            pets: {favourite: 'All of them'}
          }, {
            details: {firstName: 'other name'},
            pets: {favourite: 'All the dogs'}
          }
        ]
        onChangeSpy = jest.fn();
        wrapper = shallow(<Subform schema={schema} data={data} onChange={onChangeSpy}/>);
      });

      it("Renders a sidebar", () => {
        expect(wrapper.find('Sidebar').length).toEqual(1)
      });

      it("Renders a form", () => {
        expect(wrapper.find('Form').length).toEqual(1)
      });

      describe("Selecting items on the sidebar", () => {
        it("Displays the first child of the schema by default", () => {
          expectSelectedSectionToEqual('details');
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(1)
        });

        it("Displays the second child of the schema when selecting the item in the sidebar", () => {
          wrapper.find('Sidebar').props().onItemClick('pets', 0);
          wrapper.update();

          expectSelectedSectionToEqual('pets');
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(0);
          expect(wrapper.find('[data-test="pets-form"]').length).toEqual(1)
        });

        it("Displays the first child of the second item in the schema when selecting the item in the sidebar", () => {
          wrapper.find('Sidebar').props().onItemClick('details', 1);
          wrapper.update();

          expectSelectedSectionToEqual('details');
          expectSelectedIndexToEqual(1);
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(1)
        });

        it("Passes the first childs schema to the form by default", () => {
          let expectedSchema = {
            type: 'object',
            title: 'Details',
            properties: {
              firstName: {type: 'string'},
            }
          };
          expect(wrapper.find('Form').props().schema).toEqual(expectedSchema)
        });

        it("Passes the first childs form data to the form by default", () => {
          let expectedFormData = {firstName: 'name'};

          expect(wrapper.find('Form').props().formData).toEqual(expectedFormData)
        });

        it("Passes the selected childs schema to the form", () => {
          wrapper.find('Sidebar').props().onItemClick('pets', 1);
          wrapper.update();

          let expectedSchema = {
            type: 'object',
            title: 'Pets',
            properties: {
              favourite: {type: 'string'},
            }
          };
          expect(wrapper.find('Form').props().schema).toEqual(expectedSchema)
        });

        it("Passes the selected childs form data to the form", () => {
          wrapper.find('Sidebar').props().onItemClick('pets', 1);
          wrapper.update();

          let expectedFormData = {favourite: 'All the dogs'};

          expect(wrapper.find('Form').props().formData).toEqual(expectedFormData)
        });
      })

      describe("Changing items within the form", () => {
        it("Updates the subform form data with the new data", () => {
          wrapper.find('Form').props().onChange({formData: {newData: 'Cats'}})
          let expectedData = [
            {
              details: {newData: 'Cats'},
              pets: {favourite: 'All of them'}
            }, {
              details: {firstName: 'other name'},
              pets: {favourite: 'All the dogs'}
            }
          ]
          expect(wrapper.state().formData).toEqual(expectedData)
        })

        it("Updates the subform form data with the new data", () => {
          wrapper.find('Sidebar').props().onItemClick('pets', 0)
          wrapper.find('Form').props().onChange({formData: {newData: 'Dogs'}})
          let expectedData = [
            {
              details: {firstName: 'name'},
              pets: {newData: 'Dogs'}
            }, {
              details: {firstName: 'other name'},
              pets: {favourite: 'All the dogs'}
            }
          ];
          expect(wrapper.state().formData).toEqual(expectedData)
        })

        it("Persists changes when changing a section in a form", () => {
          wrapper.find('Form').props().onChange({formData: {newData: 'Dogs'}})
          wrapper.find('Sidebar').props().onItemClick('pets', 0)
          wrapper.update()
          wrapper.find('Sidebar').props().onItemClick('details', 0)
          wrapper.update()
          expect(wrapper.find('Form').props().formData).toEqual({newData: 'Dogs'})
        })

        it("Calls the onChange method with the subform formData", () => {

        })
      })
    });

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
              },
            },
            contact: {
              type: 'object',
              title: 'contact',
              properties: {
                phoneNo: {type: 'string'}
              }
            }
          }
        }
      };

      beforeEach(() => {
        let data = [
          {
            address: {lineOne: 'Meow'},
            contact: {phoneNo: '01189998819991197253'}
          }, {
            address: {lineOne: 'Cats'},
            contact: {phoneNo: '999'}
          }
        ];
        onChangeSpy = jest.fn();
        wrapper = shallow(<Subform schema={schema} data={data} onChange={onChangeSpy}/>);
      });

      it("Renders a sidebar", () => {
        expect(wrapper.find('Sidebar').length).toEqual(1)
      });


      it("Renders a form", () => {
        expect(wrapper.find('Form').length).toEqual(1)
      });

      describe("Selecting items on the sidebar", () => {
        it("Displays the first child of the schema by default", () => {
          expectSelectedSectionToEqual('address');
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(1)
        });

        it("Displays the second child of the schema when selecting the item in the sidebar", () => {
          wrapper.find('Sidebar').props().onItemClick('contact', 0);
          wrapper.update();

          expectSelectedSectionToEqual('contact');
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(0);
          expect(wrapper.find('[data-test="contact-form"]').length).toEqual(1)
        });

        it("Displays the first child of the second item in the schema when selecting the item in the sidebar", () => {
          wrapper.find('Sidebar').props().onItemClick('address', 1);
          wrapper.update();

          expectSelectedSectionToEqual('address');
          expectSelectedIndexToEqual(1);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(1)
        });

        it("Passes the first childs schema to the form by default", () => {
          let expectedSchema = {
            type: 'object',
            title: 'address',
            properties: {
              lineOne: {type: 'string'}
            },
          };
          expect(wrapper.find('Form').props().schema).toEqual(expectedSchema)
        });

        it("Passes the first childs form data to the form by default", () => {
          let expectedFormData = {lineOne: 'Meow'};

          expect(wrapper.find('Form').props().formData).toEqual(expectedFormData)
        });

        it("Passes the selected childs schema to the form", () => {
          wrapper.find('Sidebar').props().onItemClick('contact', 0);
          wrapper.update();

          let expectedSchema = {
            type: 'object',
            title: 'contact',
            properties: {
              phoneNo: {type: 'string'}
            },
          };

          expect(wrapper.find('Form').props().schema).toEqual(expectedSchema)
        });

        it("Passes the selected childs form data to the form", () => {
          wrapper.find('Sidebar').props().onItemClick('contact', 1);
          wrapper.update();

          let expectedFormData = {phoneNo: '999'};

          expect(wrapper.find('Form').props().formData).toEqual(expectedFormData)
        });
      })
    })
  })
});
