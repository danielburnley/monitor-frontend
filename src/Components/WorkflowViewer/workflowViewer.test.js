import React from "react";
import WorkflowViewer from ".";
import { shallow, mount } from "enzyme";

describe("<WorkflowViewer>", () => {
  describe("Example 1", () => {
    it("Renders based on the provided workflow", () => {
      let wrap = mount(<WorkflowViewer workflow={
        [
          {
            title: "Tell us about your scheme",
            description: "This is where we will create the primary profile for your project.",
            steps: [
              {
                title: "Deliverables",
                section: "deliverables"
              },
              {
                title: "Planning",
                section: "planning"
              }
            ]
          },
          {
            title: "What preperation work is required",
            description: "This is where we will need to know some of the external impacts to the project.",
            steps: [
              {
                title: "Land ownership",
                section: "landOwnership"
              }
            ]
          }
        ]
      }/>);

      expect(wrap.find("[data-test='workflowTitle']").at(0).text()).toEqual("Tell us about your scheme")
      expect(wrap.find("[data-test='workflowDescription']").at(0).text()).toEqual("This is where we will create the primary profile for your project.")
      expect(wrap.find("[data-test='workflowStep']").at(0).text()).toEqual("Deliverables")
      expect(wrap.find("[data-test='workflowStep']").at(1).text()).toEqual("Planning")

      expect(wrap.find("[data-test='workflowTitle']").at(1).text()).toEqual("What preperation work is required")
      expect(wrap.find("[data-test='workflowDescription']").at(1).text()).toEqual("This is where we will need to know some of the external impacts to the project.")
      expect(wrap.find("[data-test='workflowStep']").at(2).text()).toEqual("Land ownership")
    });
  });

  describe("Example 2", () => {
    it("Renders based on the provided workflow", () => {
      let wrap = mount(<WorkflowViewer workflow={
        [
          {
            title: "a title",
            description: "A description",
            steps: [
              {
                title: "Step 1",
                section: "section"
              }
            ]
          }
        ]
      }/>);

      expect(wrap.find("[data-test='workflowTitle']").at(0).text()).toEqual("a title")
      expect(wrap.find("[data-test='workflowDescription']").at(0).text()).toEqual("A description")
      expect(wrap.find("[data-test='workflowStep']").at(0).text()).toEqual("Step 1")
    });
  });
});
