import React from "react";
import PercentageWidget from ".";

import { storiesOf } from "@storybook/react";

storiesOf("PercentageWidget", module)
  .add("Default", () => <PercentageWidget onChange={() => {}} value="0" />)
  .add("Readonly", () => <PercentageWidget onChange={() => {}} uiSchema={{ "ui:disabled": true }} value={34}/>);
