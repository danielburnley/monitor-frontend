import React from "react";
import { storiesOf } from "@storybook/react";

import WorkflowViewer from ".";

storiesOf("<WorkflowViewer>", module)
.add("Default", () => (
  <WorkflowViewer
    workflow={
     [
       {
         title: "Tell us about your scheme",
         description: "This is where we will create the primary profile for your project.",
         steps: [
           {
             title: "Deliverables",
             section: "deliverables"
           },
           {
             title: "Planning",
             section: "planning"
           }
         ]
       },
       {
         title: "What preperation work is required",
         description: "This is where we will need to know some of the external impacts to the project.",
         steps: [
           {
             title: "Land ownership",
             section: "landOwnership"
           }
         ]
       }
     ]
   }/>
))
