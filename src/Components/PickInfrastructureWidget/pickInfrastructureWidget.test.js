import PickInfrastructureWidget from ".";
import React from "react";
import { shallow } from "enzyme";

async function wait() {
  await new Promise(resolve => setTimeout(resolve, 100));
}

describe("PickInfrastructureWidget", () => {
  describe("Project is found", () => {
    let getInfrastructuresSpy, pickInfras, infrastructures, onChangeSpy;
      describe("Example 1", () => {
        beforeEach(() => {
          infrastructures = [
            {id: 1, name: "A big house", description: "One day I will build a really big hosue"},
            {id: 3, name: "A long road", description: "I need a road to drive to my big house"},
            {id: 5, name: "A small library", description: "This is where all my books go"},
            {id: 7, name: "A diverse farm", description: "Somewhere to keep all of the tomatoes"}
          ]
          getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentInfrastructures(infrastructures)))}
          onChangeSpy = jest.fn();
          pickInfras = shallow (
            <PickInfrastructureWidget
              formContext={{projectId: 1, getInfrastructures: getInfrastructuresSpy}}
              onChange={onChangeSpy}
            />
          )
        });
    
        it("Calls execute on the get infrastructures usecase with the project id", () => {
          expect(getInfrastructuresSpy.execute).toHaveBeenCalledWith(expect.anything(), 1)
        });
    
        it("Sets loading to false", () => {
          expect(pickInfras.find('[data-test="loading"]').length).toEqual(0);
        });
    
        it("Displays a list of infrastructures to pick from", () => {
          expect(pickInfras.find('[data-test="infrastructure-1"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-3"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-5"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-7"]').length).toEqual(1)
        });

        it("Displays details from the use case", () => {
          expect(pickInfras.find('[data-test="infrastructure-1"]').text()).toEqual("One day I will build a really big hosue")
          expect(pickInfras.find('[data-test="infrastructure-3"]').text()).toEqual("I need a road to drive to my big house")
          expect(pickInfras.find('[data-test="infrastructure-5"]').text()).toEqual("This is where all my books go")
          expect(pickInfras.find('[data-test="infrastructure-7"]').text()).toEqual("Somewhere to keep all of the tomatoes")
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
            {id: 4, name: "A blue house", description: "blue inside and out"},
            {id: 67, name: "A blue street", description: "all the trees are blue too"},
            {id: 2, name: "A blue window", description: "blue is the colour"},
            {id: 45, name: "A blue corvette", description: "Everything is blue"},
            {id: 102, name: "Blue words", description: "And the people too!"}
          ]
          getInfrastructuresSpy = {execute: jest.fn((presenter, id) => (presenter.presentInfrastructures(infrastructures)))}
          onChangeSpy = jest.fn();
          pickInfras = shallow (
            <PickInfrastructureWidget
              formContext={{projectId: 78, getInfrastructures: getInfrastructuresSpy}}
              onChange={onChangeSpy}
            />
          )
        });
    
        it("Calls execute on the get infrastructures usecase with the project id", () => {
          expect(getInfrastructuresSpy.execute).toHaveBeenCalledWith(expect.anything(), 78)
        });
  
    
        it("It's loading anymore", () => {
          expect(pickInfras.find('[data-test="laoding"]').length).toEqual(0);
        });
    
        it("Displays a list of infrastructures to pick from", () => {
          expect(pickInfras.find('[data-test="infrastructure-4"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-67"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-2"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-45"]').length).toEqual(1)
          expect(pickInfras.find('[data-test="infrastructure-102"]').length).toEqual(1)
        });

        it("Displays the details passed from the use case", () => {
          expect(pickInfras.find('[data-test="infrastructure-4"]').text()).toEqual("blue inside and out")
          expect(pickInfras.find('[data-test="infrastructure-67"]').text()).toEqual("all the trees are blue too")
          expect(pickInfras.find('[data-test="infrastructure-2"]').text()).toEqual("blue is the colour")
          expect(pickInfras.find('[data-test="infrastructure-45"]').text()).toEqual("Everything is blue")
          expect(pickInfras.find('[data-test="infrastructure-102"]').text()).toEqual("And the people too!")
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
        <PickInfrastructureWidget
          formContext={{projectId: 1, getInfrastructures: getInfrastructuresSpy}}
          onChange={jest.fn()}
        />
      )
    });

    it("doesn't load", async () => {
      await wait();
      expect(pickInfras.find('[data-test="loading"]').length).toEqual(1);
    });
  });  
});