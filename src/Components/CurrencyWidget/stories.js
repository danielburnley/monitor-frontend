import React from "react";
import CurrencyWidget from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Currency Field", module).add("Default", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let onChange = data => console.log(data)
  return <CurrencyWidget schema={schema} formData={data} onChange={onChange}/>
})
.add("Other Currency", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let onChange = data => console.log(data)
  return <CurrencyWidget schema={schema} formData={data} onChange={onChange} currency={"$"}/>
})
.add("Read only fields", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let uiSchema = { "ui:disabled": true }
  return <CurrencyWidget schema={schema} formData={data} uiSchema={uiSchema}/>
})
.add("Hidden fields", () => {
  let schema = {
    type: "string",
    title: "Cats"
  }
  let data = "45.34"
  let uiSchema = { "ui:widget": "hidden" }
  return <CurrencyWidget schema={schema} formData={data} uiSchema={uiSchema}/>
})