import React from "react";
import ArraySubform from ".";
import { shallow } from "enzyme";

describe("<ArraySubform>", () => {
  describe("Given an array schema", () => {
    let wrapper, onChangeSpy;

    function expectSelectedSectionToEqual(expectedSection) {
      expect(wrapper.state().selectedFormSection).toEqual(expectedSection);
    }

    function expectSelectedIndexToEqual(expectedIndex) {
      expect(wrapper.state().selectedIndex).toEqual(expectedIndex);
    }

    function selectSection(sectionIndex, sectionName) {
      wrapper
        .find("Sidebar")
        .props()
        .onItemClick(sectionName, sectionIndex);
      wrapper.update();
    }

    function changeForm(formData) {
      wrapper
        .find("Form")
        .props()
        .onChange({ formData });
    }

    describe("Example one", () => {
      let schema = {
        type: "array",
        title: "Cats",
        items: {
          type: "object",
          title: "Cat",
          properties: {
            details: {
              type: "object",
              title: "Details",
              properties: {
                firstName: { type: "string" }
              }
            },
            pets: {
              type: "object",
              title: "Pets",
              properties: {
                favourite: { type: "string" }
              }
            }
          }
        }
      };

      let fields = { dog: () => {} };

      beforeEach(() => {
        let data = [
          {
            details: { firstName: "name" },
            pets: { favourite: "All of them" }
          },
          {
            details: { firstName: "other name" },
            pets: { favourite: "All the dogs" }
          }
        ];
        onChangeSpy = jest.fn();
        wrapper = shallow(
          <ArraySubform
            schema={schema}
            data={data}
            onChange={onChangeSpy}
            uiSchema={{
              details: { firstName: "Meow" },
              pets: { favourite: "Woof" }
            }}
            fields={fields}
          />
        );
      });

      it("Renders a sidebar", () => {
        expect(wrapper.find("Sidebar").length).toEqual(1);
      });

      it("Renders a form", () => {
        expect(wrapper.find("Form").length).toEqual(1);
      });

      it("Passes the fields to the form", () => {
        expect(wrapper.find("Form").props().fields).toEqual(fields);
      });

      describe("Selecting items on the sidebar", () => {
        it("Displays the first child of the schema by default", () => {
          expectSelectedSectionToEqual("details");
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(1);
        });

        it("Displays the second child of the schema when selecting the item in the sidebar", () => {
          selectSection(0, "pets");

          expectSelectedSectionToEqual("pets");
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(0);
          expect(wrapper.find('[data-test="pets-form"]').length).toEqual(1);
        });

        it("Displays the first child of the second item in the schema when selecting the item in the sidebar", () => {
          selectSection(1, "details");

          expectSelectedSectionToEqual("details");
          expectSelectedIndexToEqual(1);
          expect(wrapper.find('[data-test="details-form"]').length).toEqual(1);
        });

        it("Passes the first childs schema to the form by default", () => {
          let expectedSchema = {
            type: "object",
            title: "Details",
            properties: {
              firstName: { type: "string" }
            }
          };
          expect(wrapper.find("Form").props().schema).toEqual(expectedSchema);
        });

        it("Passes the uiSchema of the first child to the form", () => {
          expect(wrapper.find("Form").props().uiSchema).toEqual({
            firstName: "Meow"
          });
        });

        it("Passes the first childs form data to the form by default", () => {
          let expectedFormData = { firstName: "name" };

          expect(wrapper.find("Form").props().formData).toEqual(
            expectedFormData
          );
        });

        it("Passes the selected childs schema to the form", () => {
          selectSection(1, "pets");

          let expectedSchema = {
            type: "object",
            title: "Pets",
            properties: {
              favourite: { type: "string" }
            }
          };
          expect(wrapper.find("Form").props().schema).toEqual(expectedSchema);
        });

        it("Passes the selected childs uiSchema to the form", () => {
          selectSection(1, "pets");

          expect(wrapper.find("Form").props().uiSchema).toEqual({
            favourite: "Woof"
          });
        });

        it("Passes the selected childs form data to the form", () => {
          selectSection(1, "pets");

          let expectedFormData = { favourite: "All the dogs" };

          expect(wrapper.find("Form").props().formData).toEqual(
            expectedFormData
          );
        });
      });

      describe("Changing items within the form", () => {
        it("Updates the subform form data with the new data", () => {
          changeForm({ newData: "Cats" });

          let expectedData = [
            {
              details: { newData: "Cats" },
              pets: { favourite: "All of them" }
            },
            {
              details: { firstName: "other name" },
              pets: { favourite: "All the dogs" }
            }
          ];

          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Updates the subform form data with the new data", () => {
          selectSection(0, "pets");
          changeForm({ newData: "Dogs" });

          let expectedData = [
            {
              details: { firstName: "name" },
              pets: { newData: "Dogs" }
            },
            {
              details: { firstName: "other name" },
              pets: { favourite: "All the dogs" }
            }
          ];
          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Updates the subform form data with the new data with different selected index", () => {
          selectSection(1, "pets");
          changeForm({ newData: "Dogs" });

          let expectedData = [
            {
              details: { firstName: "name" },
              pets: { favourite: "All of them" }
            },
            {
              details: { firstName: "other name" },
              pets: { newData: "Dogs" }
            }
          ];
          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Persists changes when changing a section in a form", () => {
          changeForm({ newData: "Dogs" });
          selectSection(0, "pets");
          selectSection(0, "details");

          expect(wrapper.find("Form").props().formData).toEqual({
            newData: "Dogs"
          });
        });

        it("Calls the onChange method with the subform formData", () => {
          changeForm({ newData: "Dogs" });

          let expectedFormData = [
            {
              details: { newData: "Dogs" },
              pets: { favourite: "All of them" }
            },
            {
              details: { firstName: "other name" },
              pets: { favourite: "All the dogs" }
            }
          ];

          expect(onChangeSpy).toHaveBeenCalledWith(expectedFormData);
        });
      });
    });

    describe("Example two", () => {
      let schema = {
        type: "array",
        title: "Houses",
        items: {
          type: "object",
          title: "House",
          properties: {
            address: {
              type: "object",
              title: "address",
              properties: {
                lineOne: { type: "string" }
              }
            },
            contact: {
              type: "object",
              title: "contact",
              properties: {
                phoneNo: { type: "string" }
              }
            }
          }
        }
      };

      let fields = { a: () => {} };

      beforeEach(() => {
        let data = [
          {
            address: { lineOne: "Meow" },
            contact: { phoneNo: "01189998819991197253" }
          },
          {
            address: { lineOne: "Cats" },
            contact: { phoneNo: "999" }
          }
        ];
        onChangeSpy = jest.fn();
        wrapper = shallow(
          <ArraySubform
            schema={schema}
            data={data}
            onChange={onChangeSpy}
            uiSchema={{
              address: { lineOne: "Moo" },
              contact: { phoneNo: "Quack" }
            }}
            fields={fields}
          />
        );
      });

      it("Renders a sidebar", () => {
        expect(wrapper.find("Sidebar").length).toEqual(1);
      });

      it("Renders a form", () => {
        expect(wrapper.find("Form").length).toEqual(1);
      });

      it("Passes the fields to the form", () => {
        expect(wrapper.find("Form").props().fields).toEqual(fields);
      });

      describe("Selecting items on the sidebar", () => {
        it("Displays the first child of the schema by default", () => {
          expectSelectedSectionToEqual("address");
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(1);
        });

        it("Displays the second child of the schema when selecting the item in the sidebar", () => {
          selectSection(0, "contact");

          expectSelectedSectionToEqual("contact");
          expectSelectedIndexToEqual(0);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(0);
          expect(wrapper.find('[data-test="contact-form"]').length).toEqual(1);
        });

        it("Displays the first child of the second item in the schema when selecting the item in the sidebar", () => {
          selectSection(1, "address");

          expectSelectedSectionToEqual("address");
          expectSelectedIndexToEqual(1);
          expect(wrapper.find('[data-test="address-form"]').length).toEqual(1);
        });

        it("Passes the first childs schema to the form by default", () => {
          let expectedSchema = {
            type: "object",
            title: "address",
            properties: {
              lineOne: { type: "string" }
            }
          };
          expect(wrapper.find("Form").props().schema).toEqual(expectedSchema);
        });

        it("Passes the selected uiSchema to the form", () => {
          expect(wrapper.find("Form").props().uiSchema).toEqual({
            lineOne: "Moo"
          });
        });

        it("Passes the first childs form data to the form by default", () => {
          let expectedFormData = { lineOne: "Meow" };

          expect(wrapper.find("Form").props().formData).toEqual(
            expectedFormData
          );
        });

        it("Passes the selected childs schema to the form", () => {
          selectSection(0, "contact");

          let expectedSchema = {
            type: "object",
            title: "contact",
            properties: {
              phoneNo: { type: "string" }
            }
          };

          expect(wrapper.find("Form").props().schema).toEqual(expectedSchema);
        });

        it("Passes the selected childs uiSchema to the form", () => {
          selectSection(0, "contact");

          expect(wrapper.find("Form").props().uiSchema).toEqual({
            phoneNo: "Quack"
          });
        });

        it("Passes the selected childs form data to the form", () => {
          selectSection(1, "contact");

          let expectedFormData = { phoneNo: "999" };

          expect(wrapper.find("Form").props().formData).toEqual(
            expectedFormData
          );
        });
      });

      describe("Changing items within the form", () => {
        it("Updates the subform form data with the new data", () => {
          changeForm({ lineOne: "Woof" });

          let expectedData = [
            {
              address: { lineOne: "Woof" },
              contact: { phoneNo: "01189998819991197253" }
            },
            {
              address: { lineOne: "Cats" },
              contact: { phoneNo: "999" }
            }
          ];

          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Updates the subform form data with the new data", () => {
          selectSection(0, "contact");
          changeForm({ phoneNo: "111" });

          let expectedData = [
            {
              address: { lineOne: "Meow" },
              contact: { phoneNo: "111" }
            },
            {
              address: { lineOne: "Cats" },
              contact: { phoneNo: "999" }
            }
          ];

          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Updates the subform form data with the new data with different selected index", () => {
          selectSection(1, "contact");
          changeForm({ phoneNo: "111" });

          let expectedData = [
            {
              address: { lineOne: "Meow" },
              contact: { phoneNo: "01189998819991197253" }
            },
            {
              address: { lineOne: "Cats" },
              contact: { phoneNo: "111" }
            }
          ];

          expect(wrapper.state().formData).toEqual(expectedData);
        });

        it("Persists changes when changing a section in a form", () => {
          changeForm({ lineOne: "Barkbarkbark" });
          selectSection(0, "contact");
          selectSection(0, "address");

          expect(wrapper.find("Form").props().formData).toEqual({
            lineOne: "Barkbarkbark"
          });
        });

        it("Calls the onChange method with the subform formData", () => {
          changeForm({ lineOne: "BarkMeow" });

          let expectedFormData = [
            {
              address: { lineOne: "BarkMeow" },
              contact: { phoneNo: "01189998819991197253" }
            },
            {
              address: { lineOne: "Cats" },
              contact: { phoneNo: "999" }
            }
          ];

          expect(onChangeSpy).toHaveBeenCalledWith(expectedFormData);
        });
      });
    });
  });
});
