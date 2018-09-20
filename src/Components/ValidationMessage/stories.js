import React from "react";
import ValidationMessage from ".";

import { storiesOf } from "@storybook/react";

storiesOf("ValidationMessage", module)
  .add("Warning", () => <ValidationMessage valid={false} type="Draft" invalidPaths={[["cat","name"],["cats",0,"catHouseGranted",1,"cost"]]}/>)
  .add("Error", () => <ValidationMessage valid={false} type="Submit" invalidPaths={[["cats", 0, "catHouse"],["dog", "breeds"]]}/>)
