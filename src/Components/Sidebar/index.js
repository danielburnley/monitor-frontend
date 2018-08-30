import React from "react";

export default class Sidebar extends React.Component {
  renderChildren(children) {
    return Object.entries(children).map(([key, value]) => (
      <li key={key} data-test="sidebar-item-child">
        <button onClick={(_)=>this.props.updateParentForm(value.subSection)}  data-test="sidebar-item-child-button">{value.title}</button>
      </li>
    ));
  }
  renderItems() {
    return Object.entries(this.props.items).map(([key, value]) => (
      <li data-test="sidebar-item" key={key}>
        <button onClick={(_)=>this.props.updateParentForm(value.subSection)} data-test="sidebar-item-button">{value.title}</button>
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
