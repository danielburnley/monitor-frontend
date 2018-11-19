import React from "react";
import PercentageField from ".";

import { storiesOf } from "@storybook/react";

storiesOf("PercentageField", module)
  .add("Default", () => <PercentageField onChange={() => {}} value="0" />)
  .add("Readonly", () => <PercentageField onChange={() => {}} uiSchema={{ "ui:disabled": true }} value={34}/>);
