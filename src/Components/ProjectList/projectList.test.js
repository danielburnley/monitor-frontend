import React from "react";
import ProjectList from ".";
import { shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("ProjectList", () => {
  let list;

  describe("Example 1", () => {
    beforeEach(() => {
      let projectList = [
        {
          id: 1,
          name: "Building",
          type: "ac",
          status: "Draft"
        },
        {
          id: 2,
          name: "House",
          type: "hif",
          status: "Submitted"
        }
      ]
      list = shallow(<ProjectList
        projectList={projectList}
      />)
    });
  
    it("Displays all projects", () => {
      expect(list.find('[data-test="project-1"]').length).toEqual(1)
      expect(list.find('[data-test="project-2"]').length).toEqual(1)
    });
  
    it("Displays the name of each project", () => {
      expect(list.find('[data-test="project-name-1"]').text()).toEqual("Building")
      expect(list.find('[data-test="project-name-2"]').text()).toEqual("House")
    });
  
    it("Displays the type of each project", () => {
      expect(list.find('[data-test="project-type-1"]').text()).toEqual("Accelerated Construction")
      expect(list.find('[data-test="project-type-2"]').text()).toEqual("Marginal Viability Fund")
    });
  
    it("Displays the status of each project", () => {
      expect(list.find('[data-test="project-status-1"]').text()).toEqual("Baseline Editor")
      expect(list.find('[data-test="project-status-2"]').text()).toEqual("Returns")
    });
  
    it("Displays a link to each project", () => {
      expect(list.find('[data-test="project-link-1"]').length).toEqual(1)
      expect(list.find('[data-test="project-link-2"]').length).toEqual(1)
    });
  });

  describe("Example 2", () => {
    beforeEach(() => {
      let projectList = [
        {
          id: 1,
          name: "large building",
          type: "ff",
          status: "Submitted"
        },
        {
          id: 2,
          name: "small house",
          type: "mvf",
          status: "Draft"
        }
      ]
      list = shallow(<ProjectList
        projectList={projectList}
      />)
    });
  
    it("Displays all projects", () => {
      expect(list.find('[data-test="project-1"]').length).toEqual(1)
      expect(list.find('[data-test="project-2"]').length).toEqual(1)
    });
  
    it("Displays the name of each project", () => {
      expect(list.find('[data-test="project-name-1"]').text()).toEqual("large building")
      expect(list.find('[data-test="project-name-2"]').text()).toEqual("small house")
    });
  
    it("Displays the type of each project", () => {
      expect(list.find('[data-test="project-type-1"]').text()).toEqual("Forward Funding")
      expect(list.find('[data-test="project-type-2"]').text()).toEqual("Marginal Viability Fund")
    });
  
    it("Displays the status of each project", () => {
      expect(list.find('[data-test="project-status-1"]').text()).toEqual("Returns")
      expect(list.find('[data-test="project-status-2"]').text()).toEqual("Baseline Editor")
    });
  
    it("Displays a link to each project", () => {
      expect(list.find('[data-test="project-link-1"]').length).toEqual(1)
      expect(list.find('[data-test="project-link-2"]').length).toEqual(1)
    });
  });

});