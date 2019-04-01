import React from "react";
import { shallow, mount } from "enzyme";
import MilestoneField from "../../src/Components/MilestoneField";
import WidgetFake from "../WidgetFake";

class SelectFake extends WidgetFake {
  datatest="select-fake"
}
class TextareaFake extends WidgetFake {
  datatest="textarea-fake"
}
class PercentageFake extends WidgetFake {
  datatest="percentage-fake"
}
class BritishDateFake extends WidgetFake {
  datatest="britishDate-fake"
}

export default class MilestoneComponent {
  constructor(formData, onChange, schemaTitle, disabled = false) {
    let uiSchema = {};
    if (disabled) {
      uiSchema = {
        currentReturn: {
          "ui:disabled": true
        },
        description: {
          "ui:disabled": true
        },
        milestoneBaselineCompletion: {
          "ui:disabled": true
        },
        milestoneCompletedDate: {
          "ui:disabled": true
        },
        milestoneLastReturnDate: {
          "ui:disabled": true
        },
        milestonePercentCompleted: {
          "ui:disabled": true
        },
        milestoneSummaryOfCriticalPath: {
          "ui:disabled": true
        },
        milestoneVarianceAgainstBaseline: {
          "ui:disabled": true
        },
        milestoneVarianceAgainstLastReturn: {
          "ui:disabled": true
        },
        reasonForVariance: {
          "ui:disabled": true
        },
        statusAgainstLastReturn: {
          "ui:disabled": true
        },
        statusAgainstLastReturn: {
          "ui:disabled": true
        }
      }
    }

    this.milestone = mount(
      <MilestoneField
        schema={{ title: schemaTitle }}
        formData={formData}
        uiSchema={uiSchema}
        onChange={onChange}
        registry={
          {
            widgets: {
              percentage: PercentageFake,
              britishDate: BritishDateFake,
              TextareaWidget: TextareaFake,
              SelectWidget: SelectFake
            }
          }
        }
      />
    );

    this.milestone.update();
  }

  title = () => this.milestone.find("[data-test='schema-title']").text();

  description = () =>
    this.milestone.find("[data-test='milestone-description']").text();

  milestoneBaselineCompletion = () =>
    this.milestone
      .find("[data-test='milestone-baseline-completion'] [data-test='britishDate-fake']")
      .props()
      .value

  milestoneBaselineIsDisabled = () =>
    this.milestone
      .find("[data-test='milestone-baseline-completion']")
      .props()
      .disabled

  summary = () => this.milestone.find("[data-test='milestone-summary']").text();

  varianceAgainstLastReturndata = () =>
    this.milestone
    .find("[data-test='milestone-lastReturnVariance']")
    .text();

  varianceAgainstBaselinedata= () =>
    this.milestone
    .find("[data-test='milestone-baselineVariance']")
    .text();

  milestoneCompletedDate = () =>
    this.milestone
    .find("[data-test='milestone-completed-date'] [data-test='britishDate-fake']")
    .length;

  milestoneCompletedDateIsDisabled = () =>
    this.milestone
      .find("[data-test='milestone-completed-date']")
      .props()
      .disabled;

  currentReturn = () =>
    this.milestone
    .find("[data-test='milestone-current-return'] [data-test='britishDate-fake']")
    .length;

  currentReturnIsDisabled = () =>
    this.milestone
      .find("[data-test='milestone-current-return']")
      .props()
      .disabled;

  reasonForVariance = () =>
    this.milestone
    .find("[data-test='milestone-reason-for-variance'] [data-test='textarea-fake']")
    .length;

  reasonForVarianceIsDisabled = () =>
    this.milestone
      .find("[data-test='milestone-reason-for-variance']")
      .props()
      .disabled;

  baselineVariance = () =>
    this.milestone
    .find("[data-test='milestone-baselineVariance']")
    .length;

  lastReturnVariance = () =>
    this.milestone
    .find("[data-test='milestone-lastReturnVariance']")
    .length;

  milestonePercentCompleted = () =>
    this.milestone
    .find("[data-test='percentage-fake']")
    .length;

  milestonePercentCompletedIsDisabled = () => {
    let uiSchema = this.milestone
      .find("[data-test='milestone-percent-completed']")
      .props()
      .uiSchema;
    return uiSchema && uiSchema["ui:disabled"];
  }

  simulateStatusAgainstLastReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return'] [data-test='select-fake']")
      .simulate("change", { target: { value: inputValue } });

  simulateCurrentReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-current-return'] [data-test='britishDate-fake']")
      .simulate("change", { target: { value: inputValue } });

  simulateReasonForVariance = inputValue =>
    this.milestone
      .find("[data-test='milestone-reason-for-variance'] [data-test='textarea-fake']")
      .simulate("change", { target: { value: inputValue } });

  simulateMilestonePercentCompleted = inputValue =>
    this.milestone
      .find("[data-test='percentage-fake']")
      .simulate("change", { target: { value: inputValue } });

  findStatusAgainstLastReturn = () =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return'] [data-test='select-fake']")
      .props().value;

  milestoneStatusAgainstLastReturnIsDisabled = () =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return']")
      .props()
      .disabled;

  findMilestoneCompletedDate = () =>
    this.milestone
      .find("[data-test='milestone-completed-date'] [data-test='britishDate-fake']")
      .props().value

  findCurrentReturn = () =>
    this.milestone.find("[data-test='milestone-current-return'] [data-test='britishDate-fake']").props().value;

  findReasonForVariance = () =>
    this.milestone.find("[data-test='milestone-reason-for-variance'] [data-test='textarea-fake']").props()
      .value;

  findMilestonePercentCompleted = () =>
    this.milestone.find("[data-test='milestone-percent-completed']").props()
      .value;
  find = (selector) =>
    this.milestone.find(selector);
}
