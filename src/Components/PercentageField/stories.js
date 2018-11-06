import React from "react";
import PercentageField from ".";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

storiesOf("PercentageField", module)
  .add("Default", () => <PercentageField onChange={() => {}} value="0" />);
