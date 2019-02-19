import React from "react";
import Infrastructure from "../../Domain/Infrastructure";
import { storiesOf } from "@storybook/react";
import PickInfrastruture from ".";

storiesOf("PickInfrastruture", module).add("Default", () => {
  let infrastructures = [
    new Infrastructure({id: 1, name: "A big house", description: "One day I will build a really big hosue"}),
    new Infrastructure({id: 3, name: "A long road", description: "I need a road to drive to my big house"}),
    new Infrastructure({id: 5, name: "A small library", description: "This is where all my books go"}),
    new Infrastructure({id: 7, name: "A diverse farm", description: "Somewhere to keep all of the tomatoes"})
  ]

  let getInfrastructures = {
    execute: (presenter, id) => (presenter.presentInfrastructures(infrastructures))
  }

  return <PickInfrastruture getInfrastructures={getInfrastructures} onChange={e => console.log(e)} projectId={3} />;
});
