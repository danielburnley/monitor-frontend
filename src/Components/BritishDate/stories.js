import React from "react";
import { storiesOf } from "@storybook/react";
import BritishDate from ".";

storiesOf("BritishDate", module)
  .add("Filled in", () => (
    <BritishDate
      value="2000/19/01"
      onChange={(e) => console.log(e)}
    />
  ))
  .add("Empty", () => (
    <BritishDate
      value=""
      onChange={(e) => console.log(e)}
    />
  ))
  .add("Disabled", () => (
    <BritishDate
      value="2000/25/08"
      uiSchema={{ "ui:disabled": true }}
      onChange={(e) => console.log(e)}
    />
  ));
