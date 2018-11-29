import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Sidebar extends React.Component {

  renderChildren(children, selectedIndex) {
    return Object.entries(children).map(([key, value]) => (
      <li key={key} data-test="sidebar-item-child">
        <a
          className={this.selectedChildStyling(key, selectedIndex)}
          onClick={_ => this.props.onItemClick(value.subSection, value.index)}
          data-test="sidebar-item-child-button"
          >
          {value.title}
        </a>
      </li>
    ));
  }

  selectedChildStyling(key, selectedIndex) {
    if (
      this.props.selectedFormSection === key &&
      selectedIndex === this.props.selectedFormItemIndex
    ) {
      return "selected-item";
    } else {
      return "sidebar-item";
    }
  }

  renderSidebarItem(item, key) {
    if (parseInt(key, 10) === this.props.selectedFormItemIndex) {
      return (
        <React.Fragment>
          <span
            className="sidebar-parent selected-header"
            data-test="sidebar-item-button"
          >
            {item.title}
          </span>
          <ul data-test="sidebar-item-children">
            {this.renderChildren(
              item.children,
              this.props.selectedFormItemIndex
            )}
          </ul>
        </React.Fragment>
      );
    } else if (item.children) {
      return (
        <React.Fragment>
          <span className="sidebar-parent" data-test="sidebar-item-button">
            {item.title}
          </span>
          <ul data-test="sidebar-item-children">
            {this.renderChildren(item.children)}
          </ul>
        </React.Fragment>
      );
    } else {
      return (
        <a
          className="sidebar-item"
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
        {this.renderSidebarItem(value, key)}
      </li>
    ));
  }

  render() {
    if (Object.keys(this.props.items).length === 0) {
      return <ul data-test="sidebar" />;
    }
    return (
      <ul data-test="sidebar" className="sidebar list-unstyled">
        {this.renderItems()}
      </ul>
    );
  }
}

Sidebar.propTypes = {
  items: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired
};
