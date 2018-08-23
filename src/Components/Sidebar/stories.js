import React from "react";
import Sidebar from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Sidebar", module)
  .add("With a single item without children", () => (
    <Sidebar items={{ cats: { title: "Cats" } }} />
  ))
  .add("With two items without children", () => (
    <Sidebar items={{ cats: { title: "Cats" }, dogs: { title: "Dogs" } }} />
  ))
  .add("With items with children", () => (
    <Sidebar
      items={{
        cats: { title: "Cats", children: { noises: { title: "Noises" } } },
        dogs: {
          title: "Dogs",
          children: {
            noises: { title: "Noises" },
            toys: { title: "Favourite Toys" }
          }
        }
      }}
    />
  ));
