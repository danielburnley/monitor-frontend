import React from "react";
import ErrorMessage from ".";

import { storiesOf } from "@storybook/react";

storiesOf("ErrorMessage", module)
  .add("Warning", () => <ErrorMessage valid={false} type="Draft" invalidPaths={[["cat","name"],["cats",0,"catHouseGranted",1,"cost"]]}/>)
  .add("Error", () => <ErrorMessage valid={false} type="Submit" invalidPaths={[["cats", 0, "catHouse"],["dog", "breeds"]]}/>)
