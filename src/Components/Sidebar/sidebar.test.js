import React from "react";
import Sidebar from ".";
import { mount } from "enzyme";

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
    beforeEach(() => {
      sidebar = mount(
        <Sidebar items={{ cats: { title: "Cats", link: "catLink" } }} />
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

    it("Sets the item href to the link", () => {
      let link = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-link"]');

      expect(link.props().href).toEqual("catLink");
    });
  });

  describe("Given two items with no children", () => {
    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: { title: "Cows", link: "cowLink" },
            dogs: { title: "Dogs", link: "dogLink" }
          }}
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

    it("Sets the item hrefs to the link", () => {
      let linkOne = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-link"]');

      let linkTwo = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-link"]');

      expect(linkOne.props().href).toEqual("cowLink");
      expect(linkTwo.props().href).toEqual("dogLink");
    });
  });

  describe("Given one item with a child", () => {
    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: { noises: { title: "noises", link: "noisesLink" } }
            }
          }}
        />
      );
    });
    it("An item and its child", () => {
      expect(sidebarItems().length).toEqual(1);
    });

    it("sets the child title to the title given", () => {
      let link = sidebar.find('[data-test="sidebar-item-child-link"]');
      expect(link.text()).toEqual("noises");
    });

    it("sets the child href to the link given", () => {
      let link = sidebar.find('[data-test="sidebar-item-child-link"]');
      expect(link.props().href).toEqual("noisesLink");
    });
  });

  describe("Given one item with two children", () => {
    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", link: "noisesLink" },
                likes: { title: "people", link: "peopleLink" }
              }
            }
          }}
        />
      );
    });
    it("An item and its children", () => {
      expect(sidebarItemChildren(0).length).toEqual(2);
    });

    it("sets the children titles to the title given", () => {
      let links = sidebar.find('[data-test="sidebar-item-child-link"]');

      expect(links.at(0).text()).toEqual("noises");
      expect(links.at(1).text()).toEqual("people");
    });

    it("sets the children titles to the title given", () => {
      let links = sidebar.find('[data-test="sidebar-item-child-link"]');

      expect(links.at(0).props().href).toEqual("noisesLink");
      expect(links.at(1).props().href).toEqual("peopleLink");
    });
  });

  describe("Given two items with children", () => {
    beforeEach(() => {
      sidebar = mount(
        <Sidebar
          items={{
            cows: {
              title: "Cows",
              children: {
                noises: { title: "noises", link: "linkToDaNoise" },
                likes: { title: "people", link: "peopleLink" }
              }
            },
            dogs: {
              title: "Dogs",
              children: { toys: { title: "Toys", link: "dogToys4U.bark" } }
            }
          }}
        />
      );
    });

    it("An both items and their children", () => {
      let itemOneChildren = sidebarItemChildren(0);
      let itemTwoChildren = sidebarItemChildren(1);

      expect(itemOneChildren.length).toEqual(2);
      expect(itemTwoChildren.length).toEqual(1);
    });

    it("sets the children titles to the title given", () => {
      let itemOneChildrenLinks = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-link"]');

      let itemTwoChildrenLinks = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-child-link"]');

      expect(itemOneChildrenLinks.at(0).text()).toEqual("noises");
      expect(itemOneChildrenLinks.at(1).text()).toEqual("people");
      expect(itemTwoChildrenLinks.at(0).text()).toEqual("Toys");
    });

    it("sets the children titles to the title given", () => {
      let itemOneChildrenLinks = sidebarItems()
        .at(0)
        .find('[data-test="sidebar-item-child-link"]');

      let itemTwoChildrenLinks = sidebarItems()
        .at(1)
        .find('[data-test="sidebar-item-child-link"]');

      expect(itemOneChildrenLinks.at(0).props().href).toEqual("linkToDaNoise");
      expect(itemOneChildrenLinks.at(1).props().href).toEqual("peopleLink");
      expect(itemTwoChildrenLinks.at(0).props().href).toEqual("dogToys4U.bark");
    });
  });
});
