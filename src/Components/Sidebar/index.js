import React from "react";

export default class Sidebar extends React.Component {
  renderChildren(children) {
    return Object.entries(children).map(([key, value]) => (
      <li key={key} data-test="sidebar-item-child">
        <a onClick={(_)=>this.props.onItemClick(value.subSection, value.index)}  data-test="sidebar-item-child-button">{value.title}</a>
      </li>
    ));
  }
  renderItems() {
    return Object.entries(this.props.items).map(([key, value]) => (
      <li data-test="sidebar-item" key={key}>
        {value.children && <span data-test="sidebar-item-button">{value.title}</span>}
        {!value.children && <a onClick={(_)=>this.props.onItemClick(value.subSection)} data-test="sidebar-item-button">{value.title}</a>}
        <ul data-test="sidebar-item-children">
          {value.children && this.renderChildren(value.children)}
        </ul>
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
