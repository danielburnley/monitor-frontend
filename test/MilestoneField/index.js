import React from "react";
import { shallow, mount } from "enzyme";
import MilestoneField from "../../src/Components/MilestoneField";
import WidgetFake from "../WidgetFake";

class PercentageFake extends WidgetFake {
  datatest="percentage-fake"
}
class BritishDateFake extends WidgetFake {
  datatest="britishDate-fake"
}

export default class MilestoneComponent {
  constructor(formData, onChange, schemaTitle) {
    this.milestone = mount(
      <MilestoneField
        schema={{ title: schemaTitle }}
        formData={formData}
        onChange={onChange}
        registry={
          {
            widgets: {
              percentage: PercentageFake,
              britishDate: BritishDateFake
            }
          }
        }
      />
    );

    this.milestone.update()
  }

  title = () => this.milestone.find("[data-test='schema-title']").text();

  description = () =>
    this.milestone.find("[data-test='milestone-description']").text();

  milestoneBaselineCompletion = () =>
    this.milestone
      .find("[data-test='milestone-baseline-completion'] [data-test='britishDate-fake']")
      .props()
      .value

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

  currentReturn = () =>
    this.milestone
    .find("[data-test='milestone-current-return'] [data-test='britishDate-fake']")
    .length;

  reasonForVariance = () =>
    this.milestone
    .find("[data-test='milestone-reason-for-variance']")
    .length;

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

  simulateStatusAgainstLastReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return']")
      .simulate("change", { target: { value: inputValue } });

  simulateCurrentReturn = inputValue =>
    this.milestone
      .find("[data-test='milestone-current-return'] [data-test='britishDate-fake']")
      .simulate("change", { target: { value: inputValue } });

  simulateReasonForVariance = inputValue =>
    this.milestone
      .find("[data-test='milestone-reason-for-variance']")
      .simulate("change", { target: { value: inputValue } });

  simulateMilestonePercentCompleted = inputValue =>
    this.milestone
      .find("[data-test='percentage-fake']")
      .simulate("change", { target: { value: inputValue } });

  findStatusAgainstLastReturn = () =>
    this.milestone
      .find("[data-test='milestone-status-against-last-return']")
      .props().value;

  findMilestoneCompletedDate = () =>
    this.milestone
      .find("[data-test='milestone-completed-date'] [data-test='britishDate-fake']")
      .props().value

  findCurrentReturn = () =>
    this.milestone.find("[data-test='milestone-current-return'] [data-test='britishDate-fake']").props().value;

  findReasonForVariance = () =>
    this.milestone.find("[data-test='milestone-reason-for-variance']").props()
      .value;

  findMilestonePercentCompleted = () =>
    this.milestone.find("[data-test='milestone-percent-completed']").props()
      .value;
  find = (selector) =>
    this.milestone.find(selector);
}
