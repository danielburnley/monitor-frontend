import React from 'react';
import PrintReturn from '.';
import StaticData from '../StaticData';

import { storiesOf } from "@storybook/react";

storiesOf("Print Return", module).add("Default", () => {
  let data = {cathouse: {cathouse: 'cat'}};
  let schema = {
    type: 'object',
    properties: {
      cathouse: {
        type: 'object',
        title: 'cathouse',
        properties: {
          cathouse: {
            type: 'string',
            readonly: true
          }
        }
      }
    }
  }
  let getReturnUseCase = { 
    execute: (presenter, request) => {presenter.presentReturn({
        status: 'Submitted',
        data: data,
        schema: schema
    })}
  }

  return (
    <PrintReturn 
      getReturn={getReturnUseCase}
      match={{params: {id: "3", projectId: "5" }}}
    >
  
      {({data, schema}) => {
        <StaticData formData={data} schema={schema} />
      }}
    </PrintReturn>
  )
})