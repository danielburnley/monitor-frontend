import PickInfrastructureField from ".";
import Infrastructure from "../../Domain/Infrastructure";
import React from "react";
import { shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function waitForRequestToFinish() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

async function load(page) {
  await waitForRequestToFinish();
  page.update();
}

describe("PickInfrastructureField", () => {
  describe("Project is found", () => {
    let getInfrastructuresSpy, pickInfras, infrastructures, onChangeSpy;
      describe("Example 1", () => {
        beforeEach(() => {
          infrastructures = [
            new Infrastructure({id: 1, name: "A big house", description: "One day I will build a really big hosue"}),
            new Infrastructure({id: 3, name: "A long road", description: "I need a road to drive to my big house"}),
            new Infrastructure({id: 5, name: "A small library", description: "This is where all my books go"}),
            new Infrastructure({id: 7, name: "A diverse farm", description: "Somewhere to keep all of the tomatoes"})
          ]
          getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentInfrastructures(infrastructures)))}
          onChangeSpy = jest.fn();
          pickInfras = shallow (
            <PickInfrastructureField
              formContext={{projectId: 1, getInfrastructures: getInfrastructuresSpy}}
              onChange={onChangeSpy}
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
    
        it("Sets loading to false", () => {
          expect(pickInfras.state().loading).toEqual(false);
        });
    
        it("Displays a list of infrastructures to pick from", () => {
          expect(pickInfras.find('[data-test="infrastructure-1"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-3"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-5"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-7"]').length).toEqual(1)
        });
    
        it("Calls the on change spy with the id when an infrastructure is selected", async () => {
          pickInfras.find('[data-test="infrastructue-picker"]').simulate('change', { target: {value: "1"}})
          await wait()
          expect(onChangeSpy).toHaveBeenCalledWith({infrastructureId: "1"})
        });
      });

      describe("Example 2", () => {
        beforeEach(() => {
          infrastructures = [
            new Infrastructure({id: 4, name: "A blue house", description: "blue inside and out"}),
            new Infrastructure({id: 67, name: "A blue street", description: "all the trees are blue too"}),
            new Infrastructure({id: 2, name: "A blue window", description: "blue is the colour"}),
            new Infrastructure({id: 45, name: "A blue corvette", description: "Everything is blue"}),
            new Infrastructure({id: 102, name: "Blue words", description: "And the people too!"})
          ]
          getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentInfrastructures(infrastructures)))}
          onChangeSpy = jest.fn();
          pickInfras = shallow (
            <PickInfrastructureField
              formContext={{projectId: 78, getInfrastructures: getInfrastructuresSpy}}
              onChange={onChangeSpy}
            />
          )
        });
    
        it("Calls execute on the get infrastructures usecase with the project id", () => {
          expect(getInfrastructuresSpy.execute).toHaveBeenCalledWith(expect.anything(), 78)
        });
    
        it("Saves the infrastructures returned by the use case to state", () => {
          expect(pickInfras.state().infrastructures).toEqual([
            {id: 4, name: "A blue house", description: "blue inside and out"},
            {id: 67, name: "A blue street", description: "all the trees are blue too"},
            {id: 2, name: "A blue window", description: "blue is the colour"},
            {id: 45, name: "A blue corvette", description: "Everything is blue"},
            {id: 102, name: "Blue words", description: "And the people too!"}
          ])
        });
    
        it("Sets loading to false", () => {
          expect(pickInfras.state().loading).toEqual(false);
        });
    
        it("Displays a list of infrastructures to pick from", () => {
          expect(pickInfras.find('[data-test="infrastructure-4"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-67"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-2"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-45"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-102"]').length).toEqual(1)
        });
    
        it("Calls the on change spy with the id when an infrastructure is selected", async () => {
          pickInfras.find('[data-test="infrastructue-picker"]').simulate('change', { target: {value: "45"}})
          await wait()
          expect(onChangeSpy).toHaveBeenCalledWith({infrastructureId: "45"})
        });
      });
    });

  describe("Project not found", () => {
    let pickInfras;
    beforeEach(() => {
      let getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentProjectNotFound()))}
      pickInfras = shallow (
        <PickInfrastructureField
          formContext={{projectId: 1, getInfrastructures: getInfrastructuresSpy}}
          onChange={jest.fn()}
        />
      )
    });

    it("doesn't load", async () => {
      await wait();
      expect(pickInfras.state().loading).toEqual(true);
    });
  });  
});