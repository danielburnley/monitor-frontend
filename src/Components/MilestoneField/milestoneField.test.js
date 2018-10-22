import React from "react";
import { shallow } from "enzyme";
import MilestoneField from ".";

class MilestoneComponent {
  constructor(formData, onChange, schemaTitle) {
    this.milestone = shallow(
      <MilestoneField
        schema={{ title: schemaTitle }}
        formData={formData}
        onChange={onChange}
      />
    );
  }

  title = () => this.milestone.find("[data-test='schema-title']").text();

  description = () =>
    this.milestone.find("[data-test='milestone-description']").text();

  milestoneBaselineCompletion = () =>
    this.milestone
      .find("[data-test='milestone-milestoneBaselineCompletion']")
      .text();

  summary = () => this.milestone.find("[data-test='milestone-summary']").text();

  simulateStatusAgainstLastReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return']")
      .simulate("change", { target: { value: inputValue } });

  simulateCurrentReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-current-return']")
      .simulate("change", { target: { value: inputValue } });

  simulateReasonForVariance = inputValue =>
    this.milestone
      .find("[data-test='milestone-reason-for-variance']")
      .simulate("change", { target: { value: inputValue } });

  simulateMilestonePercentCompleted = inputValue =>
    this.milestone
      .find("[data-test='milestone-percent-completed']")
      .simulate("change", { target: { value: inputValue } });

  findStatusAgainstLastReturn = () =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return']")
      .props().value;

  findCurrentReturn = () =>
    this.milestone.find("[data-test='milestone-current-return']").props().value;

  findReasonForVariance = () =>
    this.milestone.find("[data-test='milestone-reason-for-variance']").props()
      .value;

  findMilestonePercentCompleted = () =>
    this.milestone.find("[data-test='milestone-percent-completed']").props()
      .value;
}

describe("<MilestoneField>", () => {
  let onChangeSpy = jest.fn();
  describe("Given baseline data", () => {
    describe("Example 1", () => {
      let formData = {
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!"
      };
      let schemaTitle = "Milestone Fields";
      let milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("displays the schema title", () => {
        expect(milestone.title()).toEqual("Milestone Fields");
      });

      it("displays the milestone description", () => {
        expect(milestone.description()).toEqual(
          "Here is a stone that marks a mile."
        );
      });

      it("displays the milestoneBaselineCompletion date", () => {
        expect(milestone.milestoneBaselineCompletion()).toEqual("31/03/2018");
      });

      it("displays the summary", () => {
        expect(milestone.summary()).toEqual("Contract begins!!!");
      });
    });

    describe("Example 2", () => {
      let formData = {
        description: "Cats have walked very far",
        milestoneBaselineCompletion: "10/10/2019",
        milestoneSummaryOfCriticalPath: "Give them pets and fish"
      };
      let schemaTitle = "Cats walking club";
      let milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("displays the schema title", () => {
        expect(milestone.title()).toEqual("Cats walking club");
      });

      it("displays the milestone description", () => {
        expect(milestone.description()).toEqual("Cats have walked very far");
      });

      it("displays the milestoneBaselineCompletion date", () => {
        expect(milestone.milestoneBaselineCompletion()).toEqual("10/10/2019");
      });

      it("displays the summary", () => {
        expect(milestone.summary()).toEqual("Give them pets and fish");
      });
    });
  });

  describe("When updating fields", () => {
    describe("Example 1", () => {
      let milestone;
      let formData = {
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!"
      };
      let schemaTitle = "Milestone Fields";
      milestone = new MilestoneComponent(formData, onChangeSpy, schemaTitle);

      it("Updates the values of the fields", () => {
        milestone.simulateStatusAgainstLastReturn("Completed");
        milestone.simulateCurrentReturn("21/09/2019");
        milestone.simulateReasonForVariance(
          "A variance has occured, causing variance"
        );
        milestone.simulateMilestonePercentCompleted("65");

        expect(onChangeSpy).toHaveBeenCalledWith({
          description: "Here is a stone that marks a mile.",
          milestoneBaselineCompletion: "31/03/2018",
          milestoneSummaryOfCriticalPath: "Contract begins!!!",
          statusAgainstLastReturn: "Completed",
          currentReturn: "21/09/2019",
          reasonForVariance: "A variance has occured, causing variance",
          milestonePercentCompleted: "65"
        });
      });
    });

    describe("Example 2", () => {
      let milestone;
      let formData = {
        description: "Cats have walked very far",
        milestoneBaselineCompletion: "10/10/2019",
        milestoneSummaryOfCriticalPath: "Give them pets and fish"
      };
      let schemaTitle = "Cats walking club";
      milestone = new MilestoneComponent(formData, onChangeSpy, schemaTitle);

      it("Updates the values of the fields", () => {
        milestone.simulateStatusAgainstLastReturn("On schedule");
        milestone.simulateCurrentReturn("25/12/2018");
        milestone.simulateReasonForVariance(
          "The cats are fast and are moving quickly."
        );
        milestone.simulateMilestonePercentCompleted("80");

        expect(onChangeSpy).toHaveBeenCalledWith({
          description: "Cats have walked very far",
          milestoneBaselineCompletion: "10/10/2019",
          milestoneSummaryOfCriticalPath: "Give them pets and fish",
          statusAgainstLastReturn: "On schedule",
          currentReturn: "25/12/2018",
          reasonForVariance: "The cats are fast and are moving quickly.",
          milestonePercentCompleted: "80"
        });
      });
    });
  });

  describe("Given pre-populated form data", () => {
    describe("Example 1", () => {
      let milestone;
      let formData = {
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!",
        statusAgainstLastReturn: "Completed",
        currentReturn: "21/09/2019",
        reasonForVariance: "A variance has occured, causing variance",
        milestonePercentCompleted: "65"
      };
      let schemaTitle = "Milestone Fields";
      milestone = new MilestoneComponent(formData, onChangeSpy, schemaTitle);

      it("displays the status against last return", () => {
        expect(milestone.findStatusAgainstLastReturn()).toEqual("Completed");
      });

      it("displays the current return", () => {
        expect(milestone.findCurrentReturn()).toEqual("21/09/2019");
      });

      it("displays the reason for variance", () => {
        expect(milestone.findReasonForVariance()).toEqual(
          "A variance has occured, causing variance"
        );
      });

      it("displays the milestone percent completed", () => {
        expect(milestone.findMilestonePercentCompleted()).toEqual("65")
      })
    });

    describe("Example 2", () => {
      let milestone;
      let formData = {
        description: "Cats have walked very far",
        milestoneBaselineCompletion: "10/10/2019",
        milestoneSummaryOfCriticalPath: "Give them pets and fish",
        statusAgainstLastReturn: "On schedule",
        currentReturn: "25/12/2018",
        reasonForVariance: "The cats are fast and are moving quickly.",
        milestonePercentCompleted: "80"
      };
      let schemaTitle = "Cats walking club";
      milestone = new MilestoneComponent(formData, onChangeSpy, schemaTitle);

      it("displays the status against last return", () => {
        expect(milestone.findStatusAgainstLastReturn()).toEqual("On schedule");
      });

      it("displays the current return", () => {
        expect(milestone.findCurrentReturn()).toEqual("25/12/2018");
      });

      it("displays the reason for variance", () => {
        expect(milestone.findReasonForVariance()).toEqual(
          "The cats are fast and are moving quickly."
        );
      });

      it("displays the milestone percent completed", () => {
        expect(milestone.findMilestonePercentCompleted()).toEqual("80")
      })
    });
  });
});
