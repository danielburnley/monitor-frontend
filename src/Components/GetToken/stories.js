import React from "react";
import GetToken from ".";
import { storiesOf } from "@storybook/react";

storiesOf("GetToken", module).add("Default", () => {
  return <GetToken />;
});
