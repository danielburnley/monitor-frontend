import PickInfrastructure from ".";
import Infrastructure from "../../Domain/Infrastructure";
import React from "react";
import { shallow } from "enzyme";

describe("PickInfrastructure", () => {
  
  describe("Example 1", () => {
    let getInfrastructuresSpy, pickInfras, infrastructures;

    beforeEach(() => {
      infrastructures = [
        new Infrastructure({id: 1, name: "A big house", description: "One day I will build a really big hosue"}),
        new Infrastructure({id: 3, name: "A long road", description: "I need a road to drive to my big house"}),
        new Infrastructure({id: 5, name: "A small library", description: "This is where all my books go"}),
        new Infrastructure({id: 7, name: "A diverse farm", description: "Somewhere to keep all of the tomatoes"})
      ]
      getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentInfrastructures(infrastructures)))}
      pickInfras = shallow (
        <PickInfrastructure
          getInfrastructures={getInfrastructuresSpy}
          projectId={1}
        />
      )
    });

    it("Calls execute on the get infrastructures usecase with the project id", () => {
      expect(getInfrastructuresSpy.execute).toHaveBeenCalledWith(expect.anything(), 1)
    });

    it("Saves the infrastructures returned by the use case to state", () => {
      expect(pickInfras.state().infrastructures).toEqual([
        {id: 1, name: "A big house", description: "One day I will build a really big hosue"},
        {id: 3, name: "A long road", description: "I need a road to drive to my big house"},
        {id: 5, name: "A small library", description: "This is where all my books go"},
        {id: 7, name: "A diverse farm", description: "Somewhere to keep all of the tomatoes"}
      ])
    });

    it("Displays a list of infrastructures to pick from", () => {
      expect(pickInfras.find('[data-test="infrastructure-1"]').length).toEqual(1)
      expect(pickInfras.find('[data-test="infrastructure-2"]').length).toEqual(1)
      expect(pickInfras.find('[data-test="infrastructure-3"]').length).toEqual(1)
      expect(pickInfras.find('[data-test="infrastructure-4"]').length).toEqual(1)
    });
  });
});