import React from "react";
import NumberedArrayField from ".";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

storiesOf("Parent Form", module)
  .add("Default", () => (<NumberedArrayField/>))
