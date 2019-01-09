import React from 'react';
import MilestoneComponent from '../../../test/MilestoneField';

describe("<MilestoneField>", () => {
  let onChangeSpy = jest.fn();

  describe("Given baseline data", () => {
    describe("Example 1", () => {
      let formData = {
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "31/03/2018",
        milestoneLastReturnDate: null,
        milestoneSummaryOfCriticalPath: "Contract begins!!!"
      };
      let schemaTitle = "Milestone Fields";
      let milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

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
        milestoneBaselineCompletion: "03/31/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!",
        milestoneLastReturnDate: null
      };
      let schemaTitle = "Milestone Fields";
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("Updates the values of the fields and calculates variances", () => {
        milestone.simulateStatusAgainstLastReturn("Delayed - moderate impact");
        milestone.simulateCurrentReturn("04/07/2018");
        milestone.simulateReasonForVariance(
          "A variance has occured, causing variance"
        );
        milestone.simulateMilestonePercentCompleted("65");

        expect(onChangeSpy).toHaveBeenCalledWith({
          description: "Here is a stone that marks a mile.",
          milestoneBaselineCompletion: "03/31/2018",
          milestoneSummaryOfCriticalPath: "Contract begins!!!",
          statusAgainstLastReturn: "Delayed - moderate impact",
          currentReturn: "04/07/2018",
          reasonForVariance: "A variance has occured, causing variance",
          milestonePercentCompleted: "65",
          milestoneLastReturnDate: null,
          milestoneVarianceAgainstBaseline: 1,
          milestoneVarianceAgainstLastReturn: null
        });
      });
    });

    describe("Example 2", () => {
      let milestone;
      let formData = {
        description: "Cats have walked very far",
        milestoneBaselineCompletion: "10/10/2019",
        milestoneSummaryOfCriticalPath: "Give them pets and fish",
        milestoneLastReturnDate: "10/17/2019"
      };
      let schemaTitle = "Cats walking club";
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("Updates the values of the fields and calculates variances", () => {
        milestone.simulateStatusAgainstLastReturn("Delayed - minimal impact");
        milestone.simulateCurrentReturn("10/24/2019");
        milestone.simulateMilestonePercentCompleted("80");

        expect(onChangeSpy).toHaveBeenCalledWith({
          description: "Cats have walked very far",
          milestoneBaselineCompletion: "10/10/2019",
          milestoneCompletedDate: undefined,
          milestoneLastReturnDate: "10/17/2019",
          milestoneSummaryOfCriticalPath: "Give them pets and fish",
          statusAgainstLastReturn: "Delayed - minimal impact",
          currentReturn: "10/24/2019",
          milestonePercentCompleted: "80",
          milestoneVarianceAgainstBaseline: 2,
          milestoneVarianceAgainstLastReturn: 1
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
        statusAgainstLastReturn: "Delayed - moderate impact",
        currentReturn: "21/09/2019",
        reasonForVariance: "A variance has occured, causing variance",
        milestonePercentCompleted: "65"
      };
      let schemaTitle = "Milestone Fields";
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("displays the status against last return", () => {
        expect(milestone.findStatusAgainstLastReturn()).toEqual("Delayed - moderate impact");
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
        expect(milestone.findMilestonePercentCompleted()).toEqual("65");
      });
    });

    describe("Example 2", () => {
      let milestone;
      let formData = {
        description: "Cats have walked very far",
        milestoneBaselineCompletion: "10/10/2019",
        milestoneSummaryOfCriticalPath: "Give them pets and fish",
        statusAgainstLastReturn: "Delayed - critcal",
        currentReturn: "25/12/2018",
        reasonForVariance: "The cats are fast and are moving quickly.",
        milestonePercentCompleted: "80"
      };
      let schemaTitle = "Cats walking club";
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("displays the status against last return", () => {
        expect(milestone.findStatusAgainstLastReturn()).toEqual("Delayed - critcal");
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
        expect(milestone.findMilestonePercentCompleted()).toEqual("80");
      });
    });
  });

  describe("Changing pre-populated form data", () => {
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
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("updates the value of the status against last return", () => {
        milestone.simulateStatusAgainstLastReturn("On schedule");
        expect(milestone.findStatusAgainstLastReturn()).toEqual("On schedule");
      });

      it("updates the value of the current return", () => {
        milestone.simulateStatusAgainstLastReturn("Delayed - minimal impact");
        milestone.simulateCurrentReturn("31/10/2019");
        expect(milestone.findCurrentReturn()).toEqual("31/10/2019");
      });

      it("updates the value of reason for variance", () => {
        milestone.simulateStatusAgainstLastReturn("Delayed - minimal impact");
        milestone.simulateReasonForVariance("New variance!");
        expect(milestone.findReasonForVariance()).toEqual("New variance!");
      });

      it("updates the value of milestone percent completed", () => {
        milestone.simulateMilestonePercentCompleted("70");
        expect(milestone.findMilestonePercentCompleted()).toEqual("70");
      });
    });

    describe("Example 1", () => {
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
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );

      it("updates the value of the status against last return", () => {
        milestone.simulateStatusAgainstLastReturn("Delayed - minimal impact");
        expect(milestone.findStatusAgainstLastReturn()).toEqual("Delayed - minimal impact");
      });

      it("updates the value of the current return", () => {
        milestone.simulateCurrentReturn("01/01/2019");
        expect(milestone.findCurrentReturn()).toEqual("01/01/2019");
      });

      it("updates the value of reason for variance", () => {
        milestone.simulateReasonForVariance("More cats have started the journey");
        expect(milestone.findReasonForVariance()).toEqual("More cats have started the journey");
      });

      it("updates the value of milestone percent completed", () => {
        milestone.simulateMilestonePercentCompleted("99");
        expect(milestone.findMilestonePercentCompleted()).toEqual("99");
      });
    });
  });

  describe("dependencies", () => {
    let milestone;

    beforeEach(() => {
      let formData = {
        description: "Here is a stone that marks a mile.",
        milestoneBaselineCompletion: "03/31/2018",
        milestoneSummaryOfCriticalPath: "Contract begins!!!",
        milestoneLastReturnDate: "04/31/2019"
      };
      let schemaTitle =  "Milestone Fields";
      milestone = new MilestoneComponent(
        formData,
        onChangeSpy,
        schemaTitle
      );
    });

    describe("If completed", () => {
      beforeEach(() => {
        milestone.simulateStatusAgainstLastReturn("Completed")
      });

      it("shows completed date", () => {
        expect(milestone.milestoneCompletedDate()).toEqual(1)
      });

      it("doesn't display the current return date", () => {
        expect(milestone.currentReturn()).toEqual(0);
      });

      it("doesn't display the reason for variance", () => {
        expect(milestone.reasonForVariance()).toEqual(0)
      });

      it("doesn't display the baseline variance", () => {
        expect(milestone.baselineVariance()).toEqual(0)
      });

      it("doesn't display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(0)
      });
    });

    describe("If Delayed - moderate impact", () => {
      beforeEach(() => {
        milestone.simulateStatusAgainstLastReturn("Delayed - moderate impact")
      });

      it("shows the reason for variance", () => {
        expect(milestone.reasonForVariance()).toEqual(1)
      });

      it("shows the current return date", () => {
        expect(milestone.currentReturn()).toEqual(1);
      });

      it("does display the baseline variance", () => {
        expect(milestone.baselineVariance()).toEqual(1)
      });

      it("does display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(1)
      });
    });

    describe("If Delayed - minimal impact", () => {
      beforeEach(() => {
        milestone.simulateStatusAgainstLastReturn("Delayed - moderate impact")
      });

      it("shows the reason for variance", () => {
        expect(milestone.reasonForVariance()).toEqual(1)
      });

      it("shows the current return date", () => {
        expect(milestone.currentReturn()).toEqual(1);
      });

      it("does display the baseline variance", () => {
        expect(milestone.baselineVariance()).toEqual(1)
      });

      it("does display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(1)
      });
    });

    describe("If Delayed - critical", () => {
      beforeEach(() => {
        milestone.simulateStatusAgainstLastReturn("Delayed - moderate impact")
      });

      it("shows the reason for variance", () => {
        expect(milestone.reasonForVariance()).toEqual(1)
      });

      it("shows the current return date", () => {
        expect(milestone.currentReturn()).toEqual(1);
      });

      it("does display the baseline variance", () => {
        expect(milestone.baselineVariance()).toEqual(1)
      });

      it("does display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(1)
      });
    });

    describe("If on schedule", () => {
      beforeEach(() => {
        milestone.simulateStatusAgainstLastReturn("On schedule")
      });

      it("doesn't display the reason for variance", () => {
        expect(milestone.reasonForVariance()).toEqual(0)
      });

      it("doesn't display the date completed", () => {
        expect(milestone.milestoneCompletedDate()).toEqual(0)
      });

      it("doesn't display the current return date", () => {
        expect(milestone.currentReturn()).toEqual(0);
      });

      it("doesn't display the baseline variance", () => {
        expect(milestone.baselineVariance()).toEqual(0)
      });

      it("doesn't display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(0)
      });
    });

    describe("No last return", () => {
      beforeEach(() => {
        let formData = {
          description: "Here is a stone that marks a mile.",
          milestoneBaselineCompletion: "03/31/2018",
          milestoneSummaryOfCriticalPath: "Contract begins!!!"
        };
        let schemaTitle =  "Milestone Fields";
        milestone = new MilestoneComponent(
          formData,
          onChangeSpy,
          schemaTitle
        );
        milestone.simulateStatusAgainstLastReturn("Delayed - moderate impact")
      });

      it("doesn't display the last return variance", () => {
        expect(milestone.lastReturnVariance()).toEqual(0)
      });
    });
  });
});
