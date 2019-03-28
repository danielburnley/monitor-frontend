import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Sidebar extends React.Component {
  renderChildren(children, selectedIndex) {
    return Object.entries(children).map(([key, value]) => (
      <li key={key} data-test="sidebar-item-child" className="sidebar-item-child">
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
          <ul data-test="sidebar-item-children" className="sidebar-item-children">
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
          <ul data-test="sidebar-item-children" className="sidebar-item-children">
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
      <div key={key}>
        <li data-test="sidebar-item">
          {this.renderSidebarItem(value, key)}
        
        </li>
        {this.renderRemoveButton(key)}
      </div>
    ))
  }

  addEntry = () => {
    let extraFormData = this.props.formData
    extraFormData[this.props.section].push({})
    if(this.props.linkedArray) {
      this.props.linkedArray.forEach(section => {
        extraFormData[section].push({})
      });
    }
    this.props.onChange(extraFormData)
  }

  confirmDeletion = (key) => {
    let itemToDelete = this.props.items[key].title
    let confirmationText = `Are you sure you want to remove ${itemToDelete}. This will delete any data it contains.`
    return window.confirm(confirmationText)
  }

  removeEntry = (key) => {
    if (this.confirmDeletion(key)) {
      let smallerFormData = this.props.formData
      smallerFormData[this.props.section].splice(key, 1)
      if(this.props.linkedArray) {
        this.props.linkedArray.forEach(section => {
          smallerFormData[section].splice(key, 1)
        });
      }
      this.props.onChange(smallerFormData)
    }
  }

  userCanChangeArraySize() {
    return (this.props.userRole === "Homes England") || (this.props.userRole === "Superuser")
  }

  renderRemoveButton(key) {
    if (
      Object.keys(this.props.items).length !== 0 &&
      this.props.addable &&
      this.userCanChangeArraySize()
    ) {
      return <button
        type="button"
        value={key}
        className="btn btn-default btn-sml sidebar-button sidebar-button-remove"
        data-test={`remove-button-${key}`}
        onClick={e => this.removeEntry(e.target.value)}
      >
        -
      </button>
    }
  }

  renderAddButton() {
    if (
      this.props.addable &&
      this.userCanChangeArraySize()
    ) {
      return <button
        type="button"
        className="btn btn-default btn-lg sidebar-button sidebar-button-add"
        data-test="add-button"
        onClick={this.addEntry}
      >
      +
      </button>
    }
  }


  render() {
    return (
      <div>
        <ul data-test="sidebar" className="sidebar list-unstyled">
          {this.renderItems()}
        </ul>
          {this.renderAddButton()}
      </div>
    );
  }
}

Sidebar.propTypes = {
  items: PropTypes.object.isRequired,
  onItemClick: PropTypes.func.isRequired
};
