import React from "react";
export default class NumberedArrayField extends React.Component {
  renderItem = (item, index) => (
    <li key={index}>
      {item.children}
    </li>
  )

  render = () => (
    <ol>
      {this.props.items.map(this.renderItem)}
    </ol>
  )
}
