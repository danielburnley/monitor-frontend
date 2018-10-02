import React from "react";
import ValidationMessage from ".";
import {mount} from "enzyme";

describe("<ValidationMessage>", () => {

  it('is valid', () => {
    it('example 1', () => {
      let wrap = mount(<ValidationMessage valid={false} type="Submit" invalidPaths={[["Cats",0,"Cat House"],["Dogs","Dog House"]]}/>)
      expect(wrap).toBeNull();
    });
  });

  describe('submission', () => {
    it('example 1', () => {
      let wrap = mount(<ValidationMessage valid={false} type="Submit" invalidPaths={[["Cats","Item 1","Cat House"],["Dogs","Dog House"]]}/>)
      expect(wrap.text()).toEqual("Error: This return could not be submitted because the following fields were missing: Cats → Item 1 → Cat HouseDogs → Dog House");
    });
    it('example 2', () => {
      let wrap = mount(<ValidationMessage valid={false} type="Submit" invalidPaths={[["Dogs","Item 2","Breed"],["Cows","Moo"]]}/>)
      expect(wrap.text()).toEqual("Error: This return could not be submitted because the following fields were missing: Dogs → Item 2 → BreedCows → Moo");
    });
  });

  describe('save draft', () => {
    it('example 1', () => {
      let wrap = mount(<ValidationMessage valid={false} type="Save" invalidPaths={[["Cats","Item 1","Cat House"],["Dogs","Dog House"]]}/>)
      expect(wrap.text()).toEqual("Warning: You will not be able to submit this return until the following fields are filled in: Cats → Item 1 → Cat HouseDogs → Dog House");
    });
    it('example 2', () => {
      let wrap = mount(<ValidationMessage valid={false} type="Save" invalidPaths={[["Dogs","Item 2","Breed"],["Cows","Moo"]]}/>)
      expect(wrap.text()).toEqual("Warning: You will not be able to submit this return until the following fields are filled in: Dogs → Item 2 → BreedCows → Moo");
    });
  });

});
