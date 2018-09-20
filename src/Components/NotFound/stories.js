import React from "react";
import NotFound from ".";
import { storiesOf } from "@storybook/react";

storiesOf("NotFound", module).add("Default", () => {
  return (
    <NotFound/>
  );
});
