import React from "react";
import Sidebar from ".";
import { mount } from "enzyme";
import {shallow} from "enzyme/build/index";

describe("<Sidebar>", () => {
  let sidebar;

  function sidebarItems() {
    return sidebar.find('[data-test="sidebar-item"]');
  }

  function sidebarItemChildren(sidebarItemIndex) {
    return sidebarItems()
      .at(sidebarItemIndex)
      .find('[data-test="sidebar-item-child"]');
  }

  describe("Given no data", () => {
    beforeEach(() => {
      sidebar = mount(<Sidebar items={{}} />);
    });

    it("Renders an empty sidebar given no data", () => {
      expect(sidebarItems().length).toEqual(0);
    });
  });

  describe("Given a single item with no children", () => {
    let updateParentFormSpy = jest.fn();

    beforeEach(() => {
      sidebar = mount(
        <Sidebar items={{ cats: { title: "Cats", subSection: "aSubSectionAllAboutCats" } }} updateParentForm = {updateParentFormSpy}/>
      );
    });

    it("Renders a single item", () => {
      expect(sidebarItems().length).toEqual(1);
    });

    it("Sets the item text to the title", () => {
      expect(
        sidebarItems()
          .at(0)
          .text()
      ).toEqual("Cats");
    });

    it("Creates a button with an onClick function assigned", () => {
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      expect(button.props().onClick).not.toBeNull();
    });

    it("Calls updateParentForm method with subsection",()=>{
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      button.simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutCats");
    })
  });

  describe("Given two items with no children", () => {
    let updateParentFormSpy = jest.fn();

    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: { title: "Cows", subSection: "aSubSectionAllAboutCats" },
            dogs: { title: "Dogs", subSection: "aSubSectionAllAboutDogs" }
          }}
          updateParentForm = {updateParentFormSpy}
        />
      );
    });

    it("Renders a two items", () => {
      expect(sidebarItems().length).toEqual(2);
    });

    it("Sets the item texts to the title", () => {
      let items = sidebarItems();
      expect(items.at(0).text()).toEqual("Cows");
      expect(items.at(1).text()).toEqual("Dogs");
    });

    it("Creates two buttons with an onClick function assigned", () => {
      let buttonOne = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      expect(buttonOne.props().onClick).not.toBeNull();
      let buttonTwo = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-button"]');
      expect(buttonTwo.props().onClick).not.toBeNull();

    });

    it("Calls updateParentForm method with subsection",()=>{
      let buttonOne = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      let buttonTwo = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-button"]');


      buttonOne.simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutCats");

      buttonTwo.simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutDogs");
    })
  });

  describe("Given one item with a child", () => {
    let updateParentFormSpy = jest.fn();

    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: { noises: { title: "noises", subSection: "aSubSectionAllAboutNoises" } }
            }
          }}
          updateParentForm = {updateParentFormSpy}
        />
      );
    });
    it("An item and its child", () => {
      expect(sidebarItems().length).toEqual(1);
    });
    
    it("Creates a button with an onClick function assigned", () => {
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-button"]');
      expect(button.props().onClick).not.toBeNull();
    });

    it("sets the child title to the title given", () => {
      let link = sidebar.find('[data-test="sidebar-item-child-button"]');
      expect(link.text()).toEqual("noises");
    });

    it("Calls updateParentForm method with subsection",()=>{
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-button"]');
      button.simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises");
    })

  });

  describe("Given one item with two children", () => {
    let updateParentFormSpy = jest.fn();

    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", subSection: "aSubSectionAllAboutNoises" },
                likes: { title: "people", subSection: "aSubSectionAboutHorriblePeople" }
              }
            }
          }}
          updateParentForm = {updateParentFormSpy}
        />
      );
    });
    it("An item and its children", () => {
      expect(sidebarItemChildren(0).length).toEqual(2);
    });

    it("Creates two buttons with an onClick function assigned", () => {
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');
      expect(buttons.at(0).props().onClick).not.toBeNull();
      expect(buttons.at(1).props().onClick).not.toBeNull();
    });


    it("sets the children titles to the title given", () => {
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');

      expect(buttons.at(0).text()).toEqual("noises");
      expect(buttons.at(1).text()).toEqual("people");
    });

    it("Calls updateParentForm method with subsection",()=>{
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');
      buttons.at(0).simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises");

      buttons.at(1).simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAboutHorriblePeople");
    })

  });

  describe("Given two items with children", () => {
    let updateParentFormSpy = jest.fn();

    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", subSection: "aSubSectionAllAboutNoises" },
                likes: { title: "people", subSection: "aSubSectionAboutHorriblePeople" }
              }
            },
            dogs: {
              title: "Dogs",
              children: { toys: { title: "Toys", subSection: "aSubSectionAboutToys4U.bark" } }
            }
          }}
          updateParentForm = {updateParentFormSpy}
        />
      );
    });

    it("An both items and their children", () => {
      let itemOneChildren = sidebarItemChildren(0);
      let itemTwoChildren = sidebarItemChildren(1);

      expect(itemOneChildren.length).toEqual(2);
      expect(itemTwoChildren.length).toEqual(1);
    });

    it("Creates two buttons with an onClick function assigned", () => {
      let itemOneChildrenButtons = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-button"]');

      let itemTwoChildrenButtons = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-child-button"]');

      expect(itemOneChildrenButtons.at(0).props().onClick).not.toBeNull();
      expect(itemOneChildrenButtons.at(1).props().onClick).not.toBeNull();
      expect(itemTwoChildrenButtons.at(0).props().onClick).not.toBeNull();

    });

    it("sets the children titles to the title given", () => {
      let itemOneChildrenButtons = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-button"]');

      let itemTwoChildrenButtons = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-child-button"]');

      expect(itemOneChildrenButtons.at(0).text()).toEqual("noises");
      expect(itemOneChildrenButtons.at(1).text()).toEqual("people");
      expect(itemTwoChildrenButtons.at(0).text()).toEqual("Toys");
    });

    it("Calls updateParentForm method with subsection",()=>{
      let itemOneChildrenButtons = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-button"]');


      let itemTwoChildrenButtons = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-child-button"]');

      itemOneChildrenButtons.at(0).simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises");

      itemOneChildrenButtons.at(1).simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAboutHorriblePeople");

      itemTwoChildrenButtons.at(0).simulate("click");
      expect(updateParentFormSpy).toHaveBeenCalledWith("aSubSectionAboutToys4U.bark");
    })
  });
});
