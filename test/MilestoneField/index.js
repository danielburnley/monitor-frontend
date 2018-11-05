import React from "react";
import { shallow, mount } from "enzyme";
import MilestoneField from "../../src/Components/MilestoneField";

export default class MilestoneComponent {
  constructor(formData, onChange, schemaTitle, percentagefield) {
    this.milestone = mount(
      <MilestoneField
        schema={{ title: schemaTitle }}
        formData={formData}
        onChange={onChange}
        registry={
          {
            widgets: {
              percentage: percentagefield
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
  find = (selector) =>
    this.milestone.find(selector);
}
