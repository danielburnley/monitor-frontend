import React from "react";
import ErrorMessage from ".";
import { mount } from "enzyme";

describe("<ErrorMessage>", () => {
  it("is not valid", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Submit"
          invalidPaths={[["Cats", 0, "Cat House"], ["Dogs", "Dog House"]]}
        />
      );
      expect(wrap).toBeNull();
    });
  });

  describe("submission", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Submit"
          invalidPaths={[
            ["Cats", "Item 1", "Cat House"],
            ["Dogs", "Dog House"]
          ]}
        />
      );
      expect(wrap.text()).toEqual(
        "Error: This return could not be submitted because the following fields were missing: Cats → Item 1 → Cat HouseDogs → Dog House"
      );
    });
    it("example 2", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Submit"
          invalidPaths={[["Dogs", "Item 2", "Breed"], ["Cows", "Moo"]]}
        />
      );
      expect(wrap.text()).toEqual(
        "Error: This return could not be submitted because the following fields were missing: Dogs → Item 2 → BreedCows → Moo"
      );
    });
  });

  describe("save draft", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Save"
          invalidPaths={[
            ["Cats", "Item 1", "Cat House"],
            ["Dogs", "Dog House"]
          ]}
        />
      );
      expect(wrap.text()).toEqual(
        "Warning: You will not be able to submit this return until the following fields are filled in: Cats → Item 1 → Cat HouseDogs → Dog House"
      );
    });

    it("example 2", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Save"
          invalidPaths={[["Dogs", "Item 2", "Breed"], ["Cows", "Moo"]]}
        />
      );
      expect(wrap.text()).toEqual(
        "Warning: You will not be able to submit this return until the following fields are filled in: Dogs → Item 2 → BreedCows → Moo"
      );
    });
  });

  describe("empty titles", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Save"
          invalidPaths={[["Cats", "", "Cat House"], ["Dogs", "Dog House"]]}
        />
      );
      expect(wrap.text()).toEqual(
        "Warning: You will not be able to submit this return until the following fields are filled in: Cats → Cat HouseDogs → Dog House"
      );
    });

    it("example 2", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={false}
          type="Save"
          invalidPaths={[["Dogs", "Breed"], ["Cows", "", "Moo"]]}
        />
      );
      expect(wrap.text()).toEqual(
        "Warning: You will not be able to submit this return until the following fields are filled in: Dogs → BreedCows → Moo"
      );
    });
  });

  describe("overwriting error", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={true}
          valid={true}
          type="Save"
          invalidPaths={[[]]}
          errors={["incorrect_timestamp"]}
        />
      );
      expect(wrap.text()).toEqual(
        "Error: You cannot save as newer data has already been saved to the system."
      );
    });
  });

  describe("Validation connection error", () => {
    it("example 1", () => {
      let wrap = mount(
        <ErrorMessage
          validationSuccess={false}
          valid={false}
          type="Save"
          invalidPaths={[]}
          errors={[]}
        />
      );
      expect(wrap.text()).toEqual(
        "Error: There was an error validating, please ensure you are connected to the internet."
      );
    });
  });
});
