import React from "react";
import ArraySubform from ".";
import { mount } from "enzyme";

describe("<ArraySubform>", () => {
  let subform, onChangeSpy, schema, data, uiSchema, fields, noOfInfrasSpy;

  function getSubform({ schema, data, uiSchema, index, section }) {
    return mount(
      <ArraySubform
        data={data}
        fields={fields}
        schema={schema}
        selectedFormSection={section}
        selectedIndex={index}
        onChange={onChangeSpy}
        uiSchema={uiSchema}
        noOfInfras={noOfInfrasSpy}
      />
    );
  }

  function changeForm(subform, formData) {
    subform
      .find("Form")
      .props()
      .onChange({ formData });
  }

  function changeInfras(subform, number) {
    subform
      .props()
      .noOfInfras(number);
  }

  describe("Infras spy", () => {
    describe("Example 1", () => {
      beforeEach(() => {
        schema = {
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

        data = [
          {
            details: { firstName: "Meowington" },
            pets: { favourite: "All of them" }
          },
          {
            details: { firstName: "Barkington" },
            pets: { favourite: "All of them" }
          }
        ];

        uiSchema = {
          details: { firstName: { thing: true } },
          pets: { favourite: { otherThing: false } }
        };

        fields = { foo: () => {} };

        onChangeSpy = jest.fn();
        noOfInfrasSpy = jest.fn();
      });

      it("Calls the noOfInfras method", () => {
        let subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 1,
          section: "details"
        });

        changeInfras(subform, 1);

        expect(noOfInfrasSpy).toHaveBeenCalledWith(1);
      });
    });

    describe("Example 2", () => {
      beforeEach(() => {
        schema = {
          type: "array",
          title: "Dogs",
          items: {
            type: "object",
            title: "Dog",
            properties: {
              address: {
                type: "object",
                title: "Address",
                properties: {
                  lineOne: { type: "string" }
                }
              },
              contact: {
                type: "object",
                title: "Contact",
                properties: {
                  phoneNo: { type: "string" }
                }
              }
            }
          }
        };

        data = [
          {
            address: { lineOne: "1 Cat Rd" },
            contact: { phoneNo: "111" }
          },
          {
            address: { lineOne: "1 Dog Rd" },
            contact: { phoneNo: "222" }
          }
        ];

        uiSchema = {
          address: { lineOne: { this: true } },
          contact: { phoneNo: { that: false } }
        };

        fields = { bar: () => {} };

        onChangeSpy = jest.fn();
        noOfInfrasSpy = jest.fn();
      });

      it("Calls the noOfInfras method", () => {
        let subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 0,
          section: "address"
        });

        changeInfras(subform, 12);

        expect(noOfInfrasSpy).toHaveBeenCalledWith(12);
      });
    });
  });

  describe("Example one", () => {
    beforeEach(() => {
      schema = {
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

      data = [
        {
          details: { firstName: "Meowington" },
          pets: { favourite: "All of them" }
        },
        {
          details: { firstName: "Barkington" },
          pets: { favourite: "All of them" }
        }
      ];

      uiSchema = {
        details: { firstName: { thing: true } },
        pets: { favourite: { otherThing: false } }
      };

      fields = { foo: () => {} };

      onChangeSpy = jest.fn();
      noOfInfrasSpy = jest.fn();
    });

    it("Renders a form", () => {
      let subform = getSubform({
        schema,
        data,
        uiSchema,
        index: 0,
        section: "details"
      });

      expect(subform.find("Form").length).toEqual(1);
    });

    it("Sets the key on the form to the selected index and section", () => {
      let subform = getSubform({
        schema,
        data,
        uiSchema,
        index: 0,
        section: "details"
      });

      expect(subform.find("Form").key()).toEqual("0_details");
    });

    it("Passes the fields to the form", () => {
      let subform = getSubform({
        schema,
        data,
        uiSchema,
        index: 0,
        section: "details"
      });

      expect(subform.find("Form").props().fields).toEqual(fields);
    });

    describe("Given the first property selected", () => {
      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 0,
          section: "details"
        });
      });

      it("Passes the selected schema to the form", () => {
        expect(subform.find("Form").props().schema).toEqual(
          schema.items.properties.details
        );
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          firstName: "Meowington"
        });
      });

      it("Passes the uiSchema to the form", () => {
        expect(subform.find("Form").props().uiSchema).toEqual(uiSchema.details);
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { firstName: "Meowington Sr" });

        let expectedData = [
          {
            details: { firstName: "Meowington Sr" },
            pets: { favourite: "All of them" }
          },
          {
            details: { firstName: "Barkington" },
            pets: { favourite: "All of them" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });

    describe("Given the second property selected", () => {
      let subform;

      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 0,
          section: "pets"
        });
      });

      it("Passes the selected schema to the form", () => {
        expect(subform.find("Form").props().schema).toEqual(
          schema.items.properties.pets
        );
      });

      it("Sets the key on the form to the selected index and section", () => {
        expect(subform.find("Form").key()).toEqual("0_pets");
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          favourite: "All of them"
        });
      });

      it("Passes the uiSchema to the form", () => {
        expect(subform.find("Form").props().uiSchema).toEqual(uiSchema.pets);
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { favourite: "Every animal to ever exist" });

        let expectedData = [
          {
            details: { firstName: "Meowington" },
            pets: { favourite: "Every animal to ever exist" }
          },
          {
            details: { firstName: "Barkington" },
            pets: { favourite: "All of them" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });

    describe("Given the first property of the second item selected", () => {
      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 1,
          section: "details"
        });
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          firstName: "Barkington"
        });
      });

      it("Sets the key on the form to the selected index and section", () => {
        expect(subform.find("Form").key()).toEqual("1_details");
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { firstName: "Barkington III" });

        let expectedData = [
          {
            details: { firstName: "Meowington" },
            pets: { favourite: "All of them" }
          },
          {
            details: { firstName: "Barkington III" },
            pets: { favourite: "All of them" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      schema = {
        type: "array",
        title: "Dogs",
        items: {
          type: "object",
          title: "Dog",
          properties: {
            address: {
              type: "object",
              title: "Address",
              properties: {
                lineOne: { type: "string" }
              }
            },
            contact: {
              type: "object",
              title: "Contact",
              properties: {
                phoneNo: { type: "string" }
              }
            }
          }
        }
      };

      data = [
        {
          address: { lineOne: "1 Cat Rd" },
          contact: { phoneNo: "111" }
        },
        {
          address: { lineOne: "1 Dog Rd" },
          contact: { phoneNo: "222" }
        }
      ];

      uiSchema = {
        address: { lineOne: { this: true } },
        contact: { phoneNo: { that: false } }
      };

      fields = { bar: () => {} };

      onChangeSpy = jest.fn();
    });

    it("Renders a form", () => {
      let subform = getSubform({
        schema,
        data,
        uiSchema,
        index: 0,
        section: "address"
      });

      expect(subform.find("Form").length).toEqual(1);
    });

    it("Passes the fields to the form", () => {
      let subform = getSubform({
        schema,
        data,
        uiSchema,
        index: 0,
        section: "address"
      });

      expect(subform.find("Form").props().fields).toEqual(fields);
    });

    describe("Given the first property selected", () => {
      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 0,
          section: "address"
        });
      });

      it("Passes the selected schema to the form", () => {
        expect(subform.find("Form").props().schema).toEqual(
          schema.items.properties.address
        );
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          lineOne: "1 Cat Rd"
        });
      });

      it("Passes the uiSchema to the form", () => {
        expect(subform.find("Form").props().uiSchema).toEqual(uiSchema.address);
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { lineOne: "2 Cat Lane" });

        let expectedData = [
          {
            address: { lineOne: "2 Cat Lane" },
            contact: { phoneNo: "111" }
          },
          {
            address: { lineOne: "1 Dog Rd" },
            contact: { phoneNo: "222" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });

    describe("Given the second property selected", () => {
      let subform;

      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 0,
          section: "contact"
        });
      });

      it("Passes the selected schema to the form", () => {
        expect(subform.find("Form").props().schema).toEqual(
          schema.items.properties.contact
        );
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          phoneNo: "111"
        });
      });

      it("Passes the uiSchema to the form", () => {
        expect(subform.find("Form").props().uiSchema).toEqual(uiSchema.contact);
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { phoneNo: "333" });

        let expectedData = [
          {
            address: { lineOne: "1 Cat Rd" },
            contact: { phoneNo: "333" }
          },
          {
            address: { lineOne: "1 Dog Rd" },
            contact: { phoneNo: "222" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });

    describe("Given the first property of the second item selected", () => {
      beforeEach(() => {
        subform = getSubform({
          schema,
          data,
          uiSchema,
          index: 1,
          section: "address"
        });
      });

      it("Passes the selected form data to the form", () => {
        expect(subform.find("Form").props().formData).toEqual({
          lineOne: "1 Dog Rd"
        });
      });

      it("Passes the updated form data to the onChange method", () => {
        changeForm(subform, { lineOne: "3 Dog Rd" });

        let expectedData = [
          {
            address: { lineOne: "1 Cat Rd" },
            contact: { phoneNo: "111" }
          },
          {
            address: { lineOne: "3 Dog Rd" },
            contact: { phoneNo: "222" }
          }
        ];

        expect(onChangeSpy).toHaveBeenCalledWith(expectedData);
      });
    });
  });
});
