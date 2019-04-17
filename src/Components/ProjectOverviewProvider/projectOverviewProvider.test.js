import React from "react";
import { mount } from "enzyme";
import ProjectOverviewProvider from ".";

describe("<ProjectOverviewProvider>", () => {
  let provider, projectOverviewSpy, childrenSpy;

  describe("Example one", () => {
    describe("When mounting", () => {
      beforeEach(() => {
        projectOverviewSpy = {
          execute: jest.fn()
        };

        provider = mount(
          <ProjectOverviewProvider
            getProjectOverview={projectOverviewSpy}
            projectId={1}
          >
            {() => {}}
          </ProjectOverviewProvider>
        );
      });

      it("Calls the get project overview use case with the project id", () => {
        expect(projectOverviewSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            projectId: 1
          }
        );
      });
    });

    describe("When successfully getting the overview", () => {
      beforeEach(() => {
        projectOverviewSpy = {
          execute: jest.fn((presenter, { projectId }) => {
            presenter.presentOverview({
              name: "Cat",
              status: "Draft",
              type: "ac",
              data: { thisIs: "someData" },
              returns: [{ id: 1, status: "Draft" }],
              baselines: [{ id: 1, status: "Draft" }],
              claims: [{ id: 1, status: "Draft" }]
            });
          })
        };

        childrenSpy = jest.fn();

        provider = mount(
          <ProjectOverviewProvider
            getProjectOverview={projectOverviewSpy}
            projectId={1}
          >
            {childrenSpy}
          </ProjectOverviewProvider>
        );
      });

      it("It passes the found overview to the children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          name: "Cat",
          status: "Draft",
          type: "ac",
          data: { thisIs: "someData" },
          returns: [{ id: 1, status: "Draft" }],
          baselines: [{ id: 1, status: "Draft" }],
          claims: [{ id: 1, status: "Draft" }]
        });
      });
    });
  });

  describe("Example two", () => {
    describe("When mounting", () => {
      beforeEach(() => {
        projectOverviewSpy = {
          execute: jest.fn()
        };

        provider = mount(
          <ProjectOverviewProvider
            getProjectOverview={projectOverviewSpy}
            projectId={5}
          >
            {() => {}}
          </ProjectOverviewProvider>
        );
      });

      it("Calls the get project overview use case with the project id", () => {
        expect(projectOverviewSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            projectId: 5
          }
        );
      });
    });

    describe("When successfully getting the overview", () => {
      beforeEach(() => {
        projectOverviewSpy = {
          execute: jest.fn((presenter, { projectId }) => {
            presenter.presentOverview({
              name: "Cat",
              status: "Draft",
              type: "ac",
              data: { thisIs: "someData" },
              returns: [{ id: 1, status: "Draft" }],
              baselines: [{ id: 1, status: "Draft" }],
              claims: [{ id: 1, status: "Draft" }]
            });
          })
        };

        childrenSpy = jest.fn();

        provider = mount(
          <ProjectOverviewProvider
            getProjectOverview={projectOverviewSpy}
            projectId={5}
          >
            {childrenSpy}
          </ProjectOverviewProvider>
        );
      });

      it("It passes the found overview to the children", () => {
        expect(childrenSpy).toHaveBeenCalledWith({
          name: "Cat",
          status: "Draft",
          type: "ac",
          data: { thisIs: "someData" },
          returns: [{ id: 1, status: "Draft" }],
          baselines: [{ id: 1, status: "Draft" }],
          claims: [{ id: 1, status: "Draft" }]
        });
      });
    });
  });
});
