import React from "react";
import CurrencyField from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Currency Field", module).add("Default", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let onChange = data => console.log(data)
  return <CurrencyField schema={schema} formData={data} onChange={onChange}/>
})
.add("Other Currency", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let onChange = data => console.log(data)
  return <CurrencyField schema={schema} formData={data} onChange={onChange} currency={"$"}/>
})
.add("Read only fields", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let uiSchema = { "ui:disabled": true }
  return <CurrencyField schema={schema} formData={data} uiSchema={uiSchema}/>
})
.add("Hidden fields", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let uiSchema = { "ui:widget": "hidden" }
  return <CurrencyField schema={schema} formData={data} uiSchema={uiSchema}/>
})