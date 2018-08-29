import React from "react";
import ToggleDiv from "../ToggleDiv";

export default class ArrayField extends React.Component {
  render() {
    return (
      <div>
        {this.props.items.map(element => (
          <ToggleDiv
            title={`${this.props.schema.title} ${element.index + 1}`}
            key={element.index}
          >
            {element.children}
          </ToggleDiv>
        ))}
      </div>
    );
  }
}
