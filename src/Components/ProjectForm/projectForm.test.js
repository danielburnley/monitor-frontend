import React from "react";
import ProjectForm from ".";
import {mount} from "enzyme";

describe("ProjectForm", () => {
  describe("Renders a <Form>", () => {
    it("Example 1", () => {
      let wrapper = mount(
        <ProjectForm
          schema={
            {
              type: "object",
              properties: {
                aProperty: {
                  type: "string"
                }
              }
            }
          }
          uiSchema={
            {
              aProperty: {
                "ui:widget": "hidden"
              }
            }
          }
          data={
            {
              aProperty: "A value"
            }
          }
        />
      );

      expect(wrapper.find("Form").props().schema).toEqual({
        type: "object",
        properties: {
          aProperty: {
            type: "string"
          }
        }
      });

      expect(wrapper.find("Form").props().uiSchema).toEqual({
        aProperty: {
          "ui:widget": "hidden"
        }
      });

      expect(wrapper.find("Form").props().formData).toEqual({
        aProperty: "A value"
      });
    });

    it("Example 2", () => {
      let wrapper = mount(
        <ProjectForm
          schema={
            {
              type: "object",
              properties: {
                bProperty: {
                  type: "string"
                },
                cProperty: {
                  type: "string"
                }
              }
            }
          }
          uiSchema={
            {
              bProperty: {}
            }
          }
          data={
            {
              bProperty: "A value"
            }
          }
        />
      );

      expect(wrapper.find("Form").props().schema).toEqual({
        type: "object",
        properties: {
          bProperty: {
            type: "string"
          },
          cProperty: {
            type: "string"
          }
        }
      });

      expect(wrapper.find("Form").props().uiSchema).toEqual({
        bProperty: {}
      });

      expect(wrapper.find("Form").props().formData).toEqual({
        bProperty: "A value"
      });
    });
  });
});
