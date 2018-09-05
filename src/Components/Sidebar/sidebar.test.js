import React from "react";
import Sidebar from ".";
import {mount} from "enzyme";

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
    let itemClickSpy;

    beforeEach(() => {
      itemClickSpy = jest.fn();
      sidebar = mount(
        <Sidebar items={{ cats: { title: "Cats", subSection: "aSubSectionAllAboutCats" } }} onItemClick={itemClickSpy}/>
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

    it("Calls updateParentForm method with subsection",()=>{
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      button.simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutCats");
    })
  });

  describe("Given two items with no children", () => {
    let itemClickSpy;

    beforeEach(() => {
      itemClickSpy = jest.fn();
      sidebar = mount(
        <Sidebar
          items={{
            cows: { title: "Cows", subSection: "aSubSectionAllAboutCats" },
            dogs: { title: "Dogs", subSection: "aSubSectionAllAboutDogs" }
          }}
          onItemClick={itemClickSpy}
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
      expect(buttonOne.props().onClick).not.toBeUndefined();
      let buttonTwo = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-button"]');
      expect(buttonTwo.props().onClick).not.toBeUndefined();

    });

    it("Calls updateParentForm method with subsection",()=>{
      let buttonOne = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      let buttonTwo = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-button"]');


      buttonOne.simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutCats");

      buttonTwo.simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutDogs");
    })
  });

  describe("Given one item with a child", () => {
    let itemClickSpy;

    beforeEach(() => {
      itemClickSpy = jest.fn();
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: { noises: { title: "noises", index:0, subSection: "aSubSectionAllAboutNoises"} }
            }
          }}
          onItemClick={itemClickSpy}
        />
      );
    });

    it("An item and its child", () => {
      expect(sidebarItems().length).toEqual(1);
    });

    it("Has no onclick event on the parent", () => {
      let button = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-button"]');
      expect(button.props().onClick).toBeUndefined();
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
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises",0);
    })

  });

  describe("Given one item with two children", () => {
    let itemClickSpy;

    beforeEach(() => {
      itemClickSpy = jest.fn();
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", index: 10, subSection: "aSubSectionAllAboutNoises" },
                likes: { title: "people", index: 20, subSection: "aSubSectionAboutHorriblePeople" }
              }
            }
          }}
          onItemClick={itemClickSpy}
        />
      );
    });
    it("An item and its children", () => {
      expect(sidebarItemChildren(0).length).toEqual(2);
    });

    it("Creates two buttons with an onClick function assigned", () => {
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');
      expect(buttons.at(0).props().onClick).not.toBeUndefined();
      expect(buttons.at(1).props().onClick).not.toBeUndefined();
    });


    it("sets the children titles to the title given", () => {
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');

      expect(buttons.at(0).text()).toEqual("noises");
      expect(buttons.at(1).text()).toEqual("people");
    });

    it("Calls updateParentForm method with subsection",()=>{
      let buttons = sidebar.find('[data-test="sidebar-item-child-button"]');
      buttons.at(0).simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises", 10);

      buttons.at(1).simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAboutHorriblePeople", 20);
    })
  });

  describe("Given two items with children", () => {
    let itemClickSpy;

    beforeEach(() => {
      itemClickSpy = jest.fn();
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", index: 0, subSection: "aSubSectionAllAboutNoises" },
                likes: { title: "people", index: 0, subSection: "aSubSectionAboutHorriblePeople" }
              }
            },
            dogs: {
              title: "Dogs",
              children: { toys: { title: "Toys", index: 1, subSection: "aSubSectionAboutToys4U.bark" } }
            }
          }}
          onItemClick={itemClickSpy}
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

      expect(itemOneChildrenButtons.at(0).props().onClick).not.toBeUndefined();
      expect(itemOneChildrenButtons.at(1).props().onClick).not.toBeUndefined();
      expect(itemTwoChildrenButtons.at(0).props().onClick).not.toBeUndefined();

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
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAllAboutNoises", 0);

      itemOneChildrenButtons.at(1).simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAboutHorriblePeople", 0);

      itemTwoChildrenButtons.at(0).simulate("click");
      expect(itemClickSpy).toHaveBeenCalledWith("aSubSectionAboutToys4U.bark", 1);
    })
  });
});
