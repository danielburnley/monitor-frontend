import React from "react";

export default class Sidebar extends React.Component {
  renderChildren(children) {
    return Object.entries(children).map(([key, value]) => (
      <li key={key} data-test="sidebar-item-child">
        <a
          onClick={_ => this.props.onItemClick(value.subSection, value.index)}
          data-test="sidebar-item-child-button"
        >
          {value.title}
        </a>
      </li>
    ));
  }

  renderSidebarItem(item) {
    if (item.children) {
      return (
        <React.Fragment>
          <span data-test="sidebar-item-button">{item.title}</span>
          <ul data-test="sidebar-item-children">
            {this.renderChildren(item.children)}
          </ul>
        </React.Fragment>
      );
    } else {
      return (
        <a
          onClick={_ => this.props.onItemClick(item.subSection)}
          data-test="sidebar-item-button"
        >
          {item.title}
        </a>
      );
    }
  }

  renderItems() {
    return Object.entries(this.props.items).map(([key, value]) => (
      <li data-test="sidebar-item" key={key}>
        {this.renderSidebarItem(value)}
      </li>
    ));
  }

  render() {
    if (Object.keys(this.props.items).length === 0) {
      return <ul data-test="sidebar" />;
    }
    return (
      <ul data-test="sidebar" className="list-unstyled">
        {this.renderItems()}
      </ul>
    );
  }
}
