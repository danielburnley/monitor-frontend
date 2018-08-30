import React from "react";
import Sidebar from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Sidebar", module)
  .add("With a single item without children", () => (
    <Sidebar items={{ cats: { title: "Cats",subSection : "Sheep" } }} updateParentForm = {(e)=>console.log("updateParentForm "+e)}/>
  ))
  .add("With two items without children", () => (
    <Sidebar items={{ cats: { title: "Cats",subSection : "Cows" }, dogs: { title: "Dogs" ,subSection : "Sheep"} }} updateParentForm = {(e)=>console.log("updateParentForm "+e)}/>
  ))
  .add("With items with children", () => (
    <Sidebar
      items={{
        cats: { title: "Cats", subSection : "In Hats", children: { noises: { title: "Noises",subSection : "Dogs" } } },
        dogs: {
          title: "Dogs",
          subSection : "In Shoes",
          children: {
            noises: { title: "Noises" , subSection : "Moo"},
            toys: { title: "Favourite Toys" , subSection : "Quack"},
          }
        }
      }}
      updateParentForm = {(e)=>console.log("updateParentForm "+e)}
    />
  ));
